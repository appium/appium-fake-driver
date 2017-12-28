import chai from 'chai';
import { initSession, deleteSession, DEFAULT_CAPS } from './helpers';

const should = chai.should();

function generalTests () {
  describe('generic actions', function () {
    let driver;

    before(async function () {
      driver = await initSession(DEFAULT_CAPS);
    });

    after(async function () {
      await deleteSession();
    });

    it('should not send keys without a focused element', async function () {
      await driver.keys("test").should.eventually.be.rejectedWith(/12/);
    });
    it('should send keys to a focused element', async function () {
      let el = await driver.elementById('input');
      await el.click();
      await driver.keys("test");
      (await el.text()).should.equal("test");
    });
    it.skip('should set geolocation', async function () {
      // TODO unquarantine when WD fixes what it sends the server
      await driver.setGeoLocation(-30, 30);
    });
    it('should get geolocation', async function () {
      let geo = await driver.getGeoLocation();
      should.exist(geo.latitude);
      should.exist(geo.longitude);
    });
    it('should get app source', async function () {
      let source = await driver.source();
      source.should.contain('<MockNavBar id="nav"');
    });
    // TODO do we want to test driver.pageIndex? probably not

    it('should get the orientation', async function () {
      (await driver.getOrientation()).should.equal("PORTRAIT");
    });
    it('should set the orientation to something valid', async function () {
      await driver.setOrientation("LANDSCAPE");
      (await driver.getOrientation()).should.equal("LANDSCAPE");
    });
    it('should not set the orientation to something invalid', async function () {
      await driver.setOrientation("INSIDEOUT")
              .should.eventually.be.rejectedWith(/Orientation must be/);
    });

    it('should get a screenshot', async function () {
      should.exist(await driver.takeScreenshot());
    });

    it('should set implicit wait timeout', async function () {
      await driver.setImplicitWaitTimeout(1000);
    });
    it('should not set invalid implicit wait timeout', async function () {
      await driver.setImplicitWaitTimeout('foo')
              .should.eventually.be.rejectedWith(/ms/);
    });

    // skip these until basedriver supports these timeouts
    it.skip('should set async script timeout', async function () {
      await driver.setAsyncScriptTimeout(1000);
    });
    it.skip('should not set invalid async script timeout', async function () {
      await driver.setAsyncScriptTimeout('foo')
              .should.eventually.be.rejectedWith(/ms/);
    });

    it.skip('should set page load timeout', async function () {
      await driver.setPageLoadTimeout(1000);
    });
    it.skip('should not set page load script timeout', async function () {
      await driver.setPageLoadTimeout('foo')
              .should.eventually.be.rejectedWith(/ms/);
    });
  });
}

export default generalTests;
