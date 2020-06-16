const express = require('express');
const router = express.Router();

const Products = require('../model/Product');

router.get('', (req, res, next) => {
  Products.find().then((products) => {
    res.status(200).json({ products });
  });
});

router.get('/:id', (req, res, next) => {
  Products.findById(req.params.id).then((product) => {
    res.status(200).json({ product });
  });
});

router.post('', (req, res, next) => {
  const { name, description, color, quantity, cost } = req.body;
  const product = new Products({ name, description, color, quantity, cost });
  product.save().then(() => {
    res.status(201).json({ message: 'Product added' });
  });
});

router.put('/:id', (req, res, next) => {
  const { name, description, color, quantity, cost } = req.body;
  Products.updateOne(
    { _id: req.params.id },
    { name, description, color, quantity, cost }
  ).then(() => {
    res.status(204).json({ message: 'Product updated' });
  });
});

router.delete('/:id', (req, res, next) => {
  Products.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({ message: 'Product deleted' });
  });
});

module.exports = router;
