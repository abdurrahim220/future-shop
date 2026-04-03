import { connectTestDB, clearTestDB, closeTestDB } from "./testDB";

process.env.JWT_SECRET = "test_secret";

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await closeTestDB();
});
