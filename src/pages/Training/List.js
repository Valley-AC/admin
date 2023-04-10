import * as React from 'react';
import { Button, Table } from 'reactstrap';
import ImagePicker from 'react-image-picker';
import 'react-image-picker/dist/index.css';


export default function TrainingsList() {
  const [training, setTraining] = React.useState([]);
  React.useEffect(() => {
    fetch('http://localhost:8080/api/training/list')
      .then(response => response.json())
      .then(data => setTraining(data))
      .catch(error => console.log(error));
  }, []);

  const images = [
    {
      src: 'https://ginbits.com/wp-content/uploads/2021/03/Improving-Soft-Skills@3x.png',
      value: 'image1',
    },
    {
      src: 'https://cdn.corporatefinanceinstitute.com/assets/hard-skills.jpeg',
      value: 'image2',
    },
    {
      src: 'https://www.mister-wp.com/wp-content/uploads/2020/10/coaching-training-planning-theme-WordPress.jpg',
      value: 'image3',
    },
    {
      src: 'https://www.studyrama.com/pro/sites/default/files/styles/content/public/metiers-se_former.png?itok=UzxTVCZ5',
      value: 'image4',
    },
  ];
  const [selected, setSelected] = React.useState(null);

  const onPick = (image) => {
    setSelected(image);
  };

  return (
    <div style={{margin:20, width: '90%' }}>
        <h2>Les Catégories</h2>
      <ImagePicker images={images} onPick={onPick} />
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
        Actions
      </th>
    
    </tr>
  </thead>
  <tbody>
  
   
    {training.map(training => (
       <tr>
         <th scope="row">
        {training._id}
</th>
        <td key={training.id}>{training.title}</td>
        
        <td key={training.id}>{training.description}</td>
        <td key={training.id}>{training.price}</td>
        <td key={training.id}>
        {' '}
        <Button
    color="info"
    size="sm"
  >
    Edit
  </Button>
  {' '}
        <Button
    color="danger"
    size="sm"
  >
    Delete
  </Button>
            </td>
      </tr>
      ))}
  </tbody>
</Table>
    </div>
  );
}