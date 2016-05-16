import q from 'q';

var diacritics = {
  DIACRITICS: ['á', 'é', 'í', 'ó', 'ú', 'ã', 'õ', 'â', 'ê', 'ô', 'ç', 'à', 'ü',
    'Á', 'É', 'Í', 'Ó', 'Ú', 'Ã', 'Õ', 'Â', 'Ê', 'Ô', 'Ç', 'À', 'Ü'],
  NORMALIZED: ['a', 'e', 'i', 'o', 'u', 'a', 'o', 'a', 'e', 'o', 'c', 'a', 'u',
    'A', 'E', 'I', 'O', 'U', 'A', 'O', 'A', 'E', 'O', 'C', 'A', 'U'],
  remove
};

var mongo = { parse };

function chain(promises) {
  return promises.reduce(function(when, fn) {
    return when.then(fn, fn);
  }, q.when());
}

function remove(term) {
  var self = this;
  return term.replace(new RegExp(self.DIACRITICS.join('|'), 'g'), function(match, offset, string) {
    return self.NORMALIZED[self.DIACRITICS.indexOf(match)];
  });
}

function parse(url) {
  const PREFIX = 'mongodb://';

  var split;
  var parsed = {};

  if (url.indexOf(PREFIX) !== 0) {
    throw Error('Invalid mongodb URL');
  }

  url = url.replace(PREFIX, '');

  // Get the database
  split = url.split('/');
  url = split[0];
  parsed.db = split[1];

  // Split out username/password
  split = url.split('@');

  if (split.length > 1) {
    url = split[1];
    split = split[0].split(':');
    parsed.username = split[0];
    parsed.password = split[1];
  }

  parsed.host = url;

  return parsed;
}

export { chain, diacritics, mongo };
