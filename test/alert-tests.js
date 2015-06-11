import { initSession, DEFAULT_CAPS } from './helpers';

function alertTests () {
  describe('alerts', () => {
    let driver;
    initSession(DEFAULT_CAPS).then((d) => { driver = d; });

    it('should not work with alerts when one is not present', async () => {
      await driver.alertText().should.eventually.be.rejectedWith(/27/);
      await driver.alertKeys('foo').should.eventually.be.rejectedWith(/27/);
      await driver.acceptAlert().should.eventually.be.rejectedWith(/27/);
      await driver.dismissAlert().should.eventually.be.rejectedWith(/27/);
    });
    it('should get text of an alert', async () => {
      await driver.elementById("AlertButton").click();
      (await driver.alertText()).should.equal("Fake Alert");
    });
    it('should set the text of an alert', async () => {
      await driver.alertKeys('foo');
      (await driver.alertText()).should.equal('foo');
    });
    it('should not do other things while an alert is there', async () => {
      await driver.elementById("nav").click()
              .should.eventually.be.rejectedWith(/26/);
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
