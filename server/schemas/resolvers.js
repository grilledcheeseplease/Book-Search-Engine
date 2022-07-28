const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        async getSingleUser(parent, args) {
            const foundUser = await User.findOne({
                $or: [{ _id: user ? user._id : args.id }, { username: args.username }],
            });

            return foundUser;
        },
    },

    Mutation: {
        async createUser(parent, args) {
            const user = await User.create(args);

            const token = signToken(user);
            return { token, user };
        },

        async login(parent, args) {
            const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });

            const correctPw = await user.isCorrectPassword(args.password);

            const token = signToken(user);
            return { token, user };
        },

        async saveBook(parent, args) {
            console.log(user);
            
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: args } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            
        },

        async deleteBook(parent, args) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );
            return updatedUser;
        },
    }
};

module.exports = resolvers;