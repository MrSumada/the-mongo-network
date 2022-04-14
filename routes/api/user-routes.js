const router = require('express').Router();

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);