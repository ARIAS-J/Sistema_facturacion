import React from 'react'
import SideMenu from './SideMenu'

export default function Layout({ children }) {
  return (
    <>
      <SideMenu />
      <div className='dashboard-content'>
        {children}
      </div>
    </>
  )
}
