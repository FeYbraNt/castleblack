const { Router } = require("express");
const router = Router();

router.get("/health", function(req, res) {
  res.body = "Up and running";
  // QUESTION: why this endpoint blocks the app?
  // ANSWER: An HTTP request needs to send a message and there's none
});

module.exports = router;
