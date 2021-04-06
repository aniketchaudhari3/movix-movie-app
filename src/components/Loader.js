import React from 'react'

export default function Loader({ size }) {
  return (
    <div className={`loader ${size ? size : ''}`}></div>
  )
}
