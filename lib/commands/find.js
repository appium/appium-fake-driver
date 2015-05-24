import _ from 'lodash';
import { errors } from 'mobile-json-wire-protocol';
import { FakeElement } from '../fake-element';

let commands = {};

commands._wrapNewEl = function (obj) {
  this.maxElId++;
  this.elMap[this.maxElId.toString()] = new FakeElement(obj, this.appModel);
  return {ELEMENT: this.maxElId.toString()};
};

commands._findElOrEls = async function (strategy, selector, mult) {
  let qMap = {
    'xpath': 'xpathQuery',
    'id': 'idQuery',
    'accessibility id': 'idQuery',
    'class name': 'classQuery'
  };
  // TODO this error checking should probably be part of MJSONWP?
  if (!_.contains(_.keys(qMap), strategy)) {
    throw new errors.UnknownCommandError();
  }
  if (selector === "badsel") {
    throw new errors.InvalidSelectorError();
  }
  let els = this.appModel[qMap[strategy]](selector);
  if (els.length) {
    if (mult) {
      let allEls = [];
      for (let el of els) {
        allEls.push(this._wrapNewEl(el));
      }
      return allEls;
    } else {
      return this._wrapNewEl(els[0]);
    }
  } else if (mult) {
    return [];
  } else {
    throw new errors.NoSuchElementError();
  }
};

commands.findElement = async function (strategy, selector) {
  return this._findElOrEls(strategy, selector, false);
};


export default commands;

/*
 *
FakeDevice.prototype.findElements = function (strategy, selector, cb) {
  this._findElOrEls(strategy, selector, true, cb);
};

FakeDevice.prototype._elementGuard = function (elIds, onErr, cb) {
  if (!(elIds instanceof Array)) {
    elIds = [elIds];
  }
  for (let i = 0; i < elIds.length; i++) {
    if (!_.has(this.elMap, elIds[i])) {
      return jwpError(status.codes.StaleElementReference, onErr);
    }
  }
  cb.apply(this, _.map(elIds, function (i) { return this.elMap[i]; }.bind(this)));
};
*/
