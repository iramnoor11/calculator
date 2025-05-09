```jsx
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ❌ useNavigate is undefined

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate('/dashboard');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already in use.');
      } else if (error.code == 'auth/invalid-email') {
        setError(); // ❌ missing argument
      } else {
        setError('Something went wrong.');
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
          required
        />
        <button type="submit" role="button">Submit</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

export default SignUp;
```