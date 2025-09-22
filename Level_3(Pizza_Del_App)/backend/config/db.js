import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://yuvrajsingh001750_db_user:4uWajmI5NWkW1ghc@cluster0.guoqpg6.mongodb.net/Pizza-Del-App').then(() => console.log('DB connected sucessfully')
    )
}