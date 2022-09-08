const router = require('express').Router();
const { application } = require('express');
const v1 = require('./v1');

router.use('/v1',v1);

module.exports = router;