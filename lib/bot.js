let Discord = require('discord.js');
let Messenger = require('./messenger');


class Servo {
  constructor(token) {
    this.token = token;
    this.client = this.makeClient(token);
  }

  makeClient(token) {
    console.log('servo client init');
    const client = new Discord.Client();
    client.on('message', msg => {
      new Messenger(client, msg);
    });
    client.login(token);
    return client;
  }
}

module.exports = Servo;
