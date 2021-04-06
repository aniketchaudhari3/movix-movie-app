import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function updateName(name) {
    return currentUser.updateProfile({ displayName: name })
  }

  function getWishlistData(email) {
    // get wishlist data for an email
    setWishlistLoading(true)
    db.collection("wishlist")
      // .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        let userWishlist = []
        querySnapshot.forEach(doc => {
          userWishlist = [...userWishlist, { id: doc.id, ...doc.data() }]
        })
        setWishlistLoading(false)
        setWishlist(userWishlist.filter(doc => doc.email === email))
        return wishlist
      }).catch(err => {
        console.log(err)
        setWishlistLoading(false)
        return Promise.resolve(false)
      })
  }

  function addMovieToWishlist(insertData) {
    db.collection("wishlist").add(insertData)
      .then((docRef) => {
        getWishlistData(currentUser?.email)
        return Promise.resolve(true)
      })
      .catch((error) => {
        console.log(error)
        return Promise.resolve(false)
      });
  }

  function removeMovieFromWishlist(documentId) {
    db.collection("wishlist")
      .doc(documentId).delete().then(() => {
        getWishlistData(currentUser?.email)
        return Promise.resolve(true)
      }).catch((error) => {
        console.log(error)
        return Promise.resolve(false)
      });
  }

  useEffect(() => {
    const unsubsribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false)
    });

    if (currentUser?.email) {
      getWishlistData(currentUser?.email)
    }

    return unsubsribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateName,
    wishlist,
    addMovieToWishlist,
    getWishlistData,
    removeMovieFromWishlist,
    wishlistLoading
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
