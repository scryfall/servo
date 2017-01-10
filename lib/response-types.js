const request = require('request-promise-native');
const Discord = require('discord.js');
const Url = require('urijs');

const manamoji = require('./middleware/manamoji');
const utm = require('./middleware/utm');


class TextResponse {
  constructor(client, cardName) {
    this.client = client;
    this.cardName = cardName;
  }

  makeQuerystring() {
    return {
      fuzzy: this.cardName,
      format: 'text'
    };
  }

  makeUrl() {
    return Url(this.url).query(this.makeQuerystring()).toString();
  }

  makeRequest() {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        resolveWithFullResponse: true,
        uri: this.makeUrl() 
      }).then(response => {
        resolve(response);
      }).catch(err => {
        resolve(err.response);
      });
    });
  }

  makeEmbed(response) {
    let parts = response.body.split('\n');
    const embedTitle = parts.shift();
    return {
      title: `${embedTitle}`,
      description: parts.join('\n'),
      url: response.headers['x-scryfall-card'],
      thumbnail: {
        url: response.headers['x-scryfall-card-image']
      }
    };
  }

  embed() {
    return new Promise((resolve, reject) => {
      this.makeRequest().then(response => {
        let embed = this.makeEmbed(response);
        this.middleware.length > 0 && this.middleware.forEach(mw => {
          embed = mw(this.client, embed);
        });
        resolve(embed);
      });
    });
  }
}

TextResponse.prototype.middleware = [ manamoji, utm ];
TextResponse.prototype.url = 'https://api.scryfall.com/cards/named';


class ImageResponse extends TextResponse {
  makeEmbed(response) {
    let parts = response.body.split('\n');
    return {
      title: parts[0].match(/^([^{]+)/)[0].trim(),
      url: response.headers['x-scryfall-card'],
      image: {
        url: response.headers['x-scryfall-card-image']
      }
    };
  }
}


module.exports = { TextResponse, ImageResponse };
