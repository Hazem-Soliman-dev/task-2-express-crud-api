import express from "express";
import productsRoute from './productsRoute.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', productsRoute);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});