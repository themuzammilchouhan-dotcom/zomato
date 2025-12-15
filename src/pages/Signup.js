import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const validate = () => {
    if (!fullName.trim()) return "Full name is required";
    if (!email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email";
    if (!password || password.length < 6)
      return "Password must be at least 6 characters";
    if (!role) return "Role is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const { data, error } = await signUp(email, password, fullName, role);
    setLoading(false);

    if (error) {
      setError(error.message || "Failed to sign up");
      return;
    }

    if (data?.user) {
      navigate("/", { replace: true });
      return;
    }

    setInfo(
      "Please check your email to confirm your account. After confirming, log in."
    );
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: 24,
        border: "1px solid #eee",
        borderRadius: 8,
      }}
    >
      <h2 style={{ marginTop: 0 }}>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Full Name
          <input
            style={{ width: "100%", padding: 8, marginTop: 6 }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Email
          <input
            style={{ width: "100%", padding: 8, marginTop: 6 }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Password
          <input
            style={{ width: "100%", padding: 8, marginTop: 6 }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Role
          <select
            style={{ width: "100%", padding: 8, marginTop: 6 }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        {error && (
          <div style={{ color: "red", marginBottom: 8 }}>{error}</div>
        )}
        {info && (
          <div style={{ color: "green", marginBottom: 8 }}>{info}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 16px",
            background: "#0b69ff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
          }}
        >
          {loading ? "Signing up..." : "Create account"}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
