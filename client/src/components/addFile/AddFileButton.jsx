import React from 'react'

import {AiFillFile} from 'react-icons/ai'

function AddFileButton() {
  return (
    <>
      <label className=' m-0 mr-2 '>
            <AiFillFile className='bg-green-300 text-3xl'/>
            <input type="file" className='opacity-0' />
      </label>
    </>
  )
}

export default AddFileButton
