import _ from 'lodash';
import { errors } from 'mobile-json-wire-protocol';
import { FakeElement } from '../fake-element';

let commands = {}, helpers = {}, extensions = {};

helpers.getExistingElementForNode = function (node) {
  for (let [id, el] of _.pairs(this.elMap)) {
    if (el.node === node) {
      return id;
    }
  }
  return null;
};

helpers.wrapNewEl = function (obj) {
  // first check and see if we already have a ref to this element
  let existingElId = this.getExistingElementForNode(obj);
  if (existingElId) {
    return {ELEMENT: existingElId};
  }

  // otherwise add the element to the map
  this.maxElId++;
  this.elMap[this.maxElId.toString()] = new FakeElement(obj, this.appModel);
  return {ELEMENT: this.maxElId.toString()};
};

helpers.findElOrEls = async function (strategy, selector, mult) {
  let qMap = {
    'xpath': 'xpathQuery',
    'id': 'idQuery',
    'accessibility id': 'idQuery',
    'class name': 'classQuery',
    'tag name': 'classQuery'
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
        allEls.push(this.wrapNewEl(el));
      }
      return allEls;
    } else {
      return this.wrapNewEl(els[0]);
    }
  } else if (mult) {
    return [];
  } else {
    throw new errors.NoSuchElementError();
  }
};

commands.findElement = async function (strategy, selector) {
  return this.findElOrEls(strategy, selector, false);
};

commands.findElements = async function (strategy, selector) {
  return this.findElOrEls(strategy, selector, true);
};

Object.assign(extensions, commands, helpers);
export { commands, helpers};
export default extensions;

/*
 *
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
