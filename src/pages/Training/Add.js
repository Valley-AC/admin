import React, { useState } from 'react'
import Nav from '../../components/Nav/Nav'
import Swal from 'sweetalert2'
import Select from 'react-select';
import { Input,Form,Label,Button } from 'reactstrap';
import TrainingsList from './List';







export default function AddTraining() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    category: "",
    price: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    formData.category = selectedOption.value;
    fetch('http://localhost:8080/api/training/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire(
          'Bravo!',
          'Formation ajoutée avec succés',
          'success'
        )
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
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

  const [files, setFiles] = useState(null);

  const handleFileInputChange = (event) => {
    const files = Array.from(event.target.files);
    setFiles(files);
  };

  const handleSubmitFile = (event) => {
    event.preventDefault();

    
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`avatar`, file);
    });

    fetch('http://localhost:8080/api/training/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('File uploaded:', data);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div style={{width:'100%'}}>
        <Nav/>
        <div style={{width:'50%', margin:20}} >
      

        <Form onSubmit={handleSubmit}>
      <Label>
        Titre de formation:
      </Label>
      
        <Input type="text" name="title" value={formData.title} onChange={handleChange} />
      <Label>
        Images:
      </Label>
        <Input type="text" name="image" value={formData.image} onChange={handleChange} />
      <Label>
      Description:
      </Label>
      
        <Input  type="textarea" name="description" value={formData.description} onChange={handleChange}/>
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
        <Input type="number" name="price" value={formData.price} onChange={handleChange} />
      <Button style={{marginTop:20}}   color="primary" type="submit">Send</Button>
    </Form>
      </div>

      <form onSubmit={handleSubmitFile}>
      <input multiple type="file" onChange={handleFileInputChange} />
      <button type="submit">Upload</button>
    </form>


      <TrainingsList/>
    </div>
  )
}
