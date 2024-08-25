import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectResponseContext } from '../ContextAPI/ContextShare';
import { addProjectAPI } from '../../Services/AllAPIs';

function AddPost() {
  const context = useContext(addProjectResponseContext);
  const { addProjectResponse, setAddProjectResponse } = context;


  const [preview, setPreview] = useState("")


  const [filestatus, setFileStatus] = useState(false)

  const [projectdata, setProjectdata] = useState({
    title: "",
    overview: "",
    projectImage: ""
  })

  const [token, setToken] = useState("")

  console.log(projectdata);




  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log(projectdata.projectImage.type);
    if (projectdata.projectImage.type == "image/png" || projectdata.projectImage.type == "image/jpeg" || projectdata.projectImage.type == "image/jpeg") {
      console.log("generate image url");
      //file to url conversion
      console.log(URL.createObjectURL(projectdata.projectImage));
      setPreview(URL.createObjectURL(projectdata.projectImage))

      setFileStatus(false)
    } else {
      setFileStatus(true)
      console.log("please upload following image extension(png,jpeg,jpg)only...");

    }
  }, [projectdata.projectImage])


  const handleAddProject = async () => {
    const { title, overview, projectImage } = projectdata
    if (!title || !overview || !projectImage) {
      alert("please fill the following fields")
    } else {
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("overview", overview)
      reqBody.append("projectImage", projectImage)

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `bearer ${token}`
        }

        //api call

        const result = await addProjectAPI(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          alert("project added successfully")
          setAddProjectResponse(result.data)
          handleClose()
          setProjectdata({
            title: "",
            overview: "",
            projectImage: ""
          })
          setPreview("")
        } else {
          alert(result.response.data)
        }
      }


    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    } else {
      setToken("")
    }
  }, [])
  console.log(token);
  return (
    <div >
      <div >
        <button className='btn btn-light text-black m-5' onClick={handleShow}>Add</button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size='lg'




        >
          <Modal.Header closeButton >
            <Modal.Title>Project title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row"  >
              <div className="col-6 mt-4 p-5">
                <label>
                  <input type="file" onChange={e => setProjectdata({ ...projectdata, projectImage: e.target.files[0] })} style={{ display: 'none' }} />
                  <img width={'200px'} src={preview ? preview : "https://i1.wp.com/blog.alexdevero.com/wp-content/uploads/2019/08/12-07-19-16-tips-to-become-a-better-programmer-pt1-blog.jpg?fit=1024%2C635&ssl=1"} alt="" />
                </label>
                {
                  filestatus && <p className='text-danger'>*please upload following image extension(png,jpeg,jpg)only...</p>
                }
              </div>
              <div className="col-6 text-center">
                <input type="text" onChange={e => setProjectdata({ ...projectdata, title: e.target.value })} placeholder='Project title' className='form-control mb-3' />
                <input type="text" onChange={e => setProjectdata({ ...projectdata, overview: e.target.value })} placeholder='Overview' className='form-control mb-3' />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleAddProject} variant="light">ADD</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default AddPost