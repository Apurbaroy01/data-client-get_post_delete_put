
import { Link, useLoaderData } from 'react-router-dom';
import './App.css'
import { useState } from 'react';


function App() {
  const loderData = useLoaderData();
  console.log(loderData);
  const [users, setUsers] = useState(loderData);


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const newusers = [...users, data];
        setUsers(newusers);
        alert('User added successfully');
        form.reset();
      })

  };

  const handleDelete = (_id) => {
    console.log('delet user', _id);
    fetch(`http://localhost:5000/users/${_id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert('User deleted successfully');
          const remainingUsers = users.filter(user => user._id !== _id);
          setUsers(remainingUsers);
        }
      })
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" /><br />
        <input type="text" name="email" /><br />
        <input type="submit" value='Submit' />
      </form>

      <h1>input Users</h1>
      {
        users.map(user => <li key={user._id}>
          {user.name} : {user.email}
          <Link to={`/update/${user._id}`}>
            <button>update</button>
          </Link>
          <button onClick={() => handleDelete(user._id)}>X</button>
        </li>)
      }



    </>
  )
}

export default App
