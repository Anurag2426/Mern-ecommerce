import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/authRoute.js';
import connectDB from './config/db.js';
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from "./routes/productRoutes.js";
const app = express();
// Configure environment variables
dotenv.config();

// Connect to the database
connectDB();



// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/category",categoryRoutes)
app.use('/api/v1/product',productRoutes)

// rest api
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to ecommerce app</h1>")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});