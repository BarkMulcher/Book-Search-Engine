const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async () => {
            return User.find().populate('books');
        },
        users: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.find(params);
        },
        searchBooks: async () => {
            return Book.find().populate('books');
        }
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Password');
            }


            const token = signToken(user);
            return { token, user }
        },

        saveBook: async (parent, { userId, savedBooks}, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $addToSet: { savedBooks: savedBooks },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        deleteBook: async (parent, { userId, savedBooks }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { savedBooks: savedBooks } },
                    { new: true }

                )
            }

            throw new AuthenticationError('You need to be logged in!')
        }
    }
}

module.exports = resolvers;