// 1. Import express
const express = require('express');

// 2. Import controllers and middleware
const UserController = require('../Controllers/UserController');
const ProjectController = require('../Controllers/ProjectController');
const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const multerConfig = require('../Middlewares/multerMiddleware');

// 3. Create Router object to define paths
const router = express.Router();

// 4. Register API call
router.post('/register', UserController.register);

// 5. Login API call
router.post('/login', UserController.login);

// 6. Add project API call
router.post(
  '/project/add-project',
  jwtMiddleware,
  multerConfig.single('projectImage'),
  ProjectController.addProject
);

// 7. Get a particular project details API
router.get(
  '/project/get-auser-project',
  jwtMiddleware,
  ProjectController.getAProject
);

// 8. Get 3 project details for home projects
router.get('/project/home-project', ProjectController.getHomeProjects);

// 9. Get all project details
router.get(
  '/project/all-user-project',
  jwtMiddleware,
  ProjectController.getAllUsersProjects
);

// 10. Delete user project
router.delete(
  '/project/delete-user-project/:pid',
  jwtMiddleware,
  ProjectController.deleteUserProject
);

// 11. Update user project
router.put(
  '/project/update-user-project/:pid',
  jwtMiddleware,
  multerConfig.single('projectImage'),
  ProjectController.updateUserProjects
);

// 12. My profile API call
router.post(
  '/project/addprofile-project',
  jwtMiddleware, // Middleware for JWT authentication
  multerConfig.single('profile'), // Middleware for handling file uploads (assuming using multer)
  UserController.addProfile // Controller function for adding a profile to a project
);

module.exports = router;