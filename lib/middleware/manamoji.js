let substitutions = {
  'CHAOS': ':manachaos:',
  '{∞}': ':manainfinity:',
  '{½}': ':manahalf:',
  '{hr}': ':manahr:'
};

let COLORS = ['W', 'U', 'B', 'R', 'G'];
let NUMBERS = [...Array(21).keys()];
let ADDTL = ['C', 'E', 'HR', 'HW', 'T', 'Q', 'S', 'X', 'Y', 'Z'];

function _(before, after) {
  if (typeof after === 'undefined') {
    after = before;
  }
  substitutions[`{${before}}`] = `:mana${after.toString().toLowerCase()}:`;
}

ADDTL.forEach(a => { _(a) });
COLORS.forEach(c => { _(c) });
COLORS.forEach(c => { _(`2/${c}`, `2${c}`) });
COLORS.forEach(c => { _(`${c}/P`, `${c}p`) });
COLORS.forEach(c => { COLORS.forEach(d => {
  if (c != d) _(`${c}/${d}`, `${c}${d}`);
}) });
NUMBERS.forEach(n => { _(n) });

function manamoji(str) {
  const re = new RegExp(Object.keys(substitutions).map(v => {
    return v.replace('{', '\\{').replace('}', '\\}');
  }).join('|'), 'gi');
  return str.replace(re, matched => {
    return substitutions[matched];
  });
}


module.exports = embed => {
  if (embed.title) {
    embed.title = manamoji(embed.title);
  }
  if (embed.description) {
    embed.description = manamoji(embed.description);
  }
  return embed;
}
