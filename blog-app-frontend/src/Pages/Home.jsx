import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import { BsPersonFill } from 'react-icons/bs';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { getHomeProjectAPI } from '../../Services/AllAPIs';



function Home() {

  const[isLoggedIn,setIsLoggedIn]=useState(false)

  const[homeProject,setHomeProject]=useState([])

  const getHomeProject=async(req,res)=>{
    //API call
    const result=await getHomeProjectAPI()
    console.log(result);
    if(result.status==200){
      setHomeProject(result.data)
    }else{
      console.log(result.response.data);
    }
  }
    console.log(homeProject);

 
  useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[])
  return (
    <div style={{backgroundColor:"rgba(0,49,64,255)" }}>
      
      <MDBNavbar light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/' className='text-black fw-bold'>
          <BsPersonFill className='fs-3 text-black mx-3' />
          <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px' }}>Project Fair</span>
        </MDBNavbarBrand>
       
      </MDBContainer>
    </MDBNavbar>
      <div className="row">
        <div className="col-sm-6">
          <h1 className='text-center mt-5'>Project Fair</h1>
          <p style={{textAlign:'justify'}} className='mx-5'>
          A project is a series of structured tasks, activities, and deliverables that are carefully executed to achieve a desired outcome. They are temporary efforts to create value through unique products, services and processes.
          Each aspect of a project must go through the phases of the project lifecycle before reaching an end goal. This lifecycle allows project managers to execute each phase of their project effectively. It enables them to plan each task and activity meticulously, 
          ensuring the highest chances of a project’s success.
          </p>
         {
          isLoggedIn?   <div className='text-center'>
          <Link to={'./dashboard'}>
            <button className='btn btn-dark mt-2 mb-5'>Manage Your Project</button>
          </Link>
        </div>:<div className='text-center'>
          <Link to={'./login'}>
            <button className='btn btn-dark mt-2 mb-5'>Get Started</button>
          </Link>
        </div>
         }
        </div>
        <div className="col-sm-6">
          <img src={developer} style={{justifyItems:'center', width:'100%', height:'100%'}} alt="" />
        </div>
      </div>

      <div className="row">
        <div className="col-12" style={{height:'500px'}}>
          <h1 className='text-center m-5'>Explore Our Projects</h1>
          <marquee width="100%" direction="left" height="400px">
         <div className='row'>
         {
            homeProject.length>0?homeProject.map(item=>(
              <div className='col'>
         <ProjectCard project={item}/>
         </div>
            )) : '<h1 className="text-light">Null</h1>'
          }
         </div>
        </marquee>
        </div>
      </div>

      <div className="row mx-5 p-5">
        <h1 className='text-center m-5'>Our Services</h1>
        <div className="col-md-4">
          <div className='card shadow p-5' style={{height:'500px'}}>
            <h3 className='text-center m-2'>web designing</h3>
            <p className='mt-5' style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptatibus iusto architecto dolores blanditiis quam atque, suscipit eos exercitationem cupiditate hic deleniti vel totam laborum vitae tenetur provident corporis vero.</p>
          </div>
        </div>
        <div className="col-md-4">
        <div className='card shadow p-5' style={{height:'500px'}}>
            <h3 className='text-center m-2'>web designing</h3>
            <p className='mt-5' style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptatibus iusto architecto dolores blanditiis quam atque, suscipit eos exercitationem cupiditate hic deleniti vel totam laborum vitae tenetur provident corporis vero.</p>
          </div>
        </div>
        <div className="col-md-4">
        <div className='card shadow p-5' style={{height:'500px'}}>
            <h3 className='text-center m-2'>web designing</h3>
            <p className='mt-5' style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptatibus iusto architecto dolores blanditiis quam atque, suscipit eos exercitationem cupiditate hic deleniti vel totam laborum vitae tenetur provident corporis vero.</p>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Home