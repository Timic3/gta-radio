
// Encoding algorithm is fully explained here: https://gta.fandom.com/wiki/Audio_stream#Encoding

export const ENCODE_KEY = [
    0xEA, 0x3A, 0xC4, 0xA1,
    0x9A, 0xA8, 0x14, 0xF3,
    0x48, 0xB0, 0xD7, 0x23,
    0x9D, 0xE8, 0xFF, 0xF1,
];

export function rotate(buffer: Uint8Array) {
    let rotationIndex = 0;
    let rotatedBuffer = new Uint8Array(buffer.length);

    for (let i = 0; i < buffer.length; i++) {
        rotatedBuffer[i] = buffer[i] ^ ENCODE_KEY[rotationIndex];
        rotationIndex = (rotationIndex + 1) % 16;
    }

    return rotatedBuffer;
}
