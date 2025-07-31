import { supabase } from '../lib/supabase';

export const sendEmailNotification = async (userId, title, message) => {
  // Call your edge function
  const response = await fetch(
    'https://cgkunxvvctaeonmfvwji.supabase.co/functions/v1/send-notification-email',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        user_id: userId,
        title,
        message
      })
    }
  );
  return response.ok;
};

// For admin notifications
export const sendAdminNotification = async (title, message) => {
  // Get all admin users (assuming you have an 'is_admin' column in profiles)
  const { data: admins } = await supabase
    .from('profiles')
    .select('id')
    .eq('is_admin', true);

  if (admins && admins.length > 0) {
    const notifications = admins.map(admin => ({
      user_id: admin.id,
      title,
      message,
      is_read: false
    }));

    const { error } = await supabase
      .from('notifications')
      .insert(notifications);

    return !error;
  }
  return false;
};