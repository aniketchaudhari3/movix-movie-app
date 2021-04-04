import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import Navbar from './Navbar'
import Account from './Account'
import Wishlist from './Wishlist'
import { FaHeart, FaUserAlt } from "react-icons/fa";


export default function Profile() {
  const { currentUser } = useAuth()
  const [selected, setSelected] = useState({ name: 'Account', component: <Account /> })

  const SidebarItem = ({ name, icon, component }) => (<li onClick={() => setSelected({ name, component })} className={`sidebar-item ${selected.name === name && 'selected'}`}>{icon} {name}</li>)

  return (
    <>
      <Navbar />
      <div className="container-fluid profile-container">
        <div className="d-flex justify-content-center">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3 sidebar">
                <ul className="profile-sidebar">
                  <SidebarItem
                    icon={<FaUserAlt className="mt-1 mx-2" />}
                    name="Account"
                    component={<Account currentUser={currentUser && currentUser} />} />
                  <SidebarItem
                    icon={<FaHeart className="mt-1 mx-2" />}
                    name="Wishlist"
                    component={<Wishlist />} />
                </ul>
              </div>
              <div className="col-md-9 main-content p-3">
                {selected.component}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
