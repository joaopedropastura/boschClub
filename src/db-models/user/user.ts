import mongoose, { Schema, model } from "mongoose";


const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    edv: String
})

export default mongoose.models.user || model('user', UserSchema)  ;