const mongoose = require("mongoose");
const instrumentSchema = mongoose.Schema({
    instrument_name: String,
    category: String,
    price: Number
});
module.exports = mongoose.model("Instrument", instrumentSchema);