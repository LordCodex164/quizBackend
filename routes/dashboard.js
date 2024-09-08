const express = require("express");
const { isAuth } = require("../middleware/auth");
const router = express.Router();
const {dashboard} = require("../controllers/auth");

router.get("/", isAuth, dashboard);

module.exports = router;