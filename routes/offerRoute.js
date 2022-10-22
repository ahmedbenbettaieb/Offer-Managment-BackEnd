const express = require("express");
const router = express.Router();
const offerController = require("../app/api/controllers/offerController");
router.get("/", offerController.getAll);
router.post("/", offerController.create);
router.get("/:offerId", offerController.getById);
router.put("/:offerId", offerController.updateById);
router.delete("/:offerId", offerController.deleteById);
module.exports = router;
