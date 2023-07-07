import { Station } from '../stations';

export const BEATS: Station = {
    title: 'Beats',
    hash: 'fa900b4aca54c5a6c419fda136374f6a',
    alternatives: [
        {
            hash: '8b99240953935b0345bed96b23bc2721',
            // One track was replaced in this version.
            tracks: {
                3: { title: "Dance track (Nuthin' but a 'G' thang)", artist: 'Dr Dre' },
            },
        },
    ],
    tracks: [
        { artist: 'Kool and the gang', title: 'Dance track (Hollywood swinging)' },
        { title: 'Intro music' },
        { title: 'Four dragons casino ambience' },
        { artist: 'Dr Dre', title: "Dance track (Nuthin' but a 'G' thang)" },
        { artist: 'Kool and the gang', title: 'Dance track (Hollywood swinging)' },
        { artist: 'Johnny Harris', title: 'Dance track (Odyssey)' },
        { artist: 'Ronnie Hudson', title: 'Dance track (West coast poplock)' },
        { title: 'Mission complete 1' },
        { title: 'Mission complete 2' },
        { title: 'Intro movie' },
    ],
};
