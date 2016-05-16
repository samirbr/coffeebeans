// https://www.npmjs.com/package/express-decorators
import * as web from 'express-decorators';
import {readonly} from 'core-decorators'; // eslint-disable-line no-unused-vars // https://www.npmjs.com/package/core-decorators
import User from 'user/models';

@web.controller('/user')
class UserController {
  constructor(target) {
    this.target = target;
  }

  @web.get('/create')
  add(request, response) {
    response.send(User.create('new').toHTML());
  }

  @web.post('/create')
  create(request, response) {
    
  }

  @web.get('/list')
  list(request, response) {
    User.paginate(request.query, request.params)
      .then(function(records) {
        response.json(records);
      }, function(err) {
        response.json(err);
      });
  }
}

export default new UserController();
