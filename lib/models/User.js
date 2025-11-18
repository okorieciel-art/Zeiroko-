import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  firebaseUid: { type: String, unique: true },
    email: String,
      name: String,
        role: { type: String, enum: ['host','advertiser','admin'], default: 'host' },
          walletAddress: String,
            profile: {
                bio: String,
                    imageUrl: String,
                        pricePerBanner: Number,
                            categories: [String],
                                metrics: {}
                                  },
                                    createdAt: { type: Date, default: Date.now }
                                    });
                                    export default mongoose.models.User || mongoose.model('User', UserSchema);