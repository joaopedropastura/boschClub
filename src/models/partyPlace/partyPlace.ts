import { Schema, model } from "mongoose";


const partyPlaceSchema = new Schema({
    name: String,
    maxPeople: Number,
    
})


export default model('partyplace', partyPlaceSchema)