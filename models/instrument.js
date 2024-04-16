const mongoose = require("mongoose");
const instrumentSchema = mongoose.Schema({
    instrument_name: { 
        type: String, 
        enum: ['Piano', 'Guitar','Drums'], 
        required: function() { 
            return this.instrument_name;
        }
    },
    category: String,
    price: {
        type: Number,
        required: true,
        min: [0],
        max: [500000]
    }
});
module.exports = mongoose.model("Instrument", instrumentSchema);