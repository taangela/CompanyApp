const express = require('express');
const router = express.Router();
const Employees = require('../models/Employees.model');


router.get('/employees', async (req, res) => {
  try {
    res.json(await Employees.find().populate('department'));
  }
  catch(err) {
    res.status(500).json(err)
  }
});

router.get('/employees/random', async (req, res) => {

  try {
    const count = await Employees.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employees.findOne().populate('department').skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.json(err);
  }

});

router.get('/employees/:id', async (req, res) => {

  try {
    const dep = await Employees.findById(req.params.id).populate('department');
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json(err);
  }

});

router.post('/employees', async (req, res) => {

  try {

    const { firstName, lastName, department  } = req.body;
    const newEmployees = new Employees({ firstName: firstName, lastName: lastName, department: department });
    await newEmployees.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json(err);
  }

});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department  } = req.body;

  try {
    const dep = await(Employees.findById(req.params.id));
    if(dep) {
      await Employees.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName: lastName, department: department }});
      res.json(await Employees.find().populate('department'));
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json(err);
  }

});

router.delete('/employees/:id', async (req, res) => {

  try {
    const dep = await(Employees.findById(req.params.id));
    if(dep) {
      await Employees.deleteOne({ _id: req.params.id });
      res.json(await Employees.find().populate('department'));
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json(err);
  }

});

module.exports = router;
