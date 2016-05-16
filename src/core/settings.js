import q from 'q';
import fs from 'fs';
import path from 'path';

var abs = path.join(__dirname, './../../');

function settings() {
  var d = q.defer();

  fs.readFile(path.join(abs, 'env.json'), 'utf-8', function(err, data) {
    var config;

    if (err) {
      d.reject(err.stack);
    } else {
      config = JSON.parse(data);

      Object.keys(config)
        .forEach(function(key) {
          settings[key] = config[key];
        });

      d.resolve(settings);
    }
  });

  return d.promise;
}

export default settings;
