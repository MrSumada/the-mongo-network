const router = require('express').Router();
const { getAllUsers, postNewUser, getUserById, updateUserById, deleteUserById, addFriend, deleteFriend } = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(postNewUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById)

router
    .route('/:userId/friends/:friendId')
    // check if findOneAnd Update works for these
    .post(addFriend)
    .delete(deleteFriend)