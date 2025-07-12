import { useState } from 'react';
import './App.css'
import { useLoaderData } from 'react-router-dom';
import User from './Components/User/User';


function App() {
  const loaderData = useLoaderData();
  // console.log(loaderData);
  const [user, setUser] = useState(loaderData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const inputUser = { name, email };
    console.log(inputUser);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(inputUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert('User added successfully');
        const newUser = [...user, data];
        setUser(newUser);
        form.reset();
      })

  };


  return (
    <>
      <div className='bg-slate-200 p-5 rounded-2xl **:mt-5'>
        <form  onSubmit={handleSubmit}>
          <input className='bg-white border' type="text" name="name" /><br />
          <input className='bg-white border' type="text" name="email" /><br />
          <button>Submit</button>
        </form>
      </div>

      
      {
        user.map(user => <User key={user._id} user={user}></User>)
      }

    </>
  )
}

export default App
