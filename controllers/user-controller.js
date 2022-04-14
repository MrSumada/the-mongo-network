const { User } = require('../models');

const UserController = {
    getAllUser(req, res) {
        User.find({
            // .populate({
            //     path: 'friends'
            // })
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                path: 'thoughts'
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id'})
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    }
}

module.exports = UserController;