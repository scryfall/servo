# Servo

Servo is a Discord bot that will post the text or image of a Magic: the Gathering card to a text channel when its name is referenced.


## Usage

You must have the _Manage Server_ permission to add Servo to your server.

**Install:** https://discordapp.com/oauth2/authorize?client_id=268547439714238465&scope=bot


## Features

While chatting, surround a Magic card names with brackets (`[[` and `]]`) and prepend with an optional token. Servo will print out the text of that card or its image:

| Command               | Function                                        |
|-----------------------|-------------------------------------------------|
| `[[Joven's Ferrets]]` | Show a text representation of Joven's Ferrets.  |
| `[[!Goblin Game]]`    | Show a picture of Goblin Game.                  |

![Example usage](docs/screenshot.png)

Servo will also attempt to fix misspellings or partial card names:

![Examples with misspelling](docs/misspell.png)


### Manamoji

**Download**: [`manamoji.zip`](https://github.com/scryfall/servo/releases/download/1.0/manamoji.zip)

Magic cards often contain symbols that cannot be replicated in text, but Servo ships with a set of images that can be used as [custom emoji](https://support.discordapp.com/hc/en-us/articles/207619737-Adding-Emoji-Magic) to replace them with their graphical equivalents. Discord limits you to 50 custom emoji, so you'll have to choose which ones are most appropriate for your users.

![Deathrite Shaman showing custom symbols](docs/manamoji.png)

Without manamoji, mana symbols will be shown in braces:

![Chromanticore without custom symbols](docs/no-manamoji.png)
