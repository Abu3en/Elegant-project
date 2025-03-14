const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    person: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;