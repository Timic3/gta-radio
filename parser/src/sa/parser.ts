import { createHash } from 'node:crypto';

import { ByteStream } from '../utils/ByteStream';
import { rotate } from './encoder';
import { getStationByHash } from './meta/stations';

export interface TrackStream {
    index: number;
    artist?: string;
    title: string;
    streamLength: number;
    streamSampleRate: number;
    oggVorbis: Uint8Array;
}

// Actual format is documented here: https://gta.fandom.com/wiki/Audio_stream

export class SAParser {
    private buffer: Buffer;
    private bufferHash: string;
    private byteStream: ByteStream;

    constructor(buffer: Uint8Array) {
        this.buffer = Buffer.from(rotate(buffer).buffer);
        this.bufferHash = createHash('md5').update(this.buffer).digest('hex');
        this.byteStream = new ByteStream(this.buffer);
    }

    public parse(): TrackStream[] {
        let trackIndex = 0;
        let tracks: TrackStream[] = [];

        while (this.byteStream.getPosition() < this.byteStream.getSize()) {
            // console.debug(`Reading track ${trackIndex}`);

            // Beat entries, currently not needed
            this.byteStream.skip(8000);

            let { length, sampleRate } = this.getLengthAndSampleRate();

            // console.debug(`Ogg length: ${length} (0x${length.toString(16).toUpperCase()})`);
            // console.debug(`Padding: ${sampleRate} (0x${sampleRate.toString(16).toUpperCase()})`);

            const sanityCheck = this.byteStream.readUint32();
            if (sanityCheck !== 0xCDCD0001) {
                console.warn(`Sanity check failed. Expected '0xCDCD0001' instead of '0x${sanityCheck.toString(16).toUpperCase()}'.`);
            }

            const annotations = this.annotate(trackIndex);

            tracks.push({
                index: trackIndex,
                artist: annotations.track?.artist,
                title: annotations.track.title,
                streamLength: length,
                streamSampleRate: sampleRate,
                oggVorbis: this.byteStream.read(length),
            });

            trackIndex++;
        }

        return tracks;
    }

    public getStationTitle() {
        return getStationByHash(this.bufferHash);
    }

    private annotate(trackIndex: number) {
        const station = getStationByHash(this.bufferHash);

        if (station === null) {
            console.log('Annotations not available.');
            return null;
        }

        return { station: station.title, track: station.tracks[trackIndex] };
    }

    private getLengthAndSampleRate() {
        // Length of Ogg Vorbis file
        let length = 0;
        // Sample rate but unused
        let sampleRate = 0;

        for (let i = 0; i < 8; i++) {
            const potentialLength = this.byteStream.readUint32();
            const potentialSampleRate = this.byteStream.readUint32();

            // If both DWORD length entry pairs are 0xCDCDCDCD, then given entry is padding.
            if (potentialLength === 0xCDCDCDCD && potentialSampleRate === 0xCDCDCDCD) {
                continue;
            }

            length = potentialLength;
            sampleRate = potentialSampleRate;
        }

        return { length, sampleRate };
    }
}
