import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job';

const queue = kue.createQueue();
const jobs = [
  {
    phoneNumber: '1234567890',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '1234567891',
    message: 'This is the code 4321 to verify your account',
  },
];
const notificationsQueue = 'push_notification_code_3';

describe('createPushNotificationsJobs', () => {
  before(function () {
    queue.testMode.enter();
  });

  after(function () {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('display a error message if jobs is not an array', () => {
    expect(() => {
      createPushNotificationsJobs(1, queue);
    }).to.throw('Jobs is not an array');
    expect(() => {
      createPushNotificationsJobs('a', queue);
    }).to.throw('Jobs is not an array');
    expect(() => {
      createPushNotificationsJobs(true, queue);
    }).to.throw('Jobs is not an array');
    expect(() => {
      createPushNotificationsJobs({}, queue);
    }).to.throw('Jobs is not an array');
  });

  it(' create two new jobs to the queue', () => {
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].type).to.equal(notificationsQueue);
    expect(queue.testMode.jobs[0].data).to.equal(jobs[0]);
    expect(queue.testMode.jobs[1].type).to.equal(notificationsQueue);
    expect(queue.testMode.jobs[1].data).to.equal(jobs[1]);
  });
});
