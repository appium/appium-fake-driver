import _ from 'lodash';
import { errors } from 'mobile-json-wire-protocol';

let commands = {};

commands._getElements = function (elIds) {
  for (let elId of elIds) {
    if (!_.has(this.elMap, elId)) {
      throw new errors.StaleElementReferenceError();
    }
  }
  return elIds.map((e) => this.elMap[e]);
};

commands._getElement = function (elId) {
  return this._getElements([elId])[0];
};

commands.getName = async function (elementId) {
  let el = this._getElement(elementId);
  return el.tagName;
};

export default commands;
