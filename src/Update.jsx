import { useLoaderData } from "react-router-dom";


const Update = () => {
    const updata = useLoaderData()
    console.log(updata);

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const updatedUser = { name, email };
        console.log(updatedUser);

        fetch(`http://localhost:5000/users/${updata._id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => response.json())
        .then(data => { 
            console.log(data);
            if (data.modifiedCount > 0) {
                alert('User updated successfully');
                form.reset();
            }
        })
    }

    return (
        
        <div>
            <h2>name: {updata.name}</h2>
            <form onSubmit={handleUpdate}>
                <input type="text" defaultValue={updata.name} name="name" /><br />
                <input type="text" defaultValue={updata.email} name="email"/><br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Update;