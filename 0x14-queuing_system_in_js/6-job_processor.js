import kue from 'kue';

const queue = kue.createQueue();
const notificationsQueue = 'push_notification_code';

function sendNotification(phoneNumber, message) {
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );
}

queue.process(notificationsQueue, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done();
});
