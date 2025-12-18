import React, { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // merged user with role
  const [loading, setLoading] = useState(true);

  // Helper: fetch profile info (role, full_name) from profiles table
  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("role, full_name")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error.message);
      window.alert(error.message);
      return null;
    }
    return data;
  };

  useEffect(() => {
    let mounted = true;

    // Get initial session
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      const authUser = data.session?.user ?? null;
      if (authUser) {
        setUser(authUser); // set auth user immediately

        fetchProfile(authUser.id).then((profile) => {
          if (profile) {
            setUser((prev) => ({
              ...prev,
              role: profile.role ?? "user",
              full_name: profile.full_name ?? "",
            }));
          }
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const authUser = session?.user ?? null;
      if (authUser) {
        setUser(authUser);

        fetchProfile(authUser.id).then((profile) => {
          if (profile) {
            setUser((prev) => ({
              ...prev,
              role: profile.role ?? "user",
              full_name: profile.full_name ?? "",
            }));
          }
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  // Sign up and create profile
  const signUp = async (email, password, full_name = null, role = "user") => {
    setLoading(true);

    // 1. Sign up in Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setLoading(false);
      return { data, error };
    }

    const authUser = data?.user;

    // 2. Create profile in profiles table
    if (authUser) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: authUser.id,
            full_name,
            role,
            // optional: updated_at: new Date(), // only if column exists
          }
        ]);

      if (profileError) {
        setLoading(false);
        return { data, error: profileError };
      }

      // Merge role into context
      setUser({
        ...authUser,
        role,
        full_name,
      });
    }


    setLoading(false);
    return { data, error: null };
  };

  // Sign in
  const signIn = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (data?.user) {
      const profile = await fetchProfile(data.user.id);
      setUser({
        ...data.user,
        role: profile?.role ?? "user",
        full_name: profile?.full_name ?? "",
      });
    }

    setLoading(false);
    return { data, error };
  };

  // Sign out
  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
export default AuthContext;
