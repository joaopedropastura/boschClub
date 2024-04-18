import { Schema, model } from "mongoose";


const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    edv: String
})

export default model('user', UserSchema)