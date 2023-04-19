import  React, { useState } from 'react';
import {Table } from 'reactstrap';
import ImagePicker from 'react-image-picker';
import 'react-image-picker/dist/index.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Edit from './Edit';
// import UploadImage from './UploadImage';




  
export default function TrainingsList() {
  
  const [training, setTraining] = React.useState([]);

  const [modal, setModal] = React.useState(false);
 
  const [itemId, setItemId] = useState("");

  const toggle = (train) => {
    

    setItemId(train._id);
    setModal(!modal)


};
  React.useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    const response = await axios.get('http://localhost:8080/api/training');
    setTraining(response.data);
    console.log(response.data)
  };

  
  function handleDelete(training) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`http://localhost:8080/api/training/${training._id}`)
            .then(response => {
              const newTrainings = training.filter(p => p._id !== training._id);
              setTraining(newTrainings);
            })
            .catch(error => console.log(error));
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          window.location.reload()
        }
      })
   
  }

  const imgs = [
    {
      src: 'https://thehubbackend.com/media/29533-soft%20skills.jpeg',
      value: 'soft-skills',
    },
    {
      src: 'https://www.job-hunt.org/wp-content/uploads/2021/12/What-Are-Hard-Skills.jpg',
      value: 'hard-skills',
    },
    {
      src: 'https://www.mister-wp.com/wp-content/uploads/2020/10/coaching-training-planning-theme-WordPress.jpg',
      value: 'coaching',
    },
    {
      src: 'https://www.adage35.org/wp-content/uploads/2010/01/m%C3%A9tier-logo.png',
      value: 'métier',
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/512/5622/5622887.png',
      value: '',
    },
  ];
  const [selected, setSelected] = React.useState({src:'',value:''});

  const onPick = (image) => {
    setSelected(image);
    console.log(image)
  };

  



  return (
    <div style={{margin:20, width: '90%' }}>
      {/* <UploadImage/> */}
       <h4>Filtrer par catégorie</h4>
      <ImagePicker images={imgs} onPick={onPick} />
    <br/>
    <Table
    style={{margin:8}}
  bordered
>
  <thead>
    <tr>
      <th>
        #
      </th>
      <th>
        Titre
      </th>
    
      <th>
        Description
      </th>
      <th>
        Prix
      </th>
      <th>
      image
      </th>
      <th>
        Actions
      </th>
    
    </tr>
  </thead>
  <tbody>
  
   
    {training
    
    .filter((t)=> t.category.includes(selected?.value) )
    .map(training => (
       <tr>
         <th scope="row">
        {training._id}
</th>
        <td key={training.id}>{training.title}</td>
        
        <td key={training.id}>{training.description}</td>
        <td key={training.id}>{training.price}</td>
        <td key={training.id}>
          
        <img width={200} src={`http://localhost:8080/${training?.imageUrl}`}></img>
         
          </td>
       
        <td key={training.id}>
        {' '}
        <Button
    color="info"
    size="sm"
    onClick={() => toggle(training)}
  >
    Edit
  </Button>
  {' '}
        <Button
    color="danger"
    size="sm"
    onClick={() => handleDelete(training)}
  >
    Delete
  </Button>
            </td>
      </tr>
      ))}
  </tbody>
</Table>

<Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader toggle={toggle}>Edit Formation</ModalHeader>
        <ModalBody>
    <Edit itemId={itemId}/>
         
        </ModalBody>
        <ModalFooter>
         
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}