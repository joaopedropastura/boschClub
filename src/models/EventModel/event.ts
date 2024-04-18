import { Schema, model } from "mongoose";

const EventSchema = new Schema({
    name: String,
    date: Date,
    place: Object,
    description: String,
    people: Array<Object>,
    renter: Object,
    additionals: Array<Object>,

})

export default model('event', EventSchema)