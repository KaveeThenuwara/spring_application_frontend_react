import { useEffect, useState } from "react";

const UserPage = () => {
  const [userForm, setUserForm] = useState({
    id: "",
    name: "",
    age: "",
    email: "",
  });

  const [allUsers,setAllUsers] = useState([]);


  const getAllUsers = () => {
    fetch("http://localhost:8080/api/v1/user/getAllUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("All Users:", data);
        setAllUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/v1/user/saveUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userForm),
    })
      .then((response) => response.json()) 
      .then((data) => {
        console.log("Data:", data);

if(data.status !== 200) {
          console.log("Error saving user");
        } else {
          console.log("User saved successfully");
          alert('User saved successfully');
          getAllUsers()
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className="bg-gray-400  h-auto relative  items-center justify-center">
      <div className="top-0 mt-0 p-4 justify-center items-center flex">
        <h1 className="text-xl font-bold">User Page</h1>
      </div>

      <div>
        <form
          className="items-center flex flex-col justify-center gap-3"
          onSubmit={handlesubmit}
        >
          <input
            value={userForm.id}
            className="bg-gray-200 border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="ID"
            readOnly
          />
          <input
            value={userForm.name}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            className="bg-gray-200 border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter Name"
          />
          <input
            value={userForm.age}
            onChange={(e) => setUserForm({ ...userForm, age: e.target.value })}
            className="bg-gray-200 border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="Enter Age"
          />
          <input
            value={userForm.email}
            onChange={(e) =>
              setUserForm({ ...userForm, email: e.target.value })
            }
            className="bg-gray-200 border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter Email"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>


      {/* cards */}


      <div className="grid grid-cols-4 gap-3 p-2">
        {allUsers.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded shadow-md mb-4">
            <h2>id : {user.id}</h2>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">Age: {user.age}</p>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserPage;
