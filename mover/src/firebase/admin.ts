import admin from "firebase-admin";

declare global {
  // allow global var reuse in dev
  // eslint-disable-next-line no-var
  var _firebaseAdminApp: admin.app.App | undefined;
}

if (!global._firebaseAdminApp) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);
  global._firebaseAdminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

const app = global._firebaseAdminApp!;
export const adminAuth = app.auth();
export const adminDb = app.firestore();
