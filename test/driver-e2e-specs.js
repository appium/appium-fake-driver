// transpile:mocha

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import wd from 'wd';
import request from 'request-promise';
import { baseDriverE2ETests, baseDriverUnitTests } from 'appium-base-driver/build/test/basedriver';
import { FakeDriver, startServer } from '..';
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

describe('FakeDriver - via HTTP', function () {
  let server = null;
  before(async function () {
    if (shouldStartServer) {
      server = await startServer(TEST_PORT, TEST_HOST);
    }
  });
  after(async function () {
    if (server) {
      server.close();
    }
  });

  describe('session handling', function () {
    it('should start and stop a session', async function () {
      let driver = wd.promiseChainRemote(TEST_HOST, TEST_PORT);
      let [sessionId] = await driver.init(DEFAULT_CAPS);
      should.exist(sessionId);
      sessionId.should.be.a('string');
      await driver.quit();
      await driver.title().should.eventually.be.rejectedWith(/terminated/);
    });

  });

  describe('session-based tests', function () {
    contextTests();
    findElementTests();
    elementInteractionTests();
    alertTests();
    generalTests();
  });

  describe('w3c', function () {
    it('should return value.capabilities object for W3C', async function () {
      let res = await request.post(`http://${TEST_HOST}:${TEST_PORT}/wd/hub/session`, {
        json: {
          capabilities: {
            alwaysMatch: DEFAULT_CAPS,
            firstMatch: [{
              'appium:fakeCap': 'Foo',
            }],
          }
        }
      });
      res.value.capabilities.should.deep.equal(Object.assign({}, DEFAULT_CAPS, {
        fakeCap: 'Foo',
      }));
      res.value.sessionId.should.exist;
      should.not.exist(res.status);
      res = await request.delete(`http://${TEST_HOST}:${TEST_PORT}/wd/hub/session/${res.value.sessionId}`);
    });

    it('should return value object for MJSONWP as desiredCapabilities', async function () {
      let res = await request.post(`http://${TEST_HOST}:${TEST_PORT}/wd/hub/session`, {
        json: { desiredCapabilities: DEFAULT_CAPS }
      });
      res.value.should.deep.equal(DEFAULT_CAPS);
      res.status.should.equal(0);
      res.sessionId.should.exist;
      res = await request.delete(`http://${TEST_HOST}:${TEST_PORT}/wd/hub/session/${res.sessionId}`);
    });
  });

});
