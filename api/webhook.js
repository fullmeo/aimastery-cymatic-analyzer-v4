const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Webhook should only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify webhook secret is configured
  if (!process.env.WEBHOOK_SECRET) {
    console.error('❌ WEBHOOK_SECRET not configured');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  const sig = req.headers['stripe-signature'];
  if (!sig) {
    console.error('❌ Missing stripe-signature header');
    return res.status(400).json({ error: 'Missing signature' });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const userId = session.client_reference_id;
      const subscriptionId = session.subscription;

      console.log(`✅ Payment successful for user: ${userId}`);
      console.log(`   Subscription ID: ${subscriptionId}`);

      // TODO: Store subscription in database
      // await db.users.update(userId, {
      //   subscriptionActive: true,
      //   subscriptionId: subscriptionId,
      //   tier: session.metadata.tier || 'social_pack',
      //   activatedAt: new Date()
      // });

      break;

    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object;
      console.log(`🔄 Subscription updated: ${updatedSubscription.id}`);
      // TODO: Update subscription status in database
      break;

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      console.log(`❌ Subscription cancelled: ${deletedSubscription.id}`);

      // TODO: Deactivate subscription in database
      // await db.users.updateBySubscriptionId(deletedSubscription.id, {
      //   subscriptionActive: false,
      //   tier: 'free',
      //   cancelledAt: new Date()
      // });

      break;

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      console.log(`⚠️  Payment failed for customer: ${failedInvoice.customer}`);
      // TODO: Notify user of payment failure
      break;

    default:
      console.log(`ℹ️  Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
};
