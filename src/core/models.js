import q from 'q';
import {abstract} from 'pingo';
import mongoose from 'mongoose'; // eslint-disable-line no-unused-vars
import {default as paginate} from 'mongoose-paginate'; // https://github.com/edwardhotchkiss/mongoose-paginate
import forms from 'forms-mongoose'; // https://www.npmjs.com/package/forms-mongoose
import {Model as ModelImpl, plugin} from 'mongoose-babelmodel'; // https://www.npmjs.com/package/mongoose-babelmodel
import timestamp from 'mongoose-timestamp';

@abstract
@plugin(paginate)
class Model extends ModelImpl {
  static get(query) {
    return this.findOne(query);
  }

  static createForm(extra) {
    return forms.create(this, extra);
  }

  static createOrUpdate(query, params) {
    var d = q.defer();

    this.getOrCreate(query)
      .then(function(objCreated) {
        var [obj, created] = objCreated;

        if (created) {
          d.resolve(recordCreated);
        } else {
          obj = Object.key(params)
            .reduce(function(o, key) {
              o[key] = params[key];
              return o;
            }, obj);

          obj.save()
          .then(function(record) {
            d.resolve([record, false]);
          }, d.reject);
        }
      });

    return d.promise;
  }

  static getOrCreate(query, params) {
    var d = q.defer();
    var Cls = this.model;
    var obj;

    this.findOne(query, function(err, record) {
      if (err) {
        d.reject(err);
      } else if (record) {
        d.resolve([record, false]);
      } else {
        query = Object.key(params)
          .reduce(function(o, key) {
            o[key] = params[key];
            return o;
          }, query);

        obj = new Cls(query);
        obj.save()
          .then(function() {
            d.resolve([obj, true]);
          }, d.reject);
      }
    });

    return d.promise;
  }
}

@abstract
@plugin(timestamp)
class DateModel extends Model {
}

@abstract
class BaseModel extends DateModel {
  name = String;

  constructor(schema = {}) {
    super(schema);
    super.schema.name = this.name;
  }
}

export {
  Model,
  DateModel,
  BaseModel
};
