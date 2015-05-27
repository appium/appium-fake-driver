// transpile:mocha

import _ from 'lodash';
import B from 'bluebird';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import wd from 'wd';
import 'mochawait';
import { startServer } from '../..';
import { TEST_APP, TEST_HOST, TEST_PORT } from './helpers';

import contextCommands from '../lib/commands/contexts';
import elementCommands from '../lib/commands/element';
import findCommands from '../lib/commands/find';
import generalCommands from '../lib/commands/general';
import exportedCommands from '../lib/commands';

import contextTests from './context-tests';
import findElementTests from './find-element-tests';
import elementInteractionTests from './element-interaction-tests';
import alertTests from './alert-tests';

const should = chai.should();
const shouldStartServer = process.env.USE_RUNNING_SERVER !== "0";
chai.use(chaiAsPromised);

describe('Driver commands', () => {
  let allCommands = [
    _.keys(contextCommands),
    _.keys(elementCommands),
    _.keys(findCommands),
    _.keys(generalCommands)
  ];
  let totalCommands = _.sum(allCommands.map(c => c.length));
  it('should not overlap between files', () => {
    _.union(...allCommands).length.should.equal(totalCommands);
  });
  it('should export all commands and not leave any out', () => {
    _.difference(
      _.union(...allCommands),
      _.keys(exportedCommands)
    ).should.eql([]);
  });
});

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
  });

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
