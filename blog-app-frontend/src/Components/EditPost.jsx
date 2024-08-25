import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BiEdit } from 'react-icons/bi';
import { serverURL } from '../../Services/serverURL';
import { editProjectResponseContext } from '../ContextAPI/ContextShare';
import { updateAUserProjectAPI } from '../../Services/AllAPIs';

function EditPost() {
  const context = useContext(editProjectResponseContext);
  const { editProjectResponse, setEditProjectResponse } = context;

  const [preview, setPreview] = useState("");
  const [projectdata, setProjectdata] = useState({
    id: projects._id,
    title: projects.title,
    overview: projects.overview,
    projectImage: "",
  });
  const [filestatus, setFileStatus] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (projectdata.projectImage && projectdata.projectImage.type) {
      const validImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (validImageTypes.includes(projectdata.projectImage.type)) {
        setPreview(URL.createObjectURL(projectdata.projectImage));
        setFileStatus(false);
      } else {
        setFileStatus(true);
      }
    }
  }, [projectdata.projectImage])



  const updateProjects = async () => {
    const { id, title, overview, projectImage } = projectdata;

    //reqBody
    const reqBody = new FormData();
    reqBody.append("title", title);
    reqBody.append("overview", overview);
    if (preview) reqBody.append("projectImage", projectImage);
    else reqBody.append("projectImage", projects.projectImage);

    //reqHeader
    const token = sessionStorage.getItem("token");

    if (preview) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `bearer ${token}`
      };

      //API CALL
      try {
        const result = await updateAUserProjectAPI(id, reqBody, reqHeader);
        console.log(result);

        if (result.status === 200) {
          alert("project updated");
          handleClose();
          setEditProjectResponse(result.data);
        } else {
          alert("project not updated");
          setEditProjectResponse(result.response.data);
        }
      } catch (error) {
        console.error("Error updating project:", error);
        alert("An error occurred while updating the project.");
      }
    } else {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `bearer ${token}`
      };

      //API CALL
      try {
        const result = await updateAUserProjectAPI(id, reqBody, reqHeader);
        console.log(result);

        if (result.status === 200) {
          alert("project updated");
          handleClose();
          setEditProjectResponse(result.response.data);
        } else {
          alert("project not updated");
          setEditProjectResponse(result.response.data);
        }
      } catch (error) {
        console.error("Error updating project:", error);
        alert("An error occurred while updating the project.");
      }
    }
  };

  return (
    <div>
      <div>
        <button className='btn btn-light text-dark' onClick={handleShow}><BiEdit /></button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size='lg'
        >
          <Modal.Header closeButton>
            <Modal.Title>Project title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-6 mt-4 p-5">
                <label>
                  <input type="file" onChange={e => setProjectdata({ ...projectdata, projectImage: e.target.files[0] })} style={{ display: 'none' }} />
                  <img width={'200px'} src={`${serverURL}/uploads/${projects.projectImage}`} alt="" />
                </label>
                {
                  filestatus && <p className='text-danger'>*please upload following image extension(png,jpeg,jpg)only...</p>
                }
              </div>
              <div className="col-6 text-center">
                <input type="text" onChange={e => setProjectdata({ ...projectdata, title: e.target.value })} value={projectdata.title} placeholder='Project title' className='form-control mb-3' />
                <input type="text" onChange={e => setProjectdata({ ...projectdata, overview: e.target.value })} value={projectdata.overview} placeholder='Overview' className='form-control mb-3' />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={updateProjects} variant="light">update</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default EditPost