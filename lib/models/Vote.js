import mongoose from 'mongoose';
const VoteSchema = new mongoose.Schema({
  voterUid: String,
    targetUid: String,
      score: { type: Number, min:1, max:5 },
        reason: String,
          note: String,
            screenshotUrl: String,
              createdAt: { type: Date, default: Date.now }
              });
              export default mongoose.models.Vote || mongoose.model('Vote', VoteSchema);