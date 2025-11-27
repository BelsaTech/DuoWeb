/**
 * Script to send launch notification to all subscribers
 *
 * Usage:
 *   node scripts/send-launch-notification.js
 *
 * This script fetches all subscribers from MailerLite and sends them
 * a notification via Resend that the app is ready.
 */

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

const MAILERLITE_API_KEY = process.env.VITE_MAILERLITE_API_KEY;
const MAILERLITE_GROUP_ID = process.env.VITE_MAILERLITE_GROUP_ID;
const NOTIFICATION_SECRET = process.env.NOTIFICATION_SECRET;
const VERCEL_URL = process.env.VERCEL_URL || 'https://duomindbelsa.vercel.app';

async function getSubscribers() {
  console.log('📥 Fetching subscribers from MailerLite...');

  const response = await fetch(
    `https://connect.mailerlite.com/api/groups/${MAILERLITE_GROUP_ID}/subscribers`,
    {
      headers: {
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch subscribers: ${response.statusText}`);
  }

  const data = await response.json();
  const emails = data.data.map(subscriber => subscriber.email);

  console.log(`✅ Found ${emails.length} subscribers`);
  return emails;
}

async function sendNotifications(emails) {
  console.log('📧 Sending notifications via Resend...');

  const response = await fetch(`${VERCEL_URL}/api/send-notification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      secret: NOTIFICATION_SECRET,
      emails,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send notifications: ${error}`);
  }

  const result = await response.json();
  console.log('✅ Notifications sent successfully!');
  console.log(`   - Total: ${result.stats.total}`);
  console.log(`   - Successful: ${result.stats.successful}`);
  console.log(`   - Failed: ${result.stats.failed}`);

  return result;
}

async function main() {
  try {
    console.log('🚀 Starting launch notification process...\n');

    // Validate environment variables
    if (!MAILERLITE_API_KEY) {
      throw new Error('VITE_MAILERLITE_API_KEY is not set');
    }
    if (!MAILERLITE_GROUP_ID) {
      throw new Error('VITE_MAILERLITE_GROUP_ID is not set');
    }
    if (!NOTIFICATION_SECRET) {
      throw new Error('NOTIFICATION_SECRET is not set');
    }

    // Get subscribers
    const emails = await getSubscribers();

    if (emails.length === 0) {
      console.log('⚠️  No subscribers found. Exiting...');
      return;
    }

    // Confirm before sending
    console.log(`\n⚠️  You are about to send notifications to ${emails.length} subscribers.`);
    console.log('   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');

    await new Promise(resolve => setTimeout(resolve, 5000));

    // Send notifications
    await sendNotifications(emails);

    console.log('\n🎉 All done! Check your email inbox for the notification.');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
