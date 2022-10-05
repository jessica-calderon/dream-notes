const faker = require("faker");

const db = require("../config/connection");
const { Dream, User } = require("../models");
const userSeeds = require("./userSeed.json");
const dreamSeeds = require("./Dreamseed.json");
db.once("open", async () => {
  await Dream.deleteMany({});
  await User.deleteMany({});
  await User.create(userSeeds);
  const userData = [];
  for (let i = 0; i < dreamSeeds.length; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  for (let i = 0; i < 100; i = +1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(
        Math.random() * createdUsers.ops.length
      );
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updatedOne(
      { _id: userId },
      { $addToSet: { friends: friendId } }
    );
  }

  let createdDreams = [];
  for (let i = 0; i < 100; i += 1) {
    const dreamText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdDreams = await Dream.create({ dreamText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { dreams: createdDreams._id } }
    );
    createdDreams.push(createdDream);
  }
  for (let i = 0; i < 100; i += 1) {
    const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomDreamIndex = Math.floor(Math.random() * createdDreams.length);
    const { _id: dreamId } = createdDreams[randomDreamIndex];

    await Dream.updateOne(
      { _id: dreamId },
      { $push: { comments: { commentBody, username } } },
      { runValidators: true }
    );
  }
  console.log("all done!");
  process.exit(0);
});

// const faker = require('faker');
// const userSeeds = require("./userSeed.json");
// const dreamSeeds = require("./dreamseed.json");
// const db = require("../config/connection");
// const { Dream, User } = require("../models");

// db.once("open", async () => {
//   try {
//     await Dream.deleteMany({});
//     await User.deleteMany({});

//     await User.create(userSeeds);

//     for (let i = 0; i < dreamSeeds.length; i++) {
//       const { _id, dreamAuthor } = await Dream.create(dreamSeeds[i]);
//       const user = await User.findOneAndUpdate(
//         { username: dreamAuthor },
//         {
//           $addToSet: {
//             dreams: _id,
//           },
//         }
//       );
//     }
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }

//   console.log("all done!");
//   process.exit(0);
// });
