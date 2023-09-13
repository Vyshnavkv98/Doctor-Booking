import React,{useState} from 'react'
import axios from '../../axios/axios';

function Upload() {

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files);
    };
    // const handleUpload = () => {
    //     if (selectedFile) {
    //         // Here you can perform your upload logic
    //         console.log('Uploading:', selectedFile);
    //     }
    // };


    const formData=new FormData();
        formData.append('newFiles',selectedFile)
        console.log(formData,'formdata');

console.log(formData);
    const handleSubmit=async(e)=>{
        e.preventDefault()
 
       await axios.post('upload',formData)
       .then(res=> console.log(res.data))
       .catch(err=> console.log(err))
    }
  return (  
    <div>
        <form onSubmit={handleSubmit}>
     <input type='file' onChange={handleFileChange} name='image' multiple />
     <button >Upload</button>
     </form>
    </div>
  )
}

export default Upload
