import mongoose from 'mongoose';
import q from 'q';
import settings from 'core/settings';

function dbconnect() {
  var d = q.defer();

  var options = {
    server: {
      poolSize: 5,
      socketOptions: {
        keepAlive: 1
      }
    }
  };

  mongoose.set('debug', function(coll, method, query, doc) {
    console.log('debug', coll, method, query, doc); // eslint-disable-line no-console
  });

  mongoose.connect(settings.DB_URL, options);

  mongoose.connection.on('error', function() {
    console.error('connection error:'); // eslint-disable-line no-console
    d.reject();
  });
  mongoose.connection.once('open', function() {
    console.log('db open'); // eslint-disable-line no-console
    d.resolve(mongoose.connection);
  });

  return d.promise;
}

export default dbconnect;
