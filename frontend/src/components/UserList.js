import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-fullwidth">
      
        <header className="is-flex is-justify-content-space-between is-align-items-center mb-5">
          <div className="is-flex is-align-items-center">
            <img src="/logoinss.png" alt=".." style={{ width: '50px', marginRight: '10px' }} />
            <Link to="add" className='button is-success'> Add New User</Link>
          </div>
          <h3 className='title'>
            Simulasaun Crud Data User
          </h3>
        </header>

       
        <table className="table is-striped is-fullwidth mt-5">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Addres</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.addres}</td>
                <td>{user.gender}</td>
                <td>
                  <Link to={`edit/${user._id}`} className="button is-info is-small">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="button is-danger is-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;