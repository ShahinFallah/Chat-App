import mongoose from 'mongoose';

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);

        console.log(`DATABASE is connected on ${conn.connection.host}`);

    } catch (error) {
        
        console.log('failed to connect DB :', error);
        process.exit(1);
    }

}

export default connectDB;