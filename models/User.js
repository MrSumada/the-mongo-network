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

const User = model('User', UserSchema);

UserSchema.pre('deleteMany', function(next) {
    // var user = this;/
    Thought.deleteMany({ _id: this.thoughts._id }).exec();
    next();
});

module.exports = User;