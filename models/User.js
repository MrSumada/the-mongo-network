const { Schema, model, Types } = require('mongoose');
const Thought = require('./Thought')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [ /.+@.+\..+/, 'that is not a valid email']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})


// My attempt to CASCADE the deleteUserByID to also delete the User's Thoughts.
UserSchema.post('remove', async function(res, next) {
    await Thought.deleteMany({ user_id: this._id }).exec();
    next();
});

const User = model('User', UserSchema);

module.exports = User;