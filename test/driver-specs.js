// transpile:mocha

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import wd from 'wd';
import 'mochawait';
import { startServer } from '../..';
import { TEST_APP, TEST_HOST, TEST_PORT } from './helpers';

import contextTests from './context-tests';
import findElementTests from './find-element-tests';

const should = chai.should();
const shouldStartServer = process.env.USE_RUNNING_SERVER !== "0";
chai.use(chaiAsPromised);

describe('FakeDriver - via HTTP', () => {
  let server;
  const caps = {app: TEST_APP};
  before(async () => {
    if (shouldStartServer) {
      server = await startServer(TEST_PORT, TEST_HOST);
    }
  });
  after(() => {
    if (shouldStartServer) {
      server.close();
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
  });

    //describe('interacting with elements', () => {
      //var el;
      //it.skip('should not send keys to an invalid element', async () => {
        //driver
          //.elementByXPath('//MockListItem')
          //.sendKeys("test value")
          //.should.eventually.be.rejectedWith(/12/)
          //.nodeify();
      //});
      //it.skip('should send keys to an element', async () => {
        //driver
          //.elementByXPath('//MockInputField')
          //.then(function (_el) {
            //el = _el;
            //return el;
          //})
          //.sendKeys("test value")
          //.nodeify();
      //});
      //it.skip('should get text of an element', async () => {
        //el
          //.text()
          //.should.eventually.become("test value")
          //.nodeify();
      //});
      //it.skip('should not clear an invalid element', async () => {
        //driver
          //.elementByXPath('//MockListItem')
          //.clear()
          //.should.eventually.be.rejectedWith(/12/)
          //.nodeify();
      //});
      //it.skip('should clear an element', async () => {
        //driver
          //.elementByXPath('//MockInputField')
          //.clear()
          //.text()
          //.should.eventually.become('')
          //.nodeify();
      //});
      //it.skip('should not click an invisible element', async () => {
        //driver
          //.elementByXPath('//MockButton[@id="Button1"]')
          //.click()
          //.should.eventually.be.rejectedWith(/12/)
          //.nodeify();
      //});
      //it.skip('should click an element', async () => {
        //driver
          //.elementByXPath('//MockButton[@id="Button2"]')
          //.then(function (_el) { el = _el; return el; })
          //.click()
          //.click()
          //.click()
          //.nodeify();
      //});
      //it.skip('should get the attribute of an element', async () => {
        //el
          //.getAttribute('clicks')
          //.should.eventually.become(3)
          //.nodeify();
      //});
      //it.skip('should get the name of an element', async () => {
        //driver
          //.elementByClassName('MockInputField')
            //.getTagName()
            //.should.eventually.become('MockInputField')
          //.elementById('wv')
            //.getTagName()
            //.should.eventually.become('MockWebView')
          //.nodeify();
      //});
      //it.skip('should detect whether an element is displayed', async () => {
        //driver
          //.elementByXPath('//MockButton[@id="Button1"]')
          //.isDisplayed()
            //.should.eventually.become(false)
          //.elementByXPath('//MockButton[@id="Button2"]')
          //.isDisplayed()
            //.should.eventually.become(true)
          //.nodeify();
      //});
      //it.skip('should detect whether an element is enabled', async () => {
        //driver
          //.elementByXPath('//MockButton[@id="Button1"]')
          //.isEnabled()
            //.should.eventually.become(false)
          //.elementByXPath('//MockButton[@id="Button2"]')
          //.isEnabled()
            //.should.eventually.become(true)
          //.nodeify();
      //});
      //it.skip('should detect whether an element is enabled', async () => {
        //driver
          //.elementByXPath('//MockButton[@id="Button1"]')
          //.isSelected()
            //.should.eventually.become(false)
          //.elementByXPath('//MockButton[@id="Button2"]')
          //.isSelected()
            //.should.eventually.become(true)
          //.nodeify();
      //});
      //it.skip('should get the location on screen of an element', async () => {
        //driver
          //.elementById('nav')
          //.getLocation()
          //.should.eventually.eql({x: 1, y: 1})
          //.nodeify();
      //});
      //it.skip('should get the location on screen of an element with float vals', async () => {
        //driver
          //.elementById('lv')
          //.getLocation()
          //.should.eventually.eql({x: 20.8, y: 15.3})
          //.nodeify();
      //});
      //it.skip('should get the location in view of an element', async () => {
        //driver
          //.elementById('nav')
          //.getLocationInView()
          //.should.eventually.eql({x: 1, y: 1})
          //.nodeify();
      //});
      //it.skip('should get the location in view of an element with float vals', async () => {
        //driver
          //.elementById('lv')
          //.getLocationInView()
          //.should.eventually.eql({x: 20.8, y: 15.3})
          //.nodeify();
      //});

      //it.skip('should get the size of an element', async () => {
        //driver
          //.elementById('nav')
          //.getSize()
          //.should.eventually.eql({width: 100, height: 100})
          //.nodeify();
      //});
      //it.skip('should get the size of an element with float vals', async () => {
        //driver
          //.elementById('wv')
          //.getSize()
          //.should.eventually.eql({width: 20.8, height: 20.5})
          //.nodeify();
      //});
      //it.skip('should determine element equality', async () => {
        //var el1;
        //driver
          //.elementById('wv')
          //.then(function (el) {
            //el1 = el;
            //return driver;
          //})
          //.elementById('wv')
          //.then(function (el2) {
            //return el2.equals(el1);
          //})
          //.should.eventually.become(true)
          //.nodeify();
      //});
      //it.skip('should determine element inequality', async () => {
        //var el1;
        //driver
          //.elementById('wv')
          //.then(function (el) {
            //el1 = el;
            //return driver;
          //})
          //.elementById('lv')
          //.then(function (el2) {
            //return el2.equals(el1);
          //})
          //.should.eventually.become(false)
          //.nodeify();
      //});
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

