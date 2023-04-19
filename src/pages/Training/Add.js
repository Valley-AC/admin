import React, { useState } from 'react'
import Nav from '../../components/Nav/Nav'
import Swal from 'sweetalert2'
import Select from 'react-select';
import { Input,Form,Label,Button } from 'reactstrap';
import TrainingsList from './List';
import axios from 'axios';







export default function AddTraining() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("category", selectedOption.value);
    formData.append("price", price);
    formData.append("image", image);
    fetch("http://localhost:8080/api/training/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      window.location.reload()
   
  };

 

  const handleChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
    
  };

  const options = [
    { value: 'soft-skills', label: 'Soft-skills' },
    { value: 'hard-skills', label: 'Hard-skills' },
    { value: 'coaching', label: 'Coaching' },
    { value: 'métier', label: 'Métiers' },
  ];












  return (
    <div style={{width:'100%'}}>
        <Nav/>
        <div style={{width:'50%', margin:20}} >
      

        <Form onSubmit={handleSubmit}>
      <Label>
        Titre de formation:
      </Label>
      
        <Input type="text" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
    
      <Label>
      Description:
      </Label>
      
        <Input  type="textarea" name="description" value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
        <Label>
      Catégorie:
      </Label>
      <Select
      value={selectedOption}
      onChange={handleChangeSelect}
      options={options}
      name='category'
    />
      <Label>
        Prix:
      </Label>
        <Input type="number" name="price" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
      
      <Label>
        Image:
      </Label>
        <Input  type="file"  onChange={(e)=>{setImage(e.target.files[0])}} />
      
      
      
      <Button style={{marginTop:20}}   color="primary" type="submit">Send</Button>
   
   
   
    </Form>
      </div>

     


      <TrainingsList/>


    </div>
  )
}
