import mongoose from 'mongoose';

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);

        console.log(`DB is connected on ${conn.connection.host}`);

    } catch (error) {
        
        console.log('failed to connect DB :', error);   
    }

}

export default connectDB;