import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit';
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { BsPersonFill } from 'react-icons/bs';

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <MDBNavbar light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/' className='text-black fw-bold'>
          <BsPersonFill className='fs-3 text-black mx-3' />
          <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px' }}>BLOGS</h1>
        </MDBNavbarBrand>
        {loggedIn && (
          <button onClick={logout} className='btn fs-5 btn-dark'><IoIosLogOut /></button>
        )}
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;


