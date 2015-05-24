import chai from 'chai';
import { initSession, TEST_APP } from './helpers';

const should = chai.should();

function findElementTests () {
  describe('finding elements', async () => {
    const caps = {app: TEST_APP};
    let driver;
    initSession(caps).then((d) => { driver = d; });

    it('should find a single element by xpath', async () => {
      let el = await driver.elementByXPath('//MockWebView');
      should.exist(el.value);
    });
    it('should not find a single element that is not there', async () => {
      await driver.elementByXPath('//dontexist')
              .should.eventually.be.rejectedWith(/7/);
    });
    it('should find multiple elements', async () => {
      let els = await driver.elementsByXPath('//MockListItem');
      els.should.have.length(3);
    });
    it('should not find multiple elements that are not there', async () => {
      let els = await driver.elementsByXPath('//dontexist');
      els.should.eql([]);
    });

    it('should find a single element by id', async () => {
      let el = await driver.elementById('wv');
      should.exist(el.value);
    });
    it('should not find a single element by id that is not there', async () => {
      await driver.elementById('dontexist')
              .should.eventually.be.rejectedWith(/7/);
    });
    it('should find multiple elements by id', async () => {
      let els = await driver.elementsById('li');
      els.should.have.length(2);
    });
    it('should not find multiple elements by id that are not there', async () => {
      let els = await driver.elementsById('dontexist');
      els.should.eql([]);
    });

    it('should find a single element by class', async () => {
      let el = await driver.elementByClassName('MockWebView');
      should.exist(el.value);
    });
    it('should not find a single element by class that is not there', async () => {
      await driver.elementById('dontexist')
              .should.eventually.be.rejectedWith(/7/);
    });
    it('should find multiple elements by class', async () => {
      let els = await driver.elementsByClassName('MockListItem');
      els.should.have.length(3);
    });
    it('should not find multiple elements by class that are not there', async () => {
      let els = await driver.elementsByClassName('dontexist');
      els.should.eql([]);
    });

    it('should not find a single element with bad strategy', async () => {
      await driver.elementByCss('.sorry')
              .should.eventually.be.rejectedWith(/9/);
    });
    it('should not find a single element with bad selector', async () => {
      await driver.elementByXPath('badsel')
              .should.eventually.be.rejectedWith(/32/);
    });
    it('should not find multiple elements with bad strategy', async () => {
      await driver.elementsByCss('.sorry')
              .should.eventually.be.rejectedWith(/9/);
    });
    it('should not find multiple elements with bad selector', async () => {
      await driver.elementsByXPath('badsel')
              .should.eventually.be.rejectedWith(/32/);
    });
  });
}

export default findElementTests;

