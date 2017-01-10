const Url = require('urijs');

module.exports = (client, embed) => {
  console.log(embed);
  if (embed.url) {
    embed.url = Url(embed.url).query({ utm_source: 'discord' }).toString();
  }
  return embed;
}
