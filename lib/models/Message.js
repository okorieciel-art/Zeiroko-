import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({
  threadId: { type: String, index: true }, // e.g., conversation id host:advertiser or user:user
    fromUid: String,
      toUid: String,
        text: String,
          attachments: [String], // Cloudinary URLs
            read: { type: Boolean, default: false },
              createdAt: { type: Date, default: Date.now }
              });
              export default mongoose.models.Message || mongoose.model('Message', MessageSchema);