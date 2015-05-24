import _ from 'lodash';
import { errors } from 'mobile-json-wire-protocol';

let commands = {}, helpers = {}, extensions = {};

helpers.getElements = function (elIds) {
  for (let elId of elIds) {
    if (!_.has(this.elMap, elId)) {
      throw new errors.StaleElementReferenceError();
    }
  }
  return elIds.map((e) => this.elMap[e]);
};

helpers.getElement = function (elId) {
  return this.getElements([elId])[0];
};

commands.getName = async function (elementId) {
  let el = this.getElement(elementId);
  return el.tagName;
};

Object.assign(extensions, commands, helpers);
export { commands, helpers };
export default extensions;
