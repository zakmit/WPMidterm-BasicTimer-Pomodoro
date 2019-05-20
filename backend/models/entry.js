const mongoose = require('mongoose');
const uri = "your database address";
const db = mongoose.connect(uri, {useNewUrlParser: true});

const entrySchema = mongoose.Schema({
    user: String,
    title: String,
    startTime: Date,
    endTime: Date,
    elapse: Number,
    isPomodoro: Boolean
});

module.exports = mongoose.model('Entry', entrySchema);
