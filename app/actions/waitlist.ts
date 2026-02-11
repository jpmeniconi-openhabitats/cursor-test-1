'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function addToWaitlist(email: string) {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Please enter a valid email address'
      }
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Insert email into waitlist table
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email: email.toLowerCase().trim() }])
      .select()

    if (error) {
      // Handle duplicate email error
      if (error.code === '23505') {
        return {
          success: false,
          error: "You're already on the waitlist!"
        }
      }
      
      console.error('Supabase error:', error)
      return {
        success: false,
        error: 'Something went wrong. Please try again.'
      }
    }

    return {
      success: true,
      data
    }
  } catch (error) {
    console.error('Server action error:', error)
    return {
      success: false,
      error: 'Unable to connect. Please try again later.'
    }
  }
}
