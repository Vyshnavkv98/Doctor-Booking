import React from 'react'

import SideNavBar from '../sidenavbar/SideNavBar'
import AddFileButton from '../addFile/AddFileButton'
import AddFolder from '../addFile/AddFolder'
import TopNavBar from '../topNavBar/TopNavBar'
import UserHome from '../user/UserHome'

function home() {

  return (
    <div class="bg-white flex flex-wrap">
    <div >
      <SideNavBar />
    </div>
    <div class="flex-1">
      <TopNavBar className="flex-1 fixed" />
      <UserHome />
    </div>
    <div>
     
    </div>
  </div>
  
  )
}

export default home
