import { useLoaderData } from "react-router-dom";

const Update = () => {
    const loderData= useLoaderData();
    // console.log(loderData);
    

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const updatedUser = { name, email };
        console.log(updatedUser);

        fetch(`http://localhost:5000/users/${loderData._id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.modifiedCount > 0) {
                alert('User updated successfully');
            }
        });

      
    }

    return (
        
        <div className="border-cyan-300 border-2 rounded-2xl  **:mt-3 p-2 ">
            <h2>name:{loderData.name} </h2>
            <form onSubmit={handleUpdate}>
                <input className="bg-white border-2" type="text" defaultValue={loderData.name}  name="name" /><br />
                <input className="bg-white border-2" type="text" defaultValue={loderData.email}  name="email"/><br />
                <button className="btn btn-primary" type="submit">Update</button>
            </form>
        </div>
    );
};

export default Update;