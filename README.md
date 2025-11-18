# Zeiroko (Firebase auth)

1. Clone files into a folder.
2. Copy .env.example -> .env and fill values (MongoDB, Firebase service account fields, NEXT_PUBLIC_FIREBASE_* keys, Cloudinary, Coinbase).
3. Install:
   npm install
   4. Start dev:
      npm run dev
      5. Sign in via Firebase (client) on landing page.
      6. After sign in, store ID token in localStorage as ZE_ID_TOKEN (AuthFirstPage implementation does this for you). The admin pages will use localStorage token for requests.
      7. For Coinbase webhooks: use ngrok to expose /api/coinbase/webhook and set webhook secret in Coinbase Commerce dashboard.
      8. To onboard admin:
         - Sign in with the user who will be admin.
            - Ensure there is at least one user in Mongo with role 'admin' (you can insert manually or set it via DB).
               - Then call POST /api/admin/onboard with { targetUid: '<firebase-uid>' } using admin's idToken.
               9. ZIP the folder (or run scripts/makezip.sh).