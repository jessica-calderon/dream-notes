const { Schema, model } = require("mongoose");
const commentSchema = require("./Comment");
const dateFormat = require("../utils/dateFormat");

const dreamSchema = new Schema(
  {
    dreamText: {
      type: String,
      required: "You forgot to enter your Dream!",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

commentSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const Dream = model("Dream", dreamSchema);

module.exports = Dream;
