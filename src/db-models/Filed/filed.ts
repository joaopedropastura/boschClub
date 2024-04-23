import { Schema, model } from "mongoose";



const FieldSchema = new Schema({
    name: String,
    type: String,
    description: String,
    price: Number,
    maxPeople: Number,
})

export default model('field', FieldSchema)
