import env from "./env/variables.js";
import http from "http";
import { app } from "./app.js";
import { connectDB } from "./db/db.config.js";

const server = http.createServer(app);

const PORT = env.PORT;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});

// For testing

// Route: http://localhost:5000/api/v1/auth/register
// Method: POST
/* 
Body: 
{
    "name": "",
    "email": "",
    "password": "",
    "phone": "",
    "role": "student"    
}
*/

// Route: http://localhost:5000/api/v1/auth/login
// Method: POST
/* 
Body: 
{
    "email": "",
    "password": ""
}
*/
