// ✅ FIXED: Optional Firebase Admin for environments where it's not needed

let adminAuth: any = null;
let adminDb: any = null;

// Only initialize in server environments with proper credentials
if (typeof window === "undefined") {
  try {
    const admin = require("firebase-admin");
    
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT;
    const projectId = process.env.FIREBASE_PROJECT_ID;

    if (serviceAccountKey && projectId && !admin.apps.length) {
      try {
        const serviceAccount = JSON.parse(serviceAccountKey);
        const app = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: projectId,
        });
        
        adminAuth = app.auth();
        adminDb = app.firestore();
        console.info("Firebase Admin initialized successfully");
      } catch (parseError) {
        console.warn("Failed to parse Firebase Admin credentials:", parseError);
      }
    } else {
      console.info("Firebase Admin not configured - running without admin features");
    }
  } catch (error) {
    console.info("Firebase Admin not available - this is OK for client-side builds");
  }
}

export { adminAuth, adminDb };

// Helper function to check if admin is available
export const isAdminAvailable = (): boolean => {
  return !!adminAuth && !!adminDb;
};
