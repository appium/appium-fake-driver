import path from 'path';
import wd from 'wd';

const TEST_HOST = 'localhost';
const TEST_PORT = 4774;
const TEST_APP = path.resolve(__dirname, "..", "..", "test", "fixtures", "app.xml");

const DEFAULT_CAPS = {platformName: 'Fake', deviceName: 'Fake', app: TEST_APP};

function initSession (caps) {
  let resolve = () => {};
  let driver;
  before(async () => {
    driver = wd.promiseChainRemote({host: TEST_HOST, port: TEST_PORT});
    await driver.init(caps);
    resolve(driver);
  });
  after(async () => {
    await driver.quit();
  });
  return new Promise((_resolve) => {
    resolve = _resolve;
  });
}

export { initSession, TEST_APP, TEST_HOST, TEST_PORT, DEFAULT_CAPS };
