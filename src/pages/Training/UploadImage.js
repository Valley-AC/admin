import React, { useEffect, useState } from 'react'
import { Button, Input } from 'reactstrap';

export default function UploadImage() {
    useEffect(()=>{
        getImages()
    },[])

    const [image,setImage] = useState("")
    const [allImages,setAllImages] = useState([])
    function convertToBase64(e){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload= ()=>{
            console.log(reader.result)
            setImage(reader.result)
         }
        reader.onerror = err =>{
            console.log('Error', err)
        }
    }

    function uploadImage(){


fetch('http://localhost:8080/api/file/upload-image', {
    method: 'POST',
    // crossDomain:true,
    headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application-json',
        "Access-Control-Allow-Origin":"*"
      },
    body: JSON.stringify({
        base64:image
    }),
   
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    }

    function getImages (){
        fetch('http://localhost:8080/api/file/get-image')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong');
    }
  })
  .then(data => {
    console.log(data);
    setAllImages(data.data)
  })
  .catch(error => {
    console.error('Error:', error);
  });
    }
  return (
    <div>
        <h2>Upload images</h2>
        <Input accept='image/*' type='file' onChange={convertToBase64}/>
        {
            image === '' || image ===null?'': <img width={400} height={200} src={image}></img>
        }
        <Button variant='success' onClick={uploadImage}>Upload</Button>

       
    </div>
  )
}
