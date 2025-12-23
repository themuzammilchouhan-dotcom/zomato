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
      .select("role, full_name, city")
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

  const loadUser = async () => {
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    const authUser = session?.user;

    if (!mounted) return;

    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    const profile = await fetchProfile(authUser.id);

    setUser({
      ...authUser,
      role: profile?.role ?? "buyer",
      full_name: profile?.full_name ?? "",
      city: profile?.city ?? null,
    });

    setLoading(false);
  };

  loadUser();

  const { data: listener } = supabase.auth.onAuthStateChange(() => {
    loadUser();
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

  const { data: authData, error } =
    await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    setLoading(false);
    return { user: null, error };
  }

  if (authData?.user) {
    const profile = await fetchProfile(authData.user.id);

    const mergedUser = {
      ...authData.user,
      role: profile?.role ?? "buyer",
      full_name: profile?.full_name ?? "",
      city: profile?.city ?? null,
    };

    setUser(mergedUser);
    setLoading(false);

    return { user: mergedUser, error: null };
  }

  setLoading(false);
  return { user: null, error: null };
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
