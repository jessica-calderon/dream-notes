const { User, Dream } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("dreams")
          .populate("friends");

        return userData;
      }

      throw new AuthenticationError("Not Logged In");
    },

    users: async () => {
      return User.find()
        .select("-__v - password")
        .populate("dreams")
        .populate("friends");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("dreams");
    },
    dreams: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Dream.find(params).sort({ createdAt: -1 });
    },
    dream: async (parent, { _id }) => {
      return Dream.findOne({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },

    addDream: async (parent, args, context) => {
      if (context.user) {
        const dream = await Dream.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { dreams: dream._id } },
          { new: true }
        );
        const token = signToken(dream);

        return { token, dream };
      }
      throw new AuthenticationError("You need to be logged in");
    },
    addComment: async (parent, { dreamId, commentBody }, context) => {
      if (context.user) {
        const updatedDream = await Dream.findOneAndUpdate(
          { _id: dreamId },
          {
            $push: {
              comments: { commentBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedDream;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
