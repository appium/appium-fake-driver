import chai from 'chai';
import { initSession, TEST_APP } from './helpers';

//const should = chai.should();
chai.should();

function alertTests () {
  describe('alerts', () => {
    const caps = {app: TEST_APP};
    let driver;
    initSession(caps).then((d) => { driver = d; });

    it.skip('should not work with alerts when one is not present', async () => {
      await driver.alertText().should.eventually.be.rejectedWith(/27/);
      await driver.alertKeys('foo').should.eventually.be.rejectedWith(/27/);
      await driver.acceptAlert().should.eventually.be.rejectedWith(/27/);
      await driver.dismissAlert().should.eventually.be.rejectedWith(/27/);
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

}

export default alertTests;
