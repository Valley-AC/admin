import React, { useEffect, useState } from 'react'
import { Input,Form,Label } from 'reactstrap';
import Select from 'react-select';
import {Button } from 'reactstrap';
import  axios  from 'axios';
import Swal from 'sweetalert2';

export default function Edit(props) {

    const handleChangeSelect = (selectedOption) => {
        setCategory(selectedOption);
        
      };
    
    const options = [
        { value: 'soft-skills', label: 'Soft-skills' },
        { value: 'hard-skills', label: 'Hard-skills' },
        { value: 'coaching', label: 'Coaching' },
        { value: 'métier', label: 'Métiers' },
      ];

      const[currentTraining,setCurrentTraining]=useState({})

      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [category, setCategory] = useState('');
      const [price, setPrice] = useState(0);
      const [images, setImages] = useState([]);
   
   
      const handleSubmit = async event => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category?.value);
        formData.append('price', price);
        for (let i = 0; i < images?.length; i++) {
          formData.append('images', images[i]);
        }
        try {
          const response = await axios.put('http://localhost:8080/api/training/'+currentTraining._id, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          setCurrentTraining( response.data);
        
    
          Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )
        } catch (error) {
          console.error(error);
        }
      };
      useEffect(()=>{
        console.log('item id',props.itemId)
        fetch(`http://localhost:8080/api/training/${props.itemId}`)
        .then((response) => response.json())
        .then ((res)=>{
          console.log(res)
          setCurrentTraining(res)
          setTitle(res.title)
          setDescription(res.description)
          setCategory(res.category)
          setPrice(res.price)
          setImages(res.images)
        
        })
         },[]);
    
  return (
    <div>
            <Form  onSubmit={handleSubmit} >
      <Label>
        Titre de formation:
      </Label>
      
        <Input type="text" name="title" defaultValue={currentTraining.title} onChange={event => setTitle(event.target.value)} />
      
      <Label>
      Description:
      </Label>
      
        <Input  type="textarea" name="description" defaultValue={currentTraining.description} onChange={event => setDescription(event.target.value)}/>
        <Label>
      Catégorie:
      </Label>
      <Select
      defaultValue={currentTraining.category}
      defaultInputValue={currentTraining.category}
        onChange={handleChangeSelect}
      options={options}
      name='category'
    />
      <Label>
        Prix:
      </Label>
        <Input type="number" name="price" defaultValue={currentTraining.price} onChange={event => setPrice(event.target.value)} />
   
        <Label>
        Images:
      </Label>
      <Input multiple type="file" onChange={event => setImages(event.target.files)} />
   
   
   
       <Button style={{marginTop:20}}   color="primary" type="submit">Send</Button>
     
   
    </Form>
    </div>
  )
}
