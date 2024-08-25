import React, { useEffect, useState } from 'react'
import ProjectCard from '../Components/ProjectCard'
import { BsPersonFill } from 'react-icons/bs';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { getUsersProjectAPI } from '../../Services/AllAPIs';

function Projects() {

  const [searchKey,setSearchKey]=useState("")//1 to hold the search key

  const [AllUserProject, setAllUserProject]=useState([])

  const getAllUsersProjects=async(req,res)=>{

//get token

if(sessionStorage.getItem('token')){
  const token=sessionStorage.getItem('token');
  const reqHeader={
    "Content-Type": "application/json",
    "Authorization": "bearer " + token
  }

  //API CALL

    const result = await getUsersProjectAPI(searchKey,reqHeader)
    console.log(result);
  if(result.status===200){
    setAllUserProject(result.data)
  }else{
    console.log(result.response.data);
  }
}

  }
  console.log(AllUserProject);
   

  useEffect(()=>{
    getAllUsersProjects()
  },[searchKey])

  console.log(searchKey);

  return (
    
    <div style={{backgroundColor:"pink"}}>
      <MDBNavbar light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/' className='text-black fw-bold'>
          <BsPersonFill className='fs-3 text-black mx-3' />
          <h3>BLOGE</h3>
        </MDBNavbarBrand>
       
      </MDBContainer>
    </MDBNavbar>
      
      <input type="text"onChange={e=>setSearchKey(e.target.value)} style={{width:'400px', alignItems:'center'}} placeholder='Search By Technology' className='form-control mx-auto m-5'/>
      <div className="row">
       {
        AllUserProject.length>0? AllUserProject.map(item=>(
          <div className="col m-5">
          <ProjectCard project={item}/>
        </div>
        )):"cant fetch all projects"
       }
      </div>
    </div>
  )
}

export default Projects