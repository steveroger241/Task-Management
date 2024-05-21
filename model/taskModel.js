const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true },
    task: [{
        taskid: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
        heading: { type: String, trim: true },
        description: { type: String, trim: true },
        completed: { type: Boolean, default: false }
    }]
}, { timestamps: true })

const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;