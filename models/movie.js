var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var MovieSchema = new Schema({
    name: { type: String },
    picUrl: { type: String },
    seats: { type: Array },
    star: {type: Number },
});

module.exports = mongoose.model('Movie',MovieSchema);