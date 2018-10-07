const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.send('Message from the test router');
});

module.exports = router;
