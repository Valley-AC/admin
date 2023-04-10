import * as React from 'react';
import { Table } from 'reactstrap';



export default function CustomToolbarGrid() {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    fetch('http://localhost:8080/api/users/list')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, []);


  return (
    <div style={{ height: 400, width: '100%' }}>
    
    <Table
  bordered
>
  <thead>
    <tr>
      <th>
        #
      </th>
      <th>
        Email
      </th>
    
    </tr>
  </thead>
  <tbody>
  
   
    {users.map(user => (
       <tr>
         <th scope="row">
        {user._id}
</th>
        <td key={user.id}>{user.email}</td>
      </tr>
      ))}
  </tbody>
</Table>
    </div>
  );
}