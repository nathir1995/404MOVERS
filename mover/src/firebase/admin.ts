import admin from "firebase-admin";

declare global {
  // allow global var reuse in dev
  // eslint-disable-next-line no-var
  var _firebaseAdminApp: admin.app.App | undefined;
}

if (!global._firebaseAdminApp) {
  try {
    // ✅ FIXED: Better error handling for missing environment variables
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT;
    const projectId = process.env.FIREBASE_PROJECT_ID;

    if (!serviceAccountKey) {
      console.warn("FIREBASE_SERVICE_ACCOUNT environment variable not set - Firebase Admin disabled");
    } else if (!projectId) {
      console.warn("FIREBASE_PROJECT_ID environment variable not set - Firebase Admin disabled");
    } else {
      try {
        const serviceAccount = JSON.parse(serviceAccountKey);
        global._firebaseAdminApp = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: projectId,
        });
        console.info("Firebase Admin initialized successfully");
      } catch (parseError) {
        console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT JSON:", parseError);
      }
    }
  } catch (error) {
    console.error("Firebase Admin initialization failed:", error);
  }
}

// ✅ FIXED: Export with null checks
const app = global._firebaseAdminApp;

export const adminAuth = app ? app.auth() : null;
export const adminDb = app ? app.firestore() : null;

// ✅ FIXED: Helper function to check if admin is available
export const isAdminAvailable = (): boolean => {
  return !!global._firebaseAdminApp;
};
