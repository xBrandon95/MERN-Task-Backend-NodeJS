const { Router } = require('express');
const { check } = require('express-validator');

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const auth = require('../middleware/auth');

const router = Router();
// api/projects

// create projects
router.post(
  '/',
  auth,
  [check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()],
  createProject,
);

// get projects
router.get('/', auth, getProjects);

// update project
router.put(
  '/:id',
  auth,
  [check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()],
  updateProject,
);

// delete project
router.delete('/:id', auth, deleteProject);

module.exports = router;
