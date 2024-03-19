import axios from 'axios'
import React, {useState} from 'react'

const UploadWidget = () => {
  const preset_key = "j5ctqaw8";
  const cloud_name = "dpbtfgqvb";
  const [image, setImage] = useState();

  function handleFile(event) {
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
    .then(res => setImage(res.data.secure_url))
    .catch(err => console.error(err));
  }

  return (
    <>
      <input type="file" name='image' onChange={handleFile}/>
      <img src={image} alt="" />
    </>
  )
}

export default UploadWidget