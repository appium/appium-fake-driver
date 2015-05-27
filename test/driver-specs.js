// transpile:mocha

import B from 'bluebird';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import wd from 'wd';
import 'mochawait';
import { startServer } from '../..';
import { TEST_APP, TEST_HOST, TEST_PORT } from './helpers';

import contextTests from './context-tests';
import findElementTests from './find-element-tests';
import elementInteractionTests from './element-interaction-tests';
import alertTests from './alert-tests';
import generalTests from './general-tests';

const should = chai.should();
const shouldStartServer = process.env.USE_RUNNING_SERVER !== "0";
chai.use(chaiAsPromised);

describe('FakeDriver - via HTTP', () => {
  let server = null;
  const caps = {app: TEST_APP};
  before(async () => {
    if (shouldStartServer) {
      server = await startServer(TEST_PORT, TEST_HOST);
    }
  });
  after(async () => {
    if (server) {
      await B.promisify(server.close.bind(server))();
    }
  });

  describe('commands', () => {
    it('should start and stop a session', async () => {
      let driver = wd.promiseChainRemote(TEST_HOST, TEST_PORT);
      let [sessionId] = await driver.init(caps);
      should.exist(sessionId);
      sessionId.should.be.a('string');
      await driver.quit();
      await driver.title().should.eventually.be.rejectedWith(/terminated/);
    });
  });

  describe('session-based tests', () => {
    contextTests();
    findElementTests();
    elementInteractionTests();
    alertTests();
    generalTests();
  });

});
