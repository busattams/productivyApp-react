import mongoose from "mongoose";

mongoose.set('debug', true);

const connectDB = () => {
   mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      keepAlive: true,
   });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', () => console.log(`********* MongoDB Connected at ${db.host}`));

   mongoose.Promise = Promise;
}

export default connectDB;