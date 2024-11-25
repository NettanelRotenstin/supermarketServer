import request from 'supertest';
import { app, server, io } from '../app';
import mongoose from 'mongoose';


beforeAll(async () => {

})
describe("ping route", () => {
    test("should return pong", async () => {
        const response = await request(app).get("/ping");
        expect(response.status).toBe(200);
        expect(response.text).toBe("pong");
    });

});

// describe("users router", () => {
//     let token: string;
//     let userId: string;
//     test("should handle successful registration", async () => {
//         const response = await request(app)
//             .post("/api/users/register")
//             .send({ username: "testuser", password: "password" });
//         expect(response.status).toBe(201);
//     })
//     test("should return user data on successful login", async () => {
//         const response = await request(app)
//             .post("/api/users/login")
//             .send({ username: "testuser", password: "password" });
//         token = response.body.token;
//         userId = response.body.data._id;
//         expect(response.status).toBe(200);
//         expect(response.body.success).toBe(true);
//         expect(token).toBeDefined();
//         expect(userId).toBeDefined();
//     });
//     test("should remove user from database", async () => {
//         const response = await request(app)
//             .delete("/api/users/delete/" + userId)
//             .send({ username: "testuser", password: "password" }).set("Authorization", token);
//         expect(response.status).toBe(200);
//     })
// });

// סגירת כל החיבורים אחרי הטסטים
afterAll((done) => {
    mongoose.connection.close();
    io.close();  // סגירת חיבור הסוקט
    server.close(done);  // סגירת השרת
});
