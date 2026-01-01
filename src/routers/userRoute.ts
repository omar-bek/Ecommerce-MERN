import express from "express"
import { login, register } from "../services/userService.js";

const router = express.Router()

router.post('/register', async (req, res) => {
    const { firstName, email, lastName, password } = req.body;
    const result = await register({
        firstName, email, lastName, password
    });
    res.status(result.statusCode).send(result.data);
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await login({
        email, password
    });
    res.status(result.statusCOde).send(result.data);
    
})



export default router;