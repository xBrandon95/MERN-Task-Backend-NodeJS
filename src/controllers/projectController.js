const { validationResult } = require('express-validator');
const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  // check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Create new Project
    const project = new Project(req.body);

    // Save creator - JWT
    project.creator = req.user.id;

    // Save Project
    await project.save();

    res.json(project);
  } catch (error) {
    console.log(error);
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ creator: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (error) {
    console.log(error);
  }
};

exports.updateProject = async (req, res) => {
  // check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // extract info project
  const { name } = req.body;
  const newProject = {};

  if (name) {
    newProject.name = name;
  }

  try {
    // check id Project
    let project = await Project.findById(req.params.id);

    // project exist
    if (!project) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    // check creator project
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    // update
    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true },
    );

    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    // check id Project
    const project = await Project.findById(req.params.id);

    // project exist
    if (!project) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    // check creator project
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    // Delete project
    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Proyecto Eliminado' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error en el servidor');
  }
};
