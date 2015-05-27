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

helpers.assertNoAlert = function () {
  if (this.appModel.hasAlert()) {
    throw new errors.UnexpectedAlertOpenError();
  }
};

commands.getName = async function (elementId) {
  let el = this.getElement(elementId);
  return el.tagName;
};

commands.setValue = async function (keys, elementId) {
  let value = keys;
  if (keys instanceof Array) {
    value = keys.join("");
  }
  let el = this.getElement(elementId);
  if (el.type !== "MockInputField") {
    throw new errors.InvalidElementStateError();
  }
  el.setAttr('value', value);
};

commands.getText = async function (elementId) {
  let el = this.getElement(elementId);
  return el.getAttr('value');
};

commands.clear = async function (elementId) {
  await this.setValue('', elementId);
};

commands.click = async function (elementId) {
  this.assertNoAlert();
  let el = this.getElement(elementId);
  if (!el.isVisible()) {
    throw new errors.InvalidElementStateError();
  }
  el.click();
  this.focusedElId = elementId;
};

commands.getAttribute = async function (attr, elementId) {
  let el = this.getElement(elementId);
  return el.getAttr(attr);
};

Object.assign(extensions, commands, helpers);
export { commands, helpers };
export default extensions;
