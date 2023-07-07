import { readFileSync, writeFileSync } from 'fs';

import { SAParser } from './sa/parser';

const writeOggs = true;

console.log('Decoding tracks...');

try {
    const track = readFileSync('../assets/streams/CH');
    const parser = new SAParser(track);
    const tracks = parser.parse();

    console.log(`Parsing station ${parser.getStationTitle()?.title}.`);

    if (writeOggs) {
        for (const track of tracks) {
            let trackName = '';
            if (track.artist) {
                trackName += `${track.artist} - `;
            }
            trackName += track.title;
            trackName = trackName.replaceAll(/[^a-zA-Z0-9\- ]/gi, '');

            writeFileSync(`../assets/oggs/${trackName}.ogg`, track.oggVorbis);

            console.log(`Written track ${trackName}.`);
        }
    }
} catch (error) {
    console.error(error);
}

console.log('Tracks decoded.');
