const ResponseTypes = require('./response-types');


class Messenger {
  constructor(client, msg) {
    this.promises = [];
    this.client = client;
    this.msg = msg;
    this.pattern = /\[\[([^\]]+)\]\]/g;

    const matches = msg.content.match(this.pattern);
    if (matches) {
      matches.forEach(match => {
        const { cardName, responseType } = this.negotiateMatch(match);
        const promise = this.makePromise(cardName, responseType);
        this.promises.push(promise);
      });
    }
    Promise.all(this.promises).then(embeds => {
      embeds.forEach(embed => {
        this.msg.channel.sendEmbed(embed);
      });
    }).catch(err => console.log(err));
  }

  negotiateMatch(match) {
    let cardName = match.substring(0, match.length - 2).substring(2);
    let responseType = this.defaultResponseType;
    const token = cardName.slice(0, 1);
    if (token in this.specialResponseTypes) {
      cardName = cardName.slice(1);
      responseType = this.specialResponseTypes[token];
    }
    return { cardName, responseType }
  }

  makePromise(cardName, responseType) {
    return new Promise((resolve, reject) => {
      try {
        new responseType(this.client, cardName).embed().then(embed => {
          resolve(embed);
        });
      } catch(err) {
        reject(err);
      }
    });
  }
}

Messenger.prototype.defaultResponseType = ResponseTypes.TextResponse;
Messenger.prototype.specialResponseTypes = {
  '!': ResponseTypes.ImageResponse
};

module.exports = Messenger;
