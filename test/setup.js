require('dotenv/config');
const nock = require('nock');

exports.mochaHooks = {
  afterEach() {
    nock.cleanAll();
    nock.enableNetConnect();
  }
};
