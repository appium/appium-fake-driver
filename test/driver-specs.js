// transpile:mocha

import { startServer } from '../..';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import wd from 'wd';
import path from 'path';
import 'mochawait';

const should = chai.should();
chai.use(chaiAsPromised);

const TEST_HOST = 'localhost';
const TEST_PORT = 4774;
const TEST_APP = path.resolve(__dirname, "..", "..", "test", "fixtures", "app.xml");

describe('FakeDriver - via HTTP', () => {
  let server;
  const caps = {app: TEST_APP};
  before(async () => {
    server = await startServer(TEST_PORT, TEST_HOST);
  });
  after(() => {
    server.close();
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

  describe('session-based commands', () => {
    let driver;
    before(async () => {
      driver = wd.promiseChainRemote({host: TEST_HOST, port: TEST_PORT});
      await driver.init(caps);
    });
    after(async () => {
      await driver.quit();
    });

    describe('contexts, webviews, frames', () => {
      it('should get current context', async () => {
        await driver.currentContext().should.eventually.become('NATIVE_APP');
      });
      it('should get contexts', async () => {
        await driver.contexts().should.eventually.become(['NATIVE_APP', 'WEBVIEW_1']);
      });
      it.skip('should not set context that is not there', async () => {
        driver
          .context('WEBVIEW_FOO')
            .should.eventually.be.rejectedWith(/35/)
          .nodeify();
      });
      it.skip('should set context', async () => {
        driver
          .context('WEBVIEW_1')
          .currentContext()
            .should.eventually.become('WEBVIEW_1')
          .nodeify();
      });
      it.skip('should find webview elements in a webview', async () => {
        driver
          .elementByXPath('//*')
          .getTagName()
            .should.eventually.become('html')
          .nodeify();
      });
      it.skip('should not switch to a frame that is not there', async () => {
        driver
          .frame('foo')
          .should.eventually.be.rejectedWith(/8/)
          .nodeify();
      });
      it.skip('should switch to an iframe', async () => {
        driver
          .frame('iframe1')
          .title()
          .should.eventually.become('Test iFrame')
          .nodeify();
      });
      it.skip('should switch back to default frame', async () => {
        driver
          .frame(null)
          .title()
          .should.eventually.become('Test Webview')
          .nodeify();
      });
      it.skip('should go back to native context', async () => {
        driver
          .context('NATIVE_APP')
          .elementByXPath('//*')
          .getTagName()
            .should.eventually.become('app')
          .nodeify();
      });
      it.skip('should not set a frame in a native context', async () => {
        driver
          .frame('iframe1')
          .should.eventually.be.rejectedWith(/36/)
          .nodeify();
      });
    });

    describe('finding elements', () => {
      it.skip('should find a single element by xpath', async () => {
        driver
          .elementByXPath('//MockWebView')
          .then(function (el) {
            el.value.should.exist;
          })
          .nodeify();
      });
      it.skip('should not find a single element that is not there', async () => {
        driver
          .elementByXPath('//dontexist')
          .should.eventually.be.rejectedWith(/7/)
          .nodeify();
      });
      it.skip('should find multiple elements', async () => {
        driver
          .elementsByXPath('//MockListItem')
          .then(function (els) {
            els.should.have.length(3);
          })
          .nodeify();
      });
      it.skip('should not find multiple elements that are not there', async () => {
        driver
          .elementsByXPath('//dontexist')
          .should.eventually.eql([])
          .nodeify();
      });

      it.skip('should find a single element by id', async () => {
        driver
          .elementById('wv')
          .then(function (el) {
            el.value.should.exist;
          })
          .nodeify();
      });
      it.skip('should not find a single element by id that is not there', async () => {
        driver
          .elementById('dontexist')
          .should.eventually.be.rejectedWith(/7/)
          .nodeify();
      });
      it.skip('should find multiple elements by id', async () => {
        driver
          .elementsById('li')
          .then(function (els) {
            els.should.have.length(2);
          })
          .nodeify();
      });
      it.skip('should not find multiple elements by id that are not there', async () => {
        driver
          .elementsById('dontexist')
          .should.eventually.eql([])
          .nodeify();
      });

      it.skip('should find a single element by class', async () => {
        driver
          .elementByClassName('MockWebView')
          .then(function (el) {
            el.value.should.exist;
          })
          .nodeify();
      });
      it.skip('should not find a single element by class that is not there', async () => {
        driver
          .elementById('dontexist')
          .should.eventually.be.rejectedWith(/7/)
          .nodeify();
      });
      it.skip('should find multiple elements by class', async () => {
        driver
          .elementsByClassName('MockListItem')
          .then(function (els) {
            els.should.have.length(3);
          })
          .nodeify();
      });
      it.skip('should not find multiple elements by class that are not there', async () => {
        driver
          .elementsByClassName('dontexist')
          .should.eventually.eql([])
          .nodeify();
      });

      it.skip('should not find a single element with bad strategy', async () => {
        driver
          .elementByCss('.sorry')
          .should.eventually.be.rejectedWith(/9/)
          .nodeify();
      });
      it.skip('should not find a single element with bad selector', async () => {
        driver
          .elementByXPath('badsel')
          .should.eventually.be.rejectedWith(/32/)
          .nodeify();
      });
      it.skip('should not find multiple elements with bad strategy', async () => {
        driver
          .elementsByCss('.sorry')
          .should.eventually.be.rejectedWith(/9/)
          .nodeify();
      });
      it.skip('should not find multiple elements with bad selector', async () => {
        driver
          .elementsByXPath('badsel')
          .should.eventually.be.rejectedWith(/32/)
          .nodeify();
      });
    });

    describe('interacting with elements', () => {
      var el;
      it.skip('should not send keys to an invalid element', async () => {
        driver
          .elementByXPath('//MockListItem')
          .sendKeys("test value")
          .should.eventually.be.rejectedWith(/12/)
          .nodeify();
      });
      it.skip('should send keys to an element', async () => {
        driver
          .elementByXPath('//MockInputField')
          .then(function (_el) {
            el = _el;
            return el;
          })
          .sendKeys("test value")
          .nodeify();
      });
      it.skip('should get text of an element', async () => {
        el
          .text()
          .should.eventually.become("test value")
          .nodeify();
      });
      it.skip('should not clear an invalid element', async () => {
        driver
          .elementByXPath('//MockListItem')
          .clear()
          .should.eventually.be.rejectedWith(/12/)
          .nodeify();
      });
      it.skip('should clear an element', async () => {
        driver
          .elementByXPath('//MockInputField')
          .clear()
          .text()
          .should.eventually.become('')
          .nodeify();
      });
      it.skip('should not click an invisible element', async () => {
        driver
          .elementByXPath('//MockButton[@id="Button1"]')
          .click()
          .should.eventually.be.rejectedWith(/12/)
          .nodeify();
      });
      it.skip('should click an element', async () => {
        driver
          .elementByXPath('//MockButton[@id="Button2"]')
          .then(function (_el) { el = _el; return el; })
          .click()
          .click()
          .click()
          .nodeify();
      });
      it.skip('should get the attribute of an element', async () => {
        el
          .getAttribute('clicks')
          .should.eventually.become(3)
          .nodeify();
      });
      it.skip('should get the name of an element', async () => {
        driver
          .elementByClassName('MockInputField')
            .getTagName()
            .should.eventually.become('MockInputField')
          .elementById('wv')
            .getTagName()
            .should.eventually.become('MockWebView')
          .nodeify();
      });
      it.skip('should detect whether an element is displayed', async () => {
        driver
          .elementByXPath('//MockButton[@id="Button1"]')
          .isDisplayed()
            .should.eventually.become(false)
          .elementByXPath('//MockButton[@id="Button2"]')
          .isDisplayed()
            .should.eventually.become(true)
          .nodeify();
      });
      it.skip('should detect whether an element is enabled', async () => {
        driver
          .elementByXPath('//MockButton[@id="Button1"]')
          .isEnabled()
            .should.eventually.become(false)
          .elementByXPath('//MockButton[@id="Button2"]')
          .isEnabled()
            .should.eventually.become(true)
          .nodeify();
      });
      it.skip('should detect whether an element is enabled', async () => {
        driver
          .elementByXPath('//MockButton[@id="Button1"]')
          .isSelected()
            .should.eventually.become(false)
          .elementByXPath('//MockButton[@id="Button2"]')
          .isSelected()
            .should.eventually.become(true)
          .nodeify();
      });
      it.skip('should get the location on screen of an element', async () => {
        driver
          .elementById('nav')
          .getLocation()
          .should.eventually.eql({x: 1, y: 1})
          .nodeify();
      });
      it.skip('should get the location on screen of an element with float vals', async () => {
        driver
          .elementById('lv')
          .getLocation()
          .should.eventually.eql({x: 20.8, y: 15.3})
          .nodeify();
      });
      it.skip('should get the location in view of an element', async () => {
        driver
          .elementById('nav')
          .getLocationInView()
          .should.eventually.eql({x: 1, y: 1})
          .nodeify();
      });
      it.skip('should get the location in view of an element with float vals', async () => {
        driver
          .elementById('lv')
          .getLocationInView()
          .should.eventually.eql({x: 20.8, y: 15.3})
          .nodeify();
      });

      it.skip('should get the size of an element', async () => {
        driver
          .elementById('nav')
          .getSize()
          .should.eventually.eql({width: 100, height: 100})
          .nodeify();
      });
      it.skip('should get the size of an element with float vals', async () => {
        driver
          .elementById('wv')
          .getSize()
          .should.eventually.eql({width: 20.8, height: 20.5})
          .nodeify();
      });
      it.skip('should determine element equality', async () => {
        var el1;
        driver
          .elementById('wv')
          .then(function (el) {
            el1 = el;
            return driver;
          })
          .elementById('wv')
          .then(function (el2) {
            return el2.equals(el1);
          })
          .should.eventually.become(true)
          .nodeify();
      });
      it.skip('should determine element inequality', async () => {
        var el1;
        driver
          .elementById('wv')
          .then(function (el) {
            el1 = el;
            return driver;
          })
          .elementById('lv')
          .then(function (el2) {
            return el2.equals(el1);
          })
          .should.eventually.become(false)
          .nodeify();
      });
    });

    describe('alerts', () => {
      it.skip('should not work with alerts when one is not present', async () => {
        driver
          .alertText()
            .should.eventually.be.rejectedWith(/27/)
          .alertKeys('foo')
            .should.eventually.be.rejectedWith(/27/)
          .acceptAlert()
            .should.eventually.be.rejectedWith(/27/)
          .dismissAlert()
            .should.eventually.be.rejectedWith(/27/)
          .nodeify();
      });
      it.skip('should get text of an alert', async () => {
        driver
          .elementById("AlertButton")
            .click()
          .alertText()
            .should.eventually.become("Fake Alert")
          .nodeify();
      });
      it.skip('should set the text of an alert', async () => {
        driver
          .alertKeys('foo')
          .alertText()
            .should.eventually.become('foo')
          .nodeify();
      });
      it.skip('should not do other things while an alert is there', async () => {
        driver
          .elementById("nav")
          .click()
            .should.eventually.be.rejectedWith(/26/)
          .nodeify();
      });
      it.skip('should accept an alert', async () => {
        driver
          .acceptAlert()
          .elementById("nav")
          .click()
          .nodeify();
      });
      it.skip('should not set the text of the wrong kind of alert', async () => {
        driver
          .elementById("AlertButton2")
          .click()
          .alertText()
            .should.eventually.become('Fake Alert 2')
          .alertKeys('foo')
            .should.be.rejectedWith(/12/)
          .nodeify();
      });
      it.skip('should dismiss an alert', async () => {
        driver
          .acceptAlert()
          .elementById("nav")
          .click()
          .nodeify();
      });
    });

    describe('generic selenium actions', () => {
      it.skip('should not send keys without a focused element', async () => {
        driver
          .keys("test")
          .should.eventually.be.rejectedWith(/12/)
          .nodeify();
      });
      it.skip('should send keys to a focused element', async () => {
        var el;
        driver
          .elementById('input')
          .then(function (_el) {
            el = _el;
            return el;
          })
          .click()
          .keys("test")
          .then(() => {
            return el;
          })
          .text()
          .should.eventually.become("test")
          .nodeify();
      });
      it.skip('should set geolocation', async () => {
        driver
          .setGeoLocation(-30, 30)
          .nodeify();
      });
      it.skip('should get app source', async () => {
        driver
          .source()
          .should.eventually.contain('<MockNavBar id="nav"')
          .nodeify();
      });
    });
  });

});

