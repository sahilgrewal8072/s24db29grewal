var Instrument = require("../models/instrument");

// List of all instrument
exports.instrument_list = async function (req, res) {
  try {
    theInstrument = await Instrument.find();
    res.send(theInstrument);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// VIEWS
// Handle a show all view
exports.instrument_view_all_Page = async function (req, res) {
  try {
    theInstrument = await Instrument.find();
    res.render("instrument", {
      title: "Instrument Search Results",
      results: theInstrument,
    });
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// for a specific Instrument.
exports.instrument_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: Instrument detail: " + req.params.id);
};

// Handle instrument create on POST.
exports.instrument_create_post = async function (req, res) {
    console.log(req.body);
    let document = new Instrument();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"instrument_name":"Trumpet", "category":"Brass", "price":800}
  
    document.instrument_name = req.body.instrument_name;
    document.category = req.body.category;
    document.price = req.body.price;
    try {
      let result = await document.save();
      res.send(result);
    } catch (err) {
      res.status(500);
      res.send(`{"error": ${err}}`);
    }
  };

// Handle Instrument delete from on DELETE.
exports.instrument_delete = function (req, res) {
  res.send("NOT IMPLEMENTED: Instrument delete DELETE " + req.params.id);
};
// Handle Instrument update form on PUT.
exports.instrument_update_put = function (req, res) {
  res.send("NOT IMPLEMENTED: Instrument update PUT" + req.params.id);
};
