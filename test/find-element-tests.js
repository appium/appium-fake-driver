import chai from 'chai';
import { initSession, DEFAULT_CAPS } from './helpers';

const should = chai.should();

function findElementTests () {
  describe('finding elements', () => {
    let driver;
    initSession(DEFAULT_CAPS).then((d) => { driver = d; });

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

    it('should find an element from another element', async () => {
      let el = await driver.elementById('iframe1');
      let title = await el.elementByTagName('title');
      let earlierTitle = await driver.elementByTagName('title');
      (await earlierTitle.equals(title)).should.equal(false);
    });
    it('should find multiple elements from another element', async () => {
      let el = await driver.elementByTagName('html');
      let titles = await el.elementsByTagName('title');
      titles.length.should.equal(2);
    });
    it('should not find an element that doesnt exist from another element', async () => {
      let el = await driver.elementByTagName('html');
      await el.elementByTagName('marquee')
              .should.eventually.be.rejectedWith(/7/);

    });
    it('should not find multiple elements that dont exist from another element', async () => {
      let el = await driver.elementByTagName('html');
      (await el.elementsByTagName('marquee')).should.eql([]);
    });
    it('should not find an element with bad strategy from another element', async () => {
      await driver.elementByTagName('html').elementByCss('.sorry')
              .should.eventually.be.rejectedWith(/9/);
    });
    it('should not find elements with bad strategy from another element', async () => {
      await driver.elementByTagName('html').elementsByCss('.sorry')
              .should.eventually.be.rejectedWith(/9/);
    });
    it('should error if root element is not valid', async () => {
      let el = await driver.elementByTagName('html');
      el.value = 'foobar';
      await el.elementByTagName('body').should.eventually.be.rejectedWith(/10/);
    });
  });
}

export default findElementTests;

