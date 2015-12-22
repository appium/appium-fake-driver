// transpile:mocha

import _ from 'lodash';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'request-promise'; // not used by this lib but a devDep of basedriver
import { FakeDriver } from '../..';
import { DEFAULT_CAPS } from './helpers';

chai.use(chaiAsPromised);

chai.should();

describe('FakeDriver', () => {
  it('should not start a session when a unique session is already running', async () => {
    let d1 = new FakeDriver();
    let caps1 = _.clone(DEFAULT_CAPS);
    caps1.uniqueApp = true;
    let [uniqueSession] = await d1.createSession(caps1, {});
    uniqueSession.should.be.a('string');
    let d2 = new FakeDriver();
    let otherSessionData = [d1.driverData];
    await d2.createSession(DEFAULT_CAPS, {}, otherSessionData)
            .should.eventually.be.rejectedWith(/unique/);
    await d1.deleteSession(uniqueSession);
  });
  it('should start a new session when another non-unique session is running', async () => {
    let d1 = new FakeDriver();
    let [session1Id] = await d1.createSession(DEFAULT_CAPS, {});
    session1Id.should.be.a('string');
    let d2 = new FakeDriver();
    let otherSessionData = [d1.driverData];
    let [session2Id] = await d2.createSession(DEFAULT_CAPS, {}, otherSessionData);
    session2Id.should.be.a('string');
    session1Id.should.not.equal(session2Id);
    await d1.deleteSession(session1Id);
    await d2.deleteSession(session2Id);
  });
});
