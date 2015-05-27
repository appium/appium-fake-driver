import { errors } from 'mobile-json-wire-protocol';

let commands = {}, helpers = {}, extensions = {};

commands.title = async function () {
  this.assertWebviewContext();
  return this.appModel.title;
};

commands.keys = async function (value) {
  if (!this.focusedElId) {
    throw new errors.InvalidElementStateError();
  }
  await this.setValue(value, this.focusedElId);
};

commands.setGeoLocation = async function (location) {
  // TODO test this adequately once WD bug is fixed
  this.appModel.lat = location.latitude;
  this.appModel.long = location.longitude;
};

commands.getGeoLocation = async function () {
  return this.appModel.currentGeoLocation;
};

commands.getPageSource = async function () {
  return this.appModel.rawXml;
};

Object.assign(extensions, commands, helpers);
export { commands, helpers };
export default extensions;
