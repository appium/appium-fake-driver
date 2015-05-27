//import chai from 'chai';
import { initSession, TEST_APP } from './helpers';

//const should = chai.should();

function elementTests () {
  describe('element interaction and introspection', async () => {
    const caps = {app: TEST_APP};
    let driver;
    initSession(caps).then((d) => { driver = d; });

    it('should not send keys to an invalid element', async () => {
      await driver.elementByXPath('//MockListItem').sendKeys("test value")
              .should.eventually.be.rejectedWith(/12/);
    });
    it('should send keys to an element and retrieve text', async () => {
      let el = await driver.elementByXPath('//MockInputField');
      await el.sendKeys("test value");
      (await el.text()).should.eql("test value");
    });
    it('should not clear an invalid element', async () => {
      await driver.elementByXPath('//MockListItem').clear()
              .should.eventually.be.rejectedWith(/12/);
    });
    it('should clear an element', async () => {
      let el = driver.elementByXPath('//MockInputField');
      (await el.text()).should.not.eql('');
      await el.clear();
      (await el.text()).should.eql('');
    });
    it('should not click an invisible element', async () => {
      await driver.elementById('Button1').click()
              .should.eventually.be.rejectedWith(/12/);
    });
    it('should click an element and get its attributes', async () => {
      let el = driver.elementById('Button2');
      await el.click();
      await el.click();
      await el.click();
      (await el.getAttribute('clicks')).should.equal(3);
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
}

export default elementTests;
