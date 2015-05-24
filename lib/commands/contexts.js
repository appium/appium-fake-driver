import _ from 'lodash';
import { errors } from 'mobile-json-wire-protocol';

let commands = {};

commands._getRawContexts = function () {
  let contexts = {'NATIVE_APP': null};
  let wvs = this.appModel.getWebviews();
  for (let i = 1; i < wvs.length + 1; i++) {
    contexts['WEBVIEW_' + i] = wvs[i - 1];
  }
  return contexts;
};

commands.getCurrentContext = async function () {
  return this.curContext;
};

commands.getContexts = async function () {
  return _.keys(this._getRawContexts());
};

commands.setContext = async function (context) {
  let contexts = this._getRawContexts();
  if (_.contains(_.keys(contexts), context)) {
    this.curContext = context;
    if (context === 'NATIVE_APP') {
      this.appModel.deactivateWebview();
    } else {
      this.appModel.activateWebview(contexts[context]);
    }
  } else {
    throw new errors.NoSuchContextError();
  }
};

export default commands;
