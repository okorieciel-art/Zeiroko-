import mongoose from 'mongoose';
const PaymentSchema = new mongoose.Schema({
  chargeId: String,
    amount: Number,
      currency: String,
        status: String, // NEW, PENDING, PAID, HELD, RELEASE_REQUESTED, RELEASED, REFUNDED
          buyerUid: String,
            hostUid: String,
              campaign: Object,
                createdAt: { type: Date, default: Date.now },
                  metadata: Object
                  });
                  export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);