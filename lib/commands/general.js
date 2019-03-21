import _ from 'lodash';
import { errors } from 'appium-base-driver';

let commands = {}, helpers = {}, extensions = {};

commands.title = async function title () {
  this.assertWebviewContext();
  return this.appModel.title;
};

commands.keys = async function keys (value) {
  if (!this.focusedElId) {
    throw new errors.InvalidElementStateError();
  }
  await this.setValue(value, this.focusedElId);
};

commands.setGeoLocation = async function setGeoLocation (location) {
  // TODO test this adequately once WD bug is fixed
  this.appModel.lat = location.latitude;
  this.appModel.long = location.longitude;
};

commands.getGeoLocation = async function getGeoLocation () {
  return this.appModel.currentGeoLocation;
};

commands.getPageSource = async function getPageSource () {
  return this.appModel.rawXml;
};

commands.getOrientation = async function getOrientation () {
  return this.appModel.orientation;
};

commands.setOrientation = async function setOrientation (o) {
  if (!_.includes(['LANDSCAPE', 'PORTRAIT'], o)) {
    throw new errors.UnknownError('Orientation must be LANDSCAPE or PORTRAIT');
  }
  this.appModel.orientation = o;
};

commands.getScreenshot = async function getScreenshot () {
  return this.appModel.getScreenshot();
};

Object.assign(extensions, commands, helpers);
export { commands, helpers };
export default extensions;
