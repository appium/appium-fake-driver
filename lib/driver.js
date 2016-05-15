import _ from 'lodash';
import { BaseDriver, errors } from 'appium-base-driver';
import { FakeApp } from './fake-app';
import commands from './commands';

class FakeDriver extends BaseDriver {

  constructor () {
    super();
    this.appModel = null;
    this.curContext = 'NATIVE_APP';
    this.elMap = {};
    this.focusedElId = null;
    this.maxElId = 0;
    this.caps = {};

    this.desiredCapConstraints = {
      app: {
        presence: true,
        isString: true
      }
    };
  }

  async createSession (caps, reqCaps, otherSessionData = []) {
    // TODO add validation on caps.app that we will get for free from
    // BaseDriver

    // check to see if any other sessions have set uniqueApp. If so, emulate
    // not being able to start a session because of system resources
    for (let d of otherSessionData) {
      if (d.isUnique) {
        throw new errors.SessionNotCreatedError("Cannot start session; another " +
            "unique session is in progress that requires all resources");
      }
    }

    let [sessionId] = await super.createSession(caps, reqCaps);
    this.appModel = new FakeApp();
    await this.appModel.loadApp(caps.app);
    this.caps = caps;
    return [sessionId, caps];
  }

  get driverData () {
    return {
      isUnique: !!this.caps.uniqueApp
    };
  }
}

for (let [cmd, fn] of _.pairs(commands)) {
  FakeDriver.prototype[cmd] = fn;
}

export { FakeDriver };
