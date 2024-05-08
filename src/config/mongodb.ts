
import mongoose  from 'mongoose'


export default async function connectMongoDB () {
    try {
        await mongoose.connect(process.env.MONGO_URL as string, {                
        });
        console.log('Connected to MongoDB');
    } catch (error : any) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}