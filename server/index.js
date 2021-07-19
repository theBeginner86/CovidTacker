import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authenticate.js';

const app = express();

app.use(express.urlencoded({
    extends: true
}));

app.use(cors());

app.use("/startup", authRoutes);

app.get("/", async (req,res) => {
    res.write('This is a MERN stack project to track covid 19');
    res.send();
})

app.listen(5000, () => {
    console.log("Listening at 5000.")
})