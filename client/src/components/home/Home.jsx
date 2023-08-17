import React from 'react'

import SideNavBar from '../sidenavbar/SideNavBar'
import AddFileButton from '../addFile/AddFileButton'
import AddFolder from '../addFile/AddFolder'

function home() {

  return (
    <div className='bg-white flex position'>
    <SideNavBar />
<div className=' bg-green-400 w-0 '>
<AddFileButton/> 
<AddFolder /> 
</div>
  
    </div>
  )
}

export default home
