import React, { useEffect, useState } from 'react';
import MyPost from '../Components/MyPost';
import Header from '../Components/Header';

function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // Adding dependency array to run only on mount

  return (
    <div className="dashboard-container">
      <Header />
      <div className="row">
        <h2 className='text-center mt-5'>
          Welcome <span className='text-white'>{username ? username : "Guest"}</span>
        </h2>
        <div className="col-lg-6">
          <MyPost />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
