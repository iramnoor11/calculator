import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// ❌ MISSING useNavigate import
// import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ❌ useNavigate is undefined

  const handleSignUp = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      createUserWithEmailAndPassword(auth, email, password); // ❌ missing `await`
      navigate('/dashboard'); // ❌ may execute before user creation completes
    } catch (error) {
      if (error.code = 'auth/email-already-in-use') { // ❌ single `=` instead of `===`
        setError('Email already in use.');
      } else if (error.code === 'auth/invalid-email') {
        setError(); // ❌ missing argument
      } else {
        setError('Something went wrong');
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
          // ❌ missing `required` attribute
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
          required
        />
        <button>Submit</button> {/* ❌ missing `type="submit"` */}
        {/* ❌ role is okay, but should be a more semantic element */}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default SignUp;
