import log from './logger';
import { server as baseServer, routeConfiguringFunction } from 'appium-base-driver';
import { FakeDriver } from './driver';

async function startServer (port, host) {
  let d = new FakeDriver();
  let router = routeConfiguringFunction(d);
  let server = baseServer(router, port, host);
  log.info(`FakeDriver server listening on http://${host}:${port}`);
  return server;
}

export { startServer };
