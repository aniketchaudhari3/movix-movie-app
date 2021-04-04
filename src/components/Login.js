import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Navbar from './Navbar'
import Loader from './Loader'
import { useAuth } from "../context/authContext";
import { validateEmail } from '../utils/helpers'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const emailInput = useRef();
  const passwordInput = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory()

  const { login } = useAuth();

  const handleSubmit = async () => {
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    setError("");
    setLoading(false);
    if (validateEmail(email)) {
      setLoading(true)
      try {
        const res = await login(email, password);
        if (res?.user) {
          toast.info('Logged in!')
          setLoading(false)
          setTimeout(() => history.push('/profile'), 3000)
        }
      } catch (err) {
        setLoading(false)
        return setError(err?.message);
      }
    } else {
      setError('Please enter a valid email')
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container">
        <div className="row mt-5 justify-content-center">
          <div className="mt-5 col-md-4">
          <div className="d-flex justify-content-center">
              <img className="mb-2" src="/images/movix-logo.png" height="50" />
            </div>
            <h3 className="text-center">Welcome Back</h3>
            <div className="form-text mb-3 text-center">Sign in to your MoviX account</div>
            <form onSubmit={e => e.preventDefault()} className="container mt-3">
              <div className="mb-3">
                <input ref={emailInput} type="email" className="form-control" placeholder="Email" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <input ref={passwordInput} type="password" className="form-control" id="password" placeholder="Password" />
              </div>
              <div className="error form-text mb-3 text-center">{error}</div>
              <div className="d-grid gap-2">
                <button onClick={handleSubmit} className="btn btn-primary" type="button">{loading ? <Loader /> : 'Log in'}</button>
              </div>
              <div className="form-text mt-3 text-center"><Link to="/forgot-password">Forgot Password?</Link></div>
              <div className="form-text mt-2 text-center">Not a member yet? <Link to="/signup">Signup</Link></div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
