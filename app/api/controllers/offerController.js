const offerModel = require("../models/offer");
module.exports = {
  getById: function (req, res, next) {
    console.log(req.body);
    offerModel.findById(req.params.offerId, function (err, offerInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          data: { offer: offerInfo },
        });
      }
    });
  },
  getAll: function (req, res, next) {
    let offerList = [];
    offerModel.find({}, function (err, offers) {
      if (err) {
        next(err);
      } else {
        for (let offer of offers) {
          offerList.push({
            id: offer._id,
            name: offer.name,
            description: offer.description,
            category: offer.category,
          });
        }
        res.json({
          status: "success",

          data: { offers: offerList },
        });
      }
    });
  },
  updateById: function (req, res, next) {
    offerModel.findByIdAndUpdate(
      req.params.offerId,
      { name: req.body.name },
      function (err, offerInfo) {
        if (err) next(err);
        else {
          res.json({
            status: "success",
            message: "offer updated successfully!!!",
            data: null,
          });
        }
      }
    );
  },
  deleteById: function (req, res, next) {
    offerModel.findByIdAndRemove(req.params.offerId, function (err, offerInfo) {
      if (err) next(err);
      else {
        res.json({
          status: "success",
          message: "offer deleted successfully!!!",
          data: null,
        });
      }
    });
  },
  create: function (req, res, next) {
    offerModel.create(
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
      },
      function (err, result) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "offer added successfully!!!",
            data: null,
          });
      }
    );
  },
};
