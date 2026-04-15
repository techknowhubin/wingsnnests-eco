import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener BEFORE getSession
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && (event === 'SIGNED_IN' || event === 'USER_UPDATED')) {
          const storedRole = localStorage.getItem('pending_role') as 'user' | 'host' | null;
          if (storedRole) {
            // Check if role already exists
            const { data: existingRole } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', session.user.id)
              .maybeSingle();

            if (!existingRole) {
              await supabase.from('user_roles').insert({
                user_id: session.user.id,
                role: storedRole,
              });
            }
            localStorage.removeItem('pending_role');
          }
        }
        
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, role: 'user' | 'host' = 'user') => {
    const redirectUrl = `${window.location.origin}/`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          role,
        }
      }
    });

    // Assign role in user_roles table
    if (!error && data.user) {
      await supabase.from('user_roles').insert({
        user_id: data.user.id,
        role,
      });
    }

    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signInWithProvider = async (provider: 'google' | 'apple' | 'facebook' | 'linkedin_oidc', role: 'user' | 'host' = 'user') => {
    // Store role so it can be assigned after redirect
    localStorage.setItem('pending_role', role);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`,
        queryParams: {
          prompt: 'select_account'
        }
      }
    });
    return { error };
  };

  const signInWithPopup = async (provider: 'google' | 'apple' | 'facebook' | 'linkedin_oidc', role: 'user' | 'host' = 'user') => {
    localStorage.setItem('pending_role', role);

    // Get the OAuth URL without browser redirect
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`,
        skipBrowserRedirect: true,
        queryParams: {
          prompt: 'select_account'
        }
      }
    });

    if (error || !data.url) return { error: error || new Error('No OAuth URL returned') };

    // Open a centered popup
    const w = 500, h = 600;
    const left = window.screenX + (window.outerWidth - w) / 2;
    const top = window.screenY + (window.outerHeight - h) / 2;
    const popup = window.open(
      data.url,
      'oauth-popup',
      `width=${w},height=${h},left=${left},top=${top},toolbar=no,menubar=no,resizable=yes,scrollbars=yes`
    );

    // Poll for popup close — the onAuthStateChange listener handles the session
    if (popup) {
      const interval = setInterval(() => {
        if (popup.closed) clearInterval(interval);
      }, 500);
    }

    return { error: null };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const getUserRole = async (): Promise<'user' | 'host' | 'admin' | 'moderator' | null> => {
    if (!user) return null;
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();
    return data?.role ?? null;
  };

  const signInWithOtp = async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
      options: {
        channel: 'whatsapp', // Suggesting to Supabase to try WA first if configured
      }
    });
    return { error };
  };

  const verifyOtp = async (phone: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms', // Supabase treats wa as sms type for verification
    });
    return { data, error };
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithProvider,
    signInWithPopup,
    signOut,
    getUserRole,
    signInWithOtp,
    verifyOtp,
  };
};
