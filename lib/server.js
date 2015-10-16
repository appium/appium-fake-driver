import log from './logger';
import server from 'appium-express';
import { routeConfiguringFunction } from 'mobile-json-wire-protocol';
import { FakeDriver } from './driver';

async function startServer (port, host) {
  let d = new FakeDriver();
  let router = routeConfiguringFunction(d);
  log.info(`FakeDriver server listening on http://${host}:${port}`);
  return server(router, port, host);
}

export { startServer };
