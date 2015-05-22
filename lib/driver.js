import _ from 'lodash';
import { BaseDriver } from 'appium-base-driver';
import { FakeApp } from './fake-app';
import { commands } from './commands';

class FakeDriver extends BaseDriver {

  constructor () {
    super();
    this.appModel = null;
    this.curContext = 'NATIVE_APP';
    this.elMap = {};
    this.focusedElId = null;
    this.maxElId = 0;
  }

  async createSession (caps) {
    // TODO add validation on caps.app that we will get for free from
    // BaseDriver
    let [sessionId] = await super.createSession(caps);
    this.appModel = new FakeApp();
    try {
      await this.appModel.loadApp(caps.app);
    } catch (e) {
      console.log(e.stack);
      throw e;
    }
    return [sessionId, caps];
  }
}

for (let [cmd, fn] of _.pairs(commands)) {
  FakeDriver.prototype[cmd] = fn;
}

export { FakeDriver };
