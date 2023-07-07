import {
    POLICE, ADVERTS, AMBIENCE, BEATS, PLAYBACK_FM, KROSE,
    K_DST, CUTSCENE, BOUNCE_FM, SFUR, RADIO_LOS_SANTOS,
    RADIO_X, CSR, K_JAH, MASTER_SOUNDS, WCTR
} from './stations/index';

export const STATIONS = {
    POLICE,
    ADVERTS,
    AMBIENCE,
    BEATS,
    PLAYBACK_FM,
    KROSE,
    K_DST,
    CUTSCENE,
    BOUNCE_FM,
    SFUR,
    RADIO_LOS_SANTOS,
    RADIO_X,
    CSR,
    K_JAH,
    MASTER_SOUNDS,
    WCTR,
};

export interface Track {
    artist?: string;
    title: string;
};

export interface Station {
    title: string;
    hash: string;
    alternatives?: {
        hash: string;
        tracks?: { [index: number]: Track };
    }[];
    tracks: Track[];
};

export function getStationByHash(hash: string) {
    for (const station of Object.values(STATIONS)) {
        if (station.hash === hash) return station;
    }

    return null;
};
