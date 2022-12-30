import { faker } from "@faker-js/faker";

import { User } from "../../models/User.js";
export default async function seed(documentsCount = 1) {
  const docs = [];
  for (let i = 0; i <= documentsCount; i++) {
    docs.push({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: "$2b$10$AeipTdmwHU51uR/6q91WnuoGq0keqBF5YJIdleUn12ddIzV6HUdL.", // password
    });
  }
  try {
    console.log("Seeding users collection");
    const data = await User.insertMany(docs);
    console.log("users collection completed");
  } catch (error) {
    console.log(err);
    process.exit(1);
  }
}
