import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    try {
      await logout()
      history.push('/login')
    } catch (err) {
      console.log('Failed to log out: ', err.message)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          <img height="30" className="mx-2" src="/images/movix-logo.png" />
          MoviX
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>
          {/* profile dropdown - show only when logged in */}
          <ul className="d-flex navbar-nav ">
            {currentUser?.email ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img className="rounded-circle mx-2" height="30"
                    src={currentUser.photoUrl ?? "/images/default-user.png"}
                  />
                  {currentUser.displayName ?? currentUser.email}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a onClick={handleLogout} className="dropdown-item">Logout</a></li>
                </ul>
              </li>
            ) :
              (
                <>
                  <li className="nav-item">
                    <Link className="nav-link mx-2" to="/login">Login</Link>
                  </li>
                  <Link to="/signup">
                    <button className="btn btn-primary">Sign up</button>
                  </Link>
                </>
              )
            }
          </ul>
          {/* end profile dropdown */}
        </div>
      </div>
    </nav>
  )
}
