'use strict';

const Controller = require('egg').Controller;
const fs = require('fs')

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.body = {
      id: 1,
      name: 'zhangluya',
      age: 20
    };

    console.log(ctx.response.header)
  }

  async maintApi() {
    const { ctx } = this;

    console.log(ctx);

    const requestBody = ctx.request.body;

    const responseBody = {code: 0, message: 'success', data: null};

    const data = JSON.parse(fs.readFileSync(ctx.app.baseDir + '/app/public/' + requestBody.action + '.json').toString()); 
    responseBody.data = data;

    ctx.body = responseBody;
  }
}

module.exports = HomeController;
