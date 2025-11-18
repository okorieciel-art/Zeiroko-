import mongoose from 'mongoose';
const Schema = new mongoose.Schema({
  url: String,
    uploaderUid: String,
      status: { type: String, enum: ['PENDING','APPROVED','REJECTED'], default: 'PENDING' },
        reason: String,
          createdAt: { type: Date, default: Date.now }
          });
          export default mongoose.models.Screenshot || mongoose.model('Screenshot', Schema);