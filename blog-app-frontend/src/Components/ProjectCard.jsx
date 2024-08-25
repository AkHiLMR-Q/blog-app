import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiFillGithub } from "react-icons/ai";
import { FaLink } from "react-icons/fa";
import { serverURL } from '../../Services/serverURL';

function ProjectCard({ project }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

function ProjectCard() {
  return (
    <div>
        <div>
      <style jsx="true">{`
        .project-card {
          width: 18rem;
          cursor: pointer;
          transition: transform 0.2s;
          margin-bottom: 1rem;
        }
        .project-card:hover {
          transform: scale(1.05);
        }
        .project-card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: filter 0.3s ease;
        }
        .project-card-img:hover {
          filter: blur(5px);
        }
        .modal-body .row {
          align-items: center;
        }
        .modal-body .col-md-6 h5 {
          margin-top: 1rem;
        }
        .icon {
          margin-right: 0.5rem;
        }
        .modal-footer .btn {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-footer .btn a {
          color: white;
          text-decoration: none;
        }
        .modal-footer .btn a:hover {
          text-decoration: underline;
        }
      `}</style>

      <Card className="project-card shadow-sm" onClick={handleShow}>
        <Card.Img
          variant="top"
          src={project ? `${serverURL}/uploads/${project.projectImage}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcK_PhJ0aQvWx8as9EY6LauPJGzo2l2nyRh7UN3xpQkg&s"}
          className="project-card-img"
        />
        <Card.Body>
          <Card.Title className='text-center'>{project.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <img
                src={project ? `${serverURL}/uploads/${project.projectImage}` : "https://media1.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif?cid=6c09b952ctryfyzr713c2eqb0kbfm1z62ylbe4v8xi4kbwcs&ep=v1_gifs_search&rid=giphy.gif&ct=g"}
                alt="Project"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h5>Description</h5>
              <p>{project.overview}</p>
              <h5>Technology Used</h5>
              <p><b>{project.language}</b></p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between w-100">
            <Button variant="dark" className="me-2">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <AiFillGithub className="icon" /> GitHub
              </a>
            </Button>
            <Button variant="dark" className="me-2">
              <a href={project.livelink} target="_blank" rel="noopener noreferrer">
                <FaLink className="icon" /> Live Link
              </a>
            </Button>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div><div>
      <style jsx="true">{`
        .project-card {
          width: 18rem;
          cursor: pointer;
          transition: transform 0.2s;
          margin-bottom: 1rem;
        }
        .project-card:hover {
          transform: scale(1.05);
        }
        .project-card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: filter 0.3s ease;
        }
        .project-card-img:hover {
          filter: blur(5px);
        }
        .modal-body .row {
          align-items: center;
        }
        .modal-body .col-md-6 h5 {
          margin-top: 1rem;
        }
        .icon {
          margin-right: 0.5rem;
        }
        .modal-footer .btn {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-footer .btn a {
          color: white;
          text-decoration: none;
        }
        .modal-footer .btn a:hover {
          text-decoration: underline;
        }
      `}</style>

      <Card className="project-card shadow-sm" onClick={handleShow}>
        <Card.Img
          variant="top"
          src={project ? `${serverURL}/uploads/${project.projectImage}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcK_PhJ0aQvWx8as9EY6LauPJGzo2l2nyRh7UN3xpQkg&s"}
          className="project-card-img"
        />
        <Card.Body>
          <Card.Title className='text-center'>{project.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <img
                src={project ? `${serverURL}/uploads/${project.projectImage}` : "https://media1.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif?cid=6c09b952ctryfyzr713c2eqb0kbfm1z62ylbe4v8xi4kbwcs&ep=v1_gifs_search&rid=giphy.gif&ct=g"}
                alt="Project"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h5>Description</h5>
              <p>{project.overview}</p>
              <h5>Technology Used</h5>
              <p><b>{project.language}</b></p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between w-100">
            <Button variant="dark" className="me-2">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <AiFillGithub className="icon" /> GitHub
              </a>
            </Button>
            <Button variant="dark" className="me-2">
              <a href={project.livelink} target="_blank" rel="noopener noreferrer">
                <FaLink className="icon" /> Live Link
              </a>
            </Button>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  )
}}

export default ProjectCard