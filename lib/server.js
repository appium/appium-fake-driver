import log from './logger';
import { default as baseServer } from 'appium-express';
import { routeConfiguringFunction } from 'mobile-json-wire-protocol';
import { FakeDriver } from './driver';

async function startServer (port, host) {
  let d = new FakeDriver();
  let router = routeConfiguringFunction(d);
  let server = baseServer(router, port, host);
  log.info(`FakeDriver server listening on http://${host}:${port}`);
  return server;
}

export { startServer };
