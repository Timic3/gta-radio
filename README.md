# GTA: Radio

> Perfect solution to your radio listening needs! Play GTA's radio directly on your device, with adverts and all that, just like the real one!

## State of the project

Parsing (and exporting) San Andreas radio station tracks is currently supported. Metadata annotations for track is supported as well (although properties inside Ogg files aren't set yet, but can be done). Eventually, the plan is to support VC, III and V as well, but formats between these differ significantly.

## Development

Currently, this project is still in development and has many pitfalls. Eventually, the goal is to have a radio application that will synchronize across all devices, without the need for internet.

As you may know, the songs in the game are licensed and therefore can't be served from here. If you have the game, you can point to the directory where audio streams are located (`GTA San Andreas/audio/streams`) and the parser will parse the Ogg audio files for you.

## Contributions

As always, contributions and ideas are welcome.

## Credits

- Inspired by https://github.com/creideiki/radio-free-san-andreas
- SA radio station metadata from repository above, but originally from http://www.tinyted.net/eddie/SanAndreasRadio/
- Whole audio stream format from https://gta.fandom.com/wiki/Audio_stream
- Huge thanks to everyone who reverse-engineered the game and algorithms
- Shoutout to MTA community!

## Footnotes

This project is in no way affiliated with Rockstar Games or Take-Two Interactive.

Grand Theft Auto and all related trademarks are © Rockstar North 1997–2023.
