import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Navbar from './Navbar'
import Loader from './Loader'
import { useAuth } from "../context/authContext";
import { validateEmail } from '../utils/helpers'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
  const emailInput = useRef();
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory()

  const { resetPassword } = useAuth();

  const handleSubmit = async () => {
    const email = emailInput.current.value;

    setError("");
    setLoading(false);
    if (validateEmail(email)) {
      setLoading(true)
      try {
        await resetPassword(email);
        toast.info(`Password reset link sent`)
        setInfo(`Password reset link sent to ${email}`)
        setLoading(false)
        emailInput.current.value = ''
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
            <h3 className="text-center">Find Your Account</h3>
            <div className="form-text mb-3 text-center">A link to reset will be sent on your email address</div>
            <form onSubmit={e => e.preventDefault()} className="container mt-3">
              <div className="mb-3">
                <input ref={emailInput} type="email" className="form-control" placeholder="Email" aria-describedby="emailHelp" />
              </div>
              <div className="error form-text mb-3 text-center">{error}</div>
              <div className="d-grid gap-2">
                <button onClick={handleSubmit} className="btn btn-primary" type="button">{loading ? <Loader /> : 'Reset Password'}</button>
              </div>
              <div className="info form-text mb-3 text-center">{info}</div>
              <div className="form-text mt-3 text-center">Proceed to <Link to="/login">Login</Link></div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
