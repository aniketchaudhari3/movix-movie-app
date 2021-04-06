import React, { useState, useRef } from 'react'
import { useAuth } from '../context/authContext'
import Loader from './Loader'
import { validateEmail } from '../utils/helpers'
import { Toast } from './Toast'
import { CgCheckO } from 'react-icons/cg'

export default function Account() {
  const { currentUser, updateName, updateEmail, updatePassword } = useAuth()
  const [state, setState] = useState({ displayName: currentUser?.displayName, email: currentUser?.email })

  const [loading, setLoading] = useState(false)
  const [errors, setError] = useState({
    nameError: '',
    emailError: '',
    passwordError: ''
  })

  const passwordInput = useRef()
  const confPasswordInput = useRef()

  async function handleSubmit() {
    setLoading(true)
    setError({
      nameError: '',
      emailError: '',
      passwordError: ''
    })

    // update name
    const name = state?.displayName
    // update if name is changed
    if (name && currentUser?.displayName !== name) {
      try {
        const res = await updateName(name)
        if (res) {
          Toast.fire({
            title: 'Name updated successfully!',
            icon: 'success'
          })
        }
      } catch (err) {
        setErrors({ ...errors, nameError: err.message })
      }
    }

    // update email
    const email = state?.email
    // update if email is changed
    if (currentUser?.email !== email) {
      if (validateEmail(email)) {
        try {
          const res = await updateEmail(email)
          if (res) {
            Toast.fire({
              title: 'Email updated successfully!',
              icon: 'success'
            })
          }
        } catch (err) {
          setErrors({ ...errors, nameError: err.message })
        }
      } else {
        setError({ ...errors, emailError: 'Please enter a valid email' })
      }
    }

    // update password
    const password = passwordInput.current.value
    const confPassword = confPasswordInput.current.value

    if (password.length === 0) return setLoading(false)

    if (password === confPassword && password.length >= 8) {
      try {
        const res = await updatePassword(password)
        if (res) {
          Toast.fire({
            title: 'Password updated successfully!',
            icon: 'success'
          })
          passwordInput.current.value = ''
          confPasswordInput.current.value = ''
        }
      } catch (err) {
        setError({ ...errors, passwordError: err.message })
      }
    } else {
      setError({ ...errors, passwordError: 'Please enter a valid password (min. 8 characters)' })
    }
    setLoading(false)
  }

  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUNE',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ]

  const parseDate = (date) => {
    let d = new Date(date)
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col-md-5 px-5">
          <div className="d-flex flex-column">
            <img className="mx-auto" src={currentUser?.photoUrl || '/images/default-user.png'} height="150" width="150" />
            <br />
            <h4 className="mx-auto mt-2 text-center">{currentUser?.displayName}</h4>
            <p className="mx-auto mt-2 text-center">{currentUser?.email}</p>
            {currentUser?.metadata?.creationTime && <p className="mx-auto form-text text-center">Joined on {parseDate(currentUser?.metadata?.creationTime)}</p>}
          </div>
        </div>
        <div className="col-md-7">
          <div className="container mt-3">
            <h5>Basic Details</h5>
            <div className="my-4">
              <label className="form-text" htmlFor="name">Name</label>
              <input value={state?.displayName || ''} onChange={(e) => setState({ ...state, displayName: e.target.value })} type="text" id="name" className="mt-2 form-control" placeholder="Name" />
            </div>
            <div className="error form-text mb-3 text-center">{errors?.nameError}</div>
            <div className="my-4">
              <label className="form-text" htmlFor="email">Email</label>
              <input autoComplete="new-password" value={state?.email} onChange={(e) => setState({ ...state, email: e.target.value })} type="email" id="email" className="mt-2 form-control" placeholder="Email" />
            </div>
            <div className="error form-text mb-3 text-center">{errors?.emailError}</div>
            <h5>Update your password</h5>
            <div className="my-4">
              <label className="form-text" htmlFor="password">Password</label>
              <input ref={passwordInput} autoComplete="new-password" type="password" id="password" className="mt-2 form-control" placeholder="Enter new password (min. 8 characters)" />
            </div>
            <div className="my-4">
              <label className="form-text" htmlFor="confPassword">Confirm Password</label>
              <input ref={confPasswordInput} autoComplete="new-password" type="password" id="confPassword" className="mt-2 form-control" placeholder="Confirm Password" />
            </div>
            <div className="error form-text mb-3 text-center">{errors?.passwordError}</div>
            <button onClick={handleSubmit} className="btn btn-primary" type="button">{loading ? <Loader /> : <span><CgCheckO /> Update</span>}</button>
          </div>
        </div>
      </div>
    </>
  )
}
