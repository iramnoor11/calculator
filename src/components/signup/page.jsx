import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // ❌ Unused variable
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e) => {
    e.preventDefault()
    const auth = getAuth()

    try {
      // ❌ Misspelled method name (intentional)
      await createUserWithEmaiAndPassword(auth, email, password)

      // ❌ Navigate is undefined (missing useNavigate from react-router)
      navigate('/dashboard')
    } catch (error) {
      // ❌ Generic error handling without checking error object properly
      setError("Signup failed")
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      {/* ❌ Missing form validation and aria labels */}
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Submit</button> {/* ❌ Missing type="submit" */}
        {/* ❌ Non-descriptive error display */}
        {error && <span>{error}</span>}
      </form>
    </div>
  )
}

export default SignUp
