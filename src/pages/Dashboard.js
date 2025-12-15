import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user, signOut, loading } = useAuth();
console.log("Dashboard user:", user);
  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 24 }}>
      <h2>Welcome</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p style={{ fontSize: 16 }}>
            Signed in as <strong>{user?.email}</strong>
          </p>
          <button
            onClick={() => signOut()}
            style={{
              padding: "8px 12px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: 4,
            }}
          >
            Sign out
          </button>
        </>
      )}
    </div>
  );
}