import mongoose, { Schema, model } from "mongoose";


const partyPlaceSchema = new Schema({
    name: String,
    maxPeople: Number,
    
})


export default mongoose.models.partyplace || model('partyplace', partyPlaceSchema)