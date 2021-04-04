import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from "../context/authContext";
import Navbar from './Navbar'
import Loader from './Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateEmail } from '../utils/helpers'

export default function Signup() {
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory()

  const { signup } = useAuth();

  const handleSubmit = async () => {
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    const confirmPassword = confirmPasswordInput.current.value;

    setError("");
    setLoading(false);

    if (validateEmail(email)) {
      if (password === confirmPassword) {
        setLoading(true)
        try {
          const res = await signup(email, password);
          console.log(res)
          if (res?.user) {
            toast.info('Account created successfully!')
            setTimeout(() => history.push('/profile'), 3000)
            setLoading(false)
          }
        } catch (err) {
          setLoading(false)
          return setError(err.message);
        }
      } else {
        setLoading(false)
        return setError("Passwords do not match");
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
            <h3 className="text-center">Signup on MoviX</h3>
            <div className="form-text mb-3 text-center">Create a Movix account with your email</div>
            <form onSubmit={e => {
              e.preventDefault()
              handleSubmit()
            }} className="container mt-3">
              <div className="mb-3">
                <input ref={emailInput} type="email" className="form-control" placeholder="Email" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <input ref={passwordInput} type="password" className="form-control" id="password" placeholder="Password (min. 8 characters)" />
              </div>
              <div className="mb-3">
                <input ref={confirmPasswordInput} type="password" className="form-control" id="confPassword" placeholder="Confirm your password" />
              </div>
              <div className="error form-text mb-3 text-center">{error}</div>
              <div className="d-grid gap-2">
                <button onClick={handleSubmit} className="btn btn-primary" type="button">{loading ? <Loader /> : 'Sign up'}</button>
              </div>
              <div className="form-text mt-3 text-center">Already a member? <Link to="/login">Login</Link></div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
