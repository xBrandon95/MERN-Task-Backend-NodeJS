const { Router } = require('express');
const { check } = require('express-validator');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = Router();
// api/projects

// create projects
router.post(
  '/',
  auth,
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('project', 'El proyecto es obligatorio').not().isEmpty(),
  ],
  createTask,
);

// get tasks by project
router.get('/', auth, getTasks);

// update task
router.put('/:id', auth, updateTask);

// delete task
router.delete('/:id', auth, deleteTask);

module.exports = router;
