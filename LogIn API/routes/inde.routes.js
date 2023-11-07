const { Router } = require('express');
const {login} = require('../controllers/index')  
const router = Router();

// Ejemplo: router.use('/auth', authRouter);
router.post("/login", login)




module.exports = router;
