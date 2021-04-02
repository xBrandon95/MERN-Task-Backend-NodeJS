const { validationResult } = require('express-validator');
const Project = require('../models/Project');
const Task = require('../models/Task');

// create new task
exports.createTask = async (req, res) => {
  // check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Extract the project and verify that it exists
    const project = await Project.findById(req.body.project);

    if (!project) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    // check creator project
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    // create task
    const task = new Task(req.body);
    await task.save();

    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }

  console.log('hello');
};

// get tasks by project
exports.getTasks = async (req, res) => {
  try {
    // Extract the project and verify that it exists
    const project = await Project.findById(req.body.project);

    if (!project) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    // check creator project
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    // get tasks by project
    const tasks = await Task.find({ project: req.body.project });

    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// update task
exports.updateTask = async (req, res) => {
  try {
    const { project, name, state } = req.body;
    // task exists
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'No existe esa tarea ' });
    }

    // Extract the project and verify that it exists
    const projectExist = await Project.findById(project);

    // check creator project
    if (projectExist.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    // create new Task
    const newTask = {};
    if (name) newTask.name = name;
    if (state) newTask.state = state;

    // save task
    task = await Task.findByIdAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });

    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// delete task
exports.deleteTask = async (req, res) => {
  try {
    const { project } = req.body;

    // task exists
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'No existe esa tarea ' });
    }

    // Extract the project and verify that it exists
    const projectExist = await Project.findById(project);

    // check creator project
    if (projectExist.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    // Eliminar
    await Task.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: 'Tarea eliminada' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};
