import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import connectDB from './config/database.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import categoryRoutes from './routes/categoryRoutes.js';
import taskRoutes from './routes/taskRoutes.js'


dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
connectDB();

if(process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

// ROUTES
app.use('/api/category', categoryRoutes)
app.use('/api/tasks', taskRoutes)


app.get('/', (req, res) => res.send('API is running'));




// ERRORS
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
   console.log(`********* SERVER RUNNING IN ${process.env.NODE_ENV} mode on port ${process.env.PORT} *********`);
});


