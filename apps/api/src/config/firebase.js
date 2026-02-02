const admin = require('firebase-admin');

let firebaseApp;

const initFirebase = () => {
  if (firebaseApp) return firebaseApp;

  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const path = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (json) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(json))
    });
  } else if (path) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const serviceAccount = require(path);
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    firebaseApp = admin.initializeApp();
  }

  return firebaseApp;
};

const getAuth = () => {
  initFirebase();
  return admin.auth();
};

module.exports = { initFirebase, getAuth };
