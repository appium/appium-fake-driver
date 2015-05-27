import chai from 'chai';
import { initSession, TEST_APP } from './helpers';

const should = chai.should();

function generalTests () {
  describe('generic actions', async () => {
    const caps = {app: TEST_APP};
    let driver;
    initSession(caps).then((d) => { driver = d; });
    it('should not send keys without a focused element', async () => {
      await driver.keys("test").should.eventually.be.rejectedWith(/12/);
    });
    it('should send keys to a focused element', async () => {
      let el = await driver.elementById('input');
      await el.click();
      await driver.keys("test");
      (await el.text()).should.equal("test");
    });
    it.skip('should set geolocation', async () => {
      // TODO unquarantine when WD fixes what it sends the server
      await driver.setGeoLocation(-30, 30);
    });
    it('should get geolocation', async () => {
      let geo = await driver.getGeoLocation();
      should.exist(geo.latitude);
      should.exist(geo.longitude);
    });
    it('should get app source', async () => {
      let source = await driver.source();
      source.should.contain('<MockNavBar id="nav"');
    });
  });
}

export default generalTests;
