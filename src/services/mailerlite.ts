/**
 * MailerLite API Integration Service
 *
 * To get your API key:
 * 1. Go to https://dashboard.mailerlite.com/integrations/api
 * 2. Click on "Generate new token"
 * 3. Copy the API key and add it to your .env file
 *
 * To get your Group ID:
 * 1. Go to https://dashboard.mailerlite.com/subscribers/groups
 * 2. Click on the group you want to use
 * 3. The ID is in the URL: https://dashboard.mailerlite.com/subscribers/groups/{GROUP_ID}/subscribers
 */

const MAILERLITE_API_URL = 'https://connect.mailerlite.com/api';
const API_KEY = import.meta.env.VITE_MAILERLITE_API_KEY;
const GROUP_ID = import.meta.env.VITE_MAILERLITE_GROUP_ID;

export interface SubscriberData {
  email: string;
  fields?: {
    name?: string;
    last_name?: string;
    [key: string]: string | undefined;
  };
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Subscribe a user to the MailerLite group
 */
export const subscribeToMailerLite = async (
  subscriberData: SubscriberData
): Promise<SubscribeResponse> => {
  // Validate API key
  if (!API_KEY || API_KEY === 'your_mailerlite_api_key_here') {
    console.error('MailerLite API key not configured');
    return {
      success: false,
      message: 'Service configuration error. Please contact support.',
    };
  }

  try {
    const response = await fetch(`${MAILERLITE_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        email: subscriberData.email,
        fields: subscriberData.fields || {},
        groups: GROUP_ID ? [GROUP_ID] : undefined,
        status: 'active', // or 'unconfirmed' if you want double opt-in
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 422) {
        // Email already exists or validation error
        return {
          success: false,
          message: 'This email is already registered or invalid.',
        };
      }

      console.error('MailerLite API error:', data);
      return {
        success: false,
        message: 'Failed to register. Please try again later.',
      };
    }

    return {
      success: true,
      message: 'Successfully subscribed to notifications!',
      data,
    };
  } catch (error) {
    console.error('Error subscribing to MailerLite:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
};

/**
 * Check if the MailerLite service is properly configured
 */
export const isMailerLiteConfigured = (): boolean => {
  return !!(API_KEY && API_KEY !== 'your_mailerlite_api_key_here');
};
