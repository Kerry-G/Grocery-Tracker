var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Receipts = require('../models/Receipts.js');

/* GET receipts listing. */
router.get('/', function(req, res, next) {
  Receipts.find((err,receipts)=>{
    if (err) return next(err);
    res.json(receipts);
  })
});

/* POST /receipts */
router.post('/', function(req, res, next) {
  console.log(req.body)
  var receipts = ({
    name: req.body.name,
    type: req.body.type,
    amount:req.body.amount,
    date: req.body.date
  })
  Receipts.create(receipts, (err, receipts) => {
    if (err) return next(err);
    res.json(receipts);
  });
});

/* GET /receipts/id */
router.get('/:id', (req, res, next) => {
  Receipts.findById(req.params.id, (err, receipts) => {
    if (err) return next(err);
    res.json(receipts);
  });
});

/* PUT /receipts/:id */
router.put('/:id', (req, res, next) => {
  Receipts.findByIdAndUpdate(req.params.id, req.body, (err, receipts) => {
    if (err) return next(err);
    res.json(receipts);
  });
});

/* DELETE /receipts/:id */
router.delete('/:id', (req, res, next) => {
  Receipts.findByIdAndRemove(req.params.id, req.body,  (err, receipts) => {
    if (err) return next(err);
    res.json(receipts);
  });
});

module.exports = router;
