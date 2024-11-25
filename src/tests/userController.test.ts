import request from 'supertest';
import { app, io, server } from '../app';  // יש להתאים לפי המבנה של הפרויקט שלך
import mongoose from 'mongoose';
import userModel from '../models/userModel';
import 'dotenv/config';

const testUser = {
  username: "testuser",
  password: "Test123!",
  creditCard: "4580-1234-5678-9012"
};

let token: string;
let userId: string;


beforeEach(async () => {
  await userModel.deleteOne({ username: testUser.username });
});

describe("User API Routes", () => {
  
  describe("POST /api/users/register", () => {
    test("should successfully register new user", async () => {
      const response = await request(app)
        .post("/api/users/register")
        .send(testUser);
      
      expect(response.status).toBe(201);
      expect(response.body.err).toBe(false);
      expect(response.body.msg).toBe("user created succesfull");
      expect(response.body.data.username).toBe(testUser.username);
      expect(response.body.data.password).not.toBe(testUser.password); // וידוא שהסיסמה מוצפנת
    });

    test("should fail when missing required fields", async () => {
      const response = await request(app)
        .post("/api/users/register")
        .send({ username: "testuser" });
      
      expect(response.status).toBe(400);
      expect(response.body.err).toBe(true);
    });
  });

  describe("POST /api/users/login", () => {
    beforeEach(async () => {
      // יצירת משתמש לפני בדיקת ההתחברות
      await request(app)
        .post("/api/users/register")
        .send(testUser);
    });

    test("should login successfully with correct credentials", async () => {
      const response = await request(app)
        .post("/api/users/login")
        .send({
          username: testUser.username,
          password: testUser.password
        });

      expect(response.status).toBe(201);
      expect(response.body.err).toBe(false);
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.username).toBe(testUser.username);
      
      token = response.body.data.token;
      userId = response.body.data._id;
    });

    test("should fail with incorrect password", async () => {
      const response = await request(app)
        .post("/api/users/login")
        .send({
          username: testUser.username,
          password: "wrongpassword"
        });

      expect(response.status).toBe(400);
      expect(response.body.err).toBe(true);
    });
  });

  describe("POST /api/users/profile", () => {
    beforeEach(async () => {
      // יצירת משתמש והתחברות לפני בדיקת הפרופיל
      await request(app)
        .post("/api/users/register")
        .send(testUser);
      
      const loginRes = await request(app)
        .post("/api/users/login")
        .send({
          username: testUser.username,
          password: testUser.password
        });
      
      token = loginRes.body.data.token;
    });

    test("should get user profile with valid token", async () => {
      const response = await request(app)
        .post("/api/users/profile")
        .set('Authorization', token)
        .send({ username: testUser.username });

      expect(response.status).toBe(200);
      expect(response.body.err).toBe(false);
      expect(response.body.data.username).toBe(testUser.username);
      expect(response.body.data.carts).toBeDefined();
    });

    test("should fail with invalid token", async () => {
      const response = await request(app)
        .post("/api/users/profile")
        .set('Authorization', 'invalid-token')
        .send({ username: testUser.username });

      expect(response.status).toBe(400);
    });
  });

  describe("POST /api/users/verify", () => {
    beforeEach(async () => {
      // יצירת משתמש והתחברות לפני בדיקת האימות
      await request(app)
        .post("/api/users/register")
        .send(testUser);
      
      const loginRes = await request(app)
        .post("/api/users/login")
        .send({
          username: testUser.username,
          password: testUser.password
        });
      
      token = loginRes.body.data.token;
      userId = loginRes.body.data._id;
    });

    test("should auto-verify user with valid token", async () => {
      const response = await request(app)
        .post("/api/users/verify")
        .set('Authorization', token);

      expect(response.status).toBe(201);
      expect(response.body.err).toBe(false);
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data._id).toBe(userId);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  io.close();
  server.close();
});