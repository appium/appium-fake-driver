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
  });

    //describe('interacting with elements', () => {
      //var el;
    //});

    //describe('alerts', () => {
      //it.skip('should not work with alerts when one is not present', async () => {
        //driver
          //.alertText()
            //.should.eventually.be.rejectedWith(/27/)
          //.alertKeys('foo')
            //.should.eventually.be.rejectedWith(/27/)
          //.acceptAlert()
            //.should.eventually.be.rejectedWith(/27/)
          //.dismissAlert()
            //.should.eventually.be.rejectedWith(/27/)
          //.nodeify();
      //});
      //it.skip('should get text of an alert', async () => {
        //driver
          //.elementById("AlertButton")
            //.click()
          //.alertText()
            //.should.eventually.become("Fake Alert")
          //.nodeify();
      //});
      //it.skip('should set the text of an alert', async () => {
        //driver
          //.alertKeys('foo')
          //.alertText()
            //.should.eventually.become('foo')
          //.nodeify();
      //});
      //it.skip('should not do other things while an alert is there', async () => {
        //driver
          //.elementById("nav")
          //.click()
            //.should.eventually.be.rejectedWith(/26/)
          //.nodeify();
      //});
      //it.skip('should accept an alert', async () => {
        //driver
          //.acceptAlert()
          //.elementById("nav")
          //.click()
          //.nodeify();
      //});
      //it.skip('should not set the text of the wrong kind of alert', async () => {
        //driver
          //.elementById("AlertButton2")
          //.click()
          //.alertText()
            //.should.eventually.become('Fake Alert 2')
          //.alertKeys('foo')
            //.should.be.rejectedWith(/12/)
          //.nodeify();
      //});
      //it.skip('should dismiss an alert', async () => {
        //driver
          //.acceptAlert()
          //.elementById("nav")
          //.click()
          //.nodeify();
      //});
    //});

    //describe('generic selenium actions', () => {
      //it.skip('should not send keys without a focused element', async () => {
        //driver
          //.keys("test")
          //.should.eventually.be.rejectedWith(/12/)
          //.nodeify();
      //});
      //it.skip('should send keys to a focused element', async () => {
        //var el;
        //driver
          //.elementById('input')
          //.then(function (_el) {
            //el = _el;
            //return el;
          //})
          //.click()
          //.keys("test")
          //.then(() => {
            //return el;
          //})
          //.text()
          //.should.eventually.become("test")
          //.nodeify();
      //});
      //it.skip('should set geolocation', async () => {
        //driver
          //.setGeoLocation(-30, 30)
          //.nodeify();
      //});
      //it.skip('should get app source', async () => {
        //driver
          //.source()
          //.should.eventually.contain('<MockNavBar id="nav"')
          //.nodeify();
      //});
    //});
  //});
});

