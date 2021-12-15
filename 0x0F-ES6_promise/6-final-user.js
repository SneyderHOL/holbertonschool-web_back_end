import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

function forSuccess(result) {
  return { status: 'fulfilled', value: result };
}

function forFailure(error) {
  return { status: 'rejected', value: error.toString() };
}
export default async function handleProfileSignup(firstName, lastName, fileName) {
  const signUpResponse = await signUpUser(firstName, lastName).then(forSuccess).catch(forFailure);
  const uploadPhotoResponse = await uploadPhoto(fileName).then(forSuccess).catch(forFailure);
  return Promise.resolve([signUpResponse, uploadPhotoResponse]);
}
