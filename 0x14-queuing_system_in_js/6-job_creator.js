import kue from 'kue';

const queue = kue.createQueue();
const notificationsQueue = 'push_notification_code';
const jobData = {
  phoneNumber: '4153518780',
  message: 'This is the code to verify your account',
};
const job = queue.create(notificationsQueue, jobData).save((err) => {
  if (!err) {
    console.log(`Notification job created: ${job.id}`);
  }
});

job.on('complete', () => {
  console.log('Notification job completed');
});

job.on('failed', () => {
  console.log('Notification job failed');
});
