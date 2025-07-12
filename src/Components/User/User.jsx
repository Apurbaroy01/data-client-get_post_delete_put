import { Link } from "react-router-dom";

const User = ({ user }) => {

    const handleDelete = (_id) => {
        console.log("Delete id:", _id);
        fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'DELETE',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('User deleted successfully');
                }
            })
    }
    return (
        <div className="border-cyan-300 border-2 rounded-2xl p-3 m-2 ">
            <h2>Name: {user.name}</h2>
            <p>Email: {user.email}</p>
            <div className="flex justify-between mt-3">
                <button onClick={() => handleDelete(user._id)}>Delete❌</button>
                <Link to={`/update/${user._id}`}>
                    <button>Update</button>
                </Link> 
            </div>

        </div>
    );
};

export default User;