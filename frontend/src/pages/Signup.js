import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/signup`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <label>Password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <button>Sign Up</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Signup;
