import path from 'path';
import wd from 'wd';

const TEST_HOST = 'localhost';
const TEST_PORT = 4774;
const TEST_APP = path.resolve(__dirname, "..", "..", "test", "fixtures", "app.xml");

function initSession (caps) {
  let resolve = () => {};
  let driver;
  before(async () => {
    driver = wd.promiseChainRemote({host: TEST_HOST, port: TEST_PORT});
    resolve(driver);
    await driver.init(caps);
  });
  after(async () => {
    await driver.quit();
  });
  return new Promise((_resolve) => {
    resolve = _resolve;
  });
}

export { initSession, TEST_APP, TEST_HOST, TEST_PORT };
