const { Router } = require('express');
const {login, deletePedido} = require('../controllers/index')  
const { getPedidos} = require('../controllers/index')
const router = Router();

// Ejemplo: router.use('/auth', authRouter);
router.post("/login", login)
router.post("/getPedidos", getPedidos)
router.post("/deletePedidos", deletePedido)




module.exports = router;
