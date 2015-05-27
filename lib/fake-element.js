import _ from 'lodash';

class FakeElement {
  constructor (xmlNode, app) {
    this.app = app;
    this.node = xmlNode;
    this.nodeAttrs = {};
    this.type = this.node.tagName;
    this.attrs = {};
    for (let {name, value} of _.values(this.node.attributes)) {
      this.nodeAttrs[name] = value;
    }
  }

  get tagName () {
    return this.node.tagName;
  }

  setAttr (k, v) {
    this.attrs[k] = v;
  }

  getAttr (k) {
    return this.attrs[k] || "";
  }

  isVisible () {
    //console.log("Checking visible status");
    //console.log(this.nodeAttrs);
    return this.nodeAttrs.visible !== "false";
  }

  click () {
    let curClicks = this.getAttr('clicks') || 0;
    this.setAttr('clicks', curClicks + 1);
    let alertId = this.nodeAttrs.showAlert;
    if (alertId) {
      this.app.showAlert(alertId);
    }
  }

}

export { FakeElement };

/*
"use strict";

let _ = require('underscore');

FakeElement.prototype.getLocation = function () {
  return {
    x: parseFloat(this.nodeAttrs.left || 0),
    y: parseFloat(this.nodeAttrs.top || 0)
  };
};

FakeElement.prototype.getSize = function () {
  return {
    width: parseFloat(this.nodeAttrs.width || 0),
    height: parseFloat(this.nodeAttrs.height || 0)
  };
};

FakeElement.prototype.isEnabled = function () {
  return this.nodeAttrs.enabled !== "false";
};

FakeElement.prototype.isSelected = function () {
  return this.nodeAttrs.selected === "true";
};

FakeElement.prototype.hasPrompt = function () {
  return this.nodeAttrs.hasPrompt === "true";
};

FakeElement.prototype.equals = function (other) {
  return this.node === other.node;
};

module.exports = FakeElement;
*/
