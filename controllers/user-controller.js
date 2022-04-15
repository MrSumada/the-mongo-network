const { User } = require('../models');

const UserController = {
    getAllUsers(req, res) {
        User.find({})
        .populate ({
            path: 'friends'
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
    },
    postNewUser(req, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(dbUserData))
    },
    updateUserById({ params}, res) {
        User.findOneAndUpdate({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id'})
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    },
    deleteUserById({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .remove('thoughts') // Check that this is working correctly
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id'})
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: { friendId: params.friendId }}}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id'})
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    },
    deleteFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId},
            { $pull: { friends: { friendId: params.friendId }}}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no user found with this id'})
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
    }
}

module.exports = UserController;