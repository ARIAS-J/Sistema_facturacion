import React from 'react'
import SideMenu from './SideMenu'

export default function Layout({ children }) {
  return (
    <>
      <div className='dashboard-structure'>
        <SideMenu />
        <div className='dashboard-content'>
          {children}
        </div>
      </div>
    </>
  )
}
