import mongoose, { Schema, model } from "mongoose";

const EventSchema = new Schema({
    name: String,
    date: String,
    place: Object,
    // description: String,
    // people: Array<Object>,
    renter: Object,
    status: String,
    // additionals: Array<Object>,

})

export default mongoose.models.event || model('event', EventSchema);