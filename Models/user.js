import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = Schema({
    first_name: {
        type: String,
        // required: true
    },
    last_name: String,
    email: {
        type: String,
        // required: true,
        max: 255
    },
    password: {
        type: String,
        // required: true,
        max: 1024,
        min: 6
    }
});

const User = mongoose.model('User', userSchema)

export default User;