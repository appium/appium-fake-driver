// transpile:mocha

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import wd from 'wd';
import { baseDriverE2ETests, baseDriverUnitTests } from 'appium-base-driver/build/test/basedriver';
import { FakeDriver, startServer } from '../..';
import { DEFAULT_CAPS, TEST_HOST, TEST_PORT } from './helpers';
import contextTests from './context-tests';
import findElementTests from './find-element-tests';
import elementInteractionTests from './element-interaction-tests';
import alertTests from './alert-tests';
import generalTests from './general-tests';

const should = chai.should();
chai.use(chaiAsPromised);
const shouldStartServer = process.env.USE_RUNNING_SERVER !== "0";

// test the same things as for base driver
baseDriverUnitTests(FakeDriver, DEFAULT_CAPS);
baseDriverE2ETests(FakeDriver, DEFAULT_CAPS);

describe('FakeDriver - via HTTP', () => {
  let server = null;
  before(async () => {
    if (shouldStartServer) {
      server = await startServer(TEST_PORT, TEST_HOST);
    }
  });
  after(async () => {
    if (server) {
      server.close();
    }
  });

  describe('session handling', () => {
    it('should start and stop a session', async () => {
      let driver = wd.promiseChainRemote(TEST_HOST, TEST_PORT);
      let [sessionId] = await driver.init(DEFAULT_CAPS);
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
