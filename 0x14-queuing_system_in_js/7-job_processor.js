import kue from 'kue';

const blacklistedPhoneNumbers = ['4153518780', '4153518781'];
const queue = kue.createQueue();
const notificationsQueue = 'push_notification_code_2';

function sendNotification(phoneNumber, message, job, done) {
  const total = 100;

  job.progress(0, total);

  if (blacklistedPhoneNumbers.includes(phoneNumber)) {
    return done(Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  job.progress(50, total);
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );

  done();
}

queue.process(notificationsQueue, 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
