import mongoose from 'mongoose'; // eslint-disable-line no-unused-vars
import softdelete from 'mongoose-soft-delete';
import {Model, plugin} from 'mongoose-babelmodel'; // eslint-disable-line no-unused-vars
import {BaseModel} from 'core/models';

@plugin(softdelete)
class User extends BaseModel {
  email = { type: String, unique: true, forms: { all: { type: 'email' } } };
}

let user = new User();
export default user.generateModel();
