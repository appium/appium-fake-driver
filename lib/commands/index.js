import contextCommands from './contexts';
import findCommands from './find';
import elementCommands from './element';

let commands = {};

Object.assign(
    commands,
    contextCommands,
    findCommands,
    elementCommands
);

export default commands;

/*
FakeDevice.prototype.implicitWait = function (ms, cb) {
  try {
    this.implicitWaitMs = parseInt(ms, 10);
    logger.debug("Set implicit wait to " + ms + "ms");
  } catch (e) {
    return jwpError(e, cb);
  }
  jwpSuccess(cb);
};

FakeDevice.prototype.setValue = function (elId, value, cb) {
  this._elementGuard(elId, cb, function (el) {
    if (el.type !== "MockInputField") {
      return jwpError(status.codes.InvalidElementState, cb);
    }
    el.setAttr('value', value);
    jwpSuccess(cb);
  });
};

FakeDevice.prototype.clear = function (elId, cb) {
  this.setValue(elId, '', cb);
};

FakeDevice.prototype.getText = function (elId, cb) {
  this._elementGuard(elId, cb, function (el) {
    jwpSuccess(el.getAttr('value'), cb);
  });
};

FakeDevice.prototype.click = function (elId, cb) {
  this._noAlertGuard(cb, function () {
    this._elementGuard(elId, cb, function (el) {
      if (!el.isVisible()) {
        return jwpError(status.codes.InvalidElementState, cb);
      }
      el.click();
      this.focusedElId = elId;
      jwpSuccess(cb);
    }.bind(this));
  }.bind(this));
};

FakeDevice.prototype.getAttribute = function (elId, attr, cb) {
  this._elementGuard(elId, cb, function (el) {
    jwpSuccess(el.getAttr(attr), cb);
  });
};

FakeDevice.prototype.getName = function (elId, cb) {
  this._elementGuard(elId, cb, function (el) {
    jwpSuccess(el.tagName(), cb);
  });
};

FakeDevice.prototype.elementDisplayed = function (elId, cb) {
  this._elementGuard(elId, cb, function (el) {
    jwpSuccess(el.isVisible(), cb);
  });
};

FakeDevice.prototype.elementEnabled = function (elId, cb) {
  this._elementGuard(elId, cb, function (el) {
    jwpSuccess(el.isEnabled(), cb);
  });
};

FakeDevice.prototype.elementSelected = function (elId, cb) {
  this._elementGuard(elId, cb, function (el) {
    jwpSuccess(el.isSelected(), cb);
  });
};

FakeDevice.prototype.getLocation = function (elId, cb) {
  this._elementGuard(elId, cb, function (el) {
    jwpSuccess(el.getLocation(), cb);
  });
};

FakeDevice.prototype.getLocationInView = FakeDevice.prototype.getLocation;

FakeDevice.prototype.getSize = function (elId, cb) {
  this._elementGuard(elId, cb, function (el) {
    jwpSuccess(el.getSize(), cb);
  });
};

FakeDevice.prototype.equalsWebElement = function (el1Id, el2Id, cb) {
  this._elementGuard([el1Id, el2Id], cb, function (el1, el2) {
    jwpSuccess(el1.equals(el2), cb);
  });
};

FakeDevice.prototype.keys = function (value, cb) {
  this.setValue(this.focusedElId, value, cb);
};

FakeDevice.prototype.title = function (cb) {
  this._webviewGuard(cb, function () {
    jwpSuccess(this.appModel.title(), cb);
  }.bind(this));
};

FakeDevice.prototype.setLocation = function (latitude, longitude, altitude, horizontalAccuracy, verticalAccuracy, course, speed, cb) {
  this.appModel.lat = latitude;
  this.appModel.long = longitude;
  jwpSuccess(cb);
};

FakeDevice.prototype.getPageSource = function (cb) {
  jwpSuccess(this.appModel.rawXml, cb);
};

FakeDevice.prototype._alertGuard = function (onErr, cb) {
  if (!this.appModel.hasAlert()) {
    return jwpError(status.codes.NoAlertOpenError, onErr);
  }
  cb();
};

FakeDevice.prototype._noAlertGuard = function (onErr, cb) {
  if (this.appModel.hasAlert()) {
    return jwpError(status.codes.UnexpectedAlertOpen, onErr);
  }
  cb();
};

FakeDevice.prototype.getAlertText = function (cb) {
  this._alertGuard(cb, function () {
    jwpSuccess(this.appModel.alertText(), cb);
  }.bind(this));
};

FakeDevice.prototype.setAlertText = function (text, cb) {
  this._alertGuard(cb, function () {
    try {
      this.appModel.setAlertText(text);
    } catch (e) {
      return jwpError(status.codes.InvalidElementState, cb);
    }
    jwpSuccess(cb);
  }.bind(this));
};

FakeDevice.prototype.postAcceptAlert = function (cb) {
  this._alertGuard(cb, function () {
    this.appModel.handleAlert();
    jwpSuccess(cb);
  }.bind(this));
};

FakeDevice.prototype.postDismissAlert = FakeDevice.prototype.postAcceptAlert;


module.exports = FakeDevice;

// TODO:
  //rest.get('/wd/hub/session/:sessionId?/element/:elementId?/pageIndex', controller.getPageIndex);
  //rest.get('/wd/hub/session/:sessionId?/element/:elementId?/css/:propertyName', controller.getCssProperty);
  //rest.post('/wd/hub/session/:sessionId?/timeouts/async_script', controller.asyncScriptTimeout);
  //rest.get('/wd/hub/session/:sessionId?/orientation', controller.getOrientation);
  //rest.post('/wd/hub/session/:sessionId?/orientation', controller.setOrientation);
  //rest.get('/wd/hub/session/:sessionId?/screenshot', controller.getScreenshot);
  //rest.post('/wd/hub/session/:sessionId?/element/:elementId?/element', controller.findElementFromElement);
  //rest.post('/wd/hub/session/:sessionId?/element/:elementId?/elements', controller.findElementsFromElement);
  //rest.post('/wd/hub/session/:sessionId?/touch/click', controller.doClick);
  //rest.post('/wd/hub/session/:sessionId?/touch/longclick', controller.touchLongClick);
  //rest.post('/wd/hub/session/:sessionId?/touch/down', controller.touchDown);
  //rest.post('/wd/hub/session/:sessionId?/touch/up', controller.touchUp);
  //rest.post('/wd/hub/session/:sessionId?/touch/move', controller.touchMove);
  //rest.post('/wd/hub/session/:sessionId?/touch/flick', controller.pickAFlickMethod);
  //rest.post('/wd/hub/session/:sessionId?/url', controller.postUrl);
  //rest.get('/wd/hub/session/:sessionId?/url', controller.getUrl);
  //rest.post('/wd/hub/session/:sessionId?/element/active', controller.active);
  //rest.get('/wd/hub/session/:sessionId?/window_handle', controller.getWindowHandle);
  //rest.get('/wd/hub/session/:sessionId?/window_handles', controller.getWindowHandles);
  //rest.post('/wd/hub/session/:sessionId?/window', controller.setWindow);
  //rest.delete('/wd/hub/session/:sessionId?/window', controller.closeWindow);
  //rest.get('/wd/hub/session/:sessionId?/window/:windowhandle?/size', controller.getWindowSize);
  //rest.post('/wd/hub/session/:sessionId?/execute', controller.execute);
  //rest.post('/wd/hub/session/:sessionId?/execute_async', controller.executeAsync);
  //rest.post('/wd/hub/session/:sessionId?/element/:elementId?/submit', controller.submit);
  //rest.post('/wd/hub/session/:sessionId?/moveto', controller.moveTo);
  //rest.post('/wd/hub/session/:sessionId?/click', controller.clickCurrent);
  //rest.post('/wd/hub/session/:sessionId?/back', controller.back);
  //rest.post('/wd/hub/session/:sessionId?/forward', controller.forward);
  //rest.post('/wd/hub/session/:sessionId?/refresh', controller.refresh);
  //rest.get('/wd/hub/session/:sessionId?/cookie', controller.getCookies);
  //rest.post('/wd/hub/session/:sessionId?/cookie', controller.setCookie);
  //rest.delete('/wd/hub/session/:sessionId?/cookie', controller.deleteCookies);
  //rest.delete('/wd/hub/session/:sessionId?/cookie/:name', controller.deleteCookie);
  //rest.post('/wd/hub/session/:sessionId?/log', controller.getLog);
  //rest.get('/wd/hub/session/:sessionId?/log/types', controller.getLogTypes);
  //rest.post('/wd/hub/session/:sessionId?/timeouts', controller.timeouts);
  //rest.get('/wd/hub/session/:sessionId?/network_connection', controller.getNetworkConnection);
  //rest.post('/wd/hub/session/:sessionId?/network_connection', controller.setNetworkConnection);

  //// touch gesture endpoints
  //rest.post('/wd/hub/session/:sessionId?/touch/perform', controller.performTouch);
  //rest.post('/wd/hub/session/:sessionId?/touch/multi/perform', controller.performMultiAction);

  //// allow appium to receive async response
  //rest.post('/wd/hub/session/:sessionId?/receive_async_response', controller.receiveAsyncResponse);
  //// these are for testing purposes only
  //rest.post('/wd/hub/produce_error', controller.produceError);
  //rest.post('/wd/hub/crash', controller.crash);
  //rest.all('/test/guinea-pig', controller.guineaPig);

  //// IME specific
  //rest.get('/wd/hub/session/:sessionId?/ime/available_engines', controller.availableIMEEngines);
  //rest.get('/wd/hub/session/:sessionId?/ime/active_engine', controller.getActiveIMEEngine);
  //rest.get('/wd/hub/session/:sessionId?/ime/activated', controller.isIMEActivated);
  //rest.post('/wd/hub/session/:sessionId?/ime/deactivate', controller.deactivateIMEEngine);
  //rest.post('/wd/hub/session/:sessionId?/ime/activate', controller.activateIMEEngine);

  //// appium-specific extensions to JSONWP
  //rest.post('/wd/hub/session/:sessionId?/appium/device/shake', controller.mobileShake);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/lock', controller.lock);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/unlock', controller.unlock);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/is_locked', controller.isLocked);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/press_keycode', controller.pressKeyCode);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/long_press_keycode', controller.longPressKeyCode);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/keyevent', controller.keyevent);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/rotate', controller.mobileRotation);
  //rest.get('/wd/hub/session/:sessionId?/appium/device/current_activity', controller.getCurrentActivity);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/install_app', controller.installApp);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/remove_app', controller.removeApp);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/app_installed', controller.isAppInstalled);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/hide_keyboard', controller.hideKeyboard);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/push_file', controller.pushFile);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/pull_file', controller.pullFile);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/pull_folder', controller.pullFolder);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/toggle_airplane_mode', controller.toggleFlightMode);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/toggle_data', controller.toggleData);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/toggle_wifi', controller.toggleWiFi);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/toggle_location_services', controller.toggleLocationServices);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/open_notifications', controller.openNotifications);
  //rest.post('/wd/hub/session/:sessionId?/appium/device/start_activity', controller.startActivity);

  //rest.post('/wd/hub/session/:sessionId?/appium/app/launch', controller.launchApp);
  //rest.post('/wd/hub/session/:sessionId?/appium/app/close', controller.closeApp);
  //rest.post('/wd/hub/session/:sessionId?/appium/app/reset', controller.reset);
  //rest.post('/wd/hub/session/:sessionId?/appium/app/background', controller.background);
  //rest.post('/wd/hub/session/:sessionId?/appium/app/end_test_coverage', controller.endCoverage);
  //rest.post('/wd/hub/session/:sessionId?/appium/app/strings', controller.getStrings);

  //rest.post('/wd/hub/session/:sessionId?/appium/element/:elementId?/value', controller.setValueImmediate);
  //rest.post('/wd/hub/session/:sessionId?/appium/element/:elementId?/replace_value', controller.replaceValue);

  //rest.post('/wd/hub/session/:sessionId?/appium/settings', controller.updateSettings);
  //rest.get('/wd/hub/session/:sessionId?/appium/settings', controller.getSettings);
*/
