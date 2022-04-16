const router = require('express').Router();
const { getAllThoughts, postNewThought, getThoughtById, updateThought, deleteThought, postNewReaction, deleteReaction } = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(postNewThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .put(postNewReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;