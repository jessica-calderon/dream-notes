const faker = require('faker');
const userSeeds = require("./userSeed.json");
const dreamSeeds = require("./dreamseed.json");
const db = require("../config/connection");
const { Dream, User } = require("../models");

db.once("open", async () => {
  try {
    await Dream.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < dreamSeeds.length; i++) {
      const { _id, dreamAuthor } = await Dream.create(dreamSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: dreamAuthor },
        {
          $addToSet: {
            dreams: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
