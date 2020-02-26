// post.routes.js

const express = require('express');
const router = express.Router();
const Products = require('../models/Products.model');


router.get('/products', async (req, res) => {
  try {
    res.json(await Products.find());
  }
  catch(err) {
    res.status(500).json(err)
  }
});

router.get('/products/random', async (req, res) => {

  try {
    const count = await Products.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Products.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.json(err);
  }

});

router.get('/products/:id', async (req, res) => {

  try {
    const dep = await Products.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json(err);
  }

});

router.post('/products', async (req, res) => {

  try {

    const { name, client } = req.body;
    const newProducts = new Products({ name: name, client: client });
    await newProducts.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json(err);
  }

});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;

  try {
    const dep = await(Products.findById(req.params.id));
    if(dep) {
      await Products.updateOne({ _id: req.params.id }, { $set: { name: name, client: client }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json(err);
  }

});

router.delete('/products/:id', async (req, res) => {

  try {
    const dep = await(Products.findById(req.params.id));
    if(dep) {
      await Products.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json(err);
  }

});

module.exports = router;
