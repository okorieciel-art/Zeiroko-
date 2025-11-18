import admin from 'firebase-admin';

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      let privateKey = process.env.FIREBASE_PRIVATE_KEY;

        if (!projectId || !clientEmail || !privateKey) {
            throw new Error('Missing Firebase service account env vars');
              }
                privateKey = privateKey.replace(/\\n/g, '\n');

                  admin.initializeApp({
                      credential: admin.credential.cert({
                            projectId,
                                  clientEmail,
                                        privateKey
                                            })
                                              });
                                              }

                                              export const firebaseAdmin = admin;
                                              export const verifyIdToken = (token) => firebaseAdmin.auth().verifyIdToken(token);