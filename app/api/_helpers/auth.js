import { verifyIdToken } from '../../../lib/firebaseAdmin';
import User from '../../../lib/models/User';
import { connectDB } from '../../../lib/db';

export async function requireAuth(req) {
  const authHeader = req.headers.get('authorization') || '';
    const idToken = authHeader.replace('Bearer ', '');
      if (!idToken) throw new Error('Missing token');
        const decoded = await verifyIdToken(idToken);
          await connectDB();
            let user = await User.findOne({ firebaseUid: decoded.uid });
              if (!user) {
                  user = await User.create({ firebaseUid: decoded.uid, email: decoded.email, name: decoded.name || decoded.email });
                    }
                      return { decoded, user };
                      }