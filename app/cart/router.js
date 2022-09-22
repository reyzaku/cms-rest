const router = require('express').Router()
const { police_check } = require('../../middleware/index')
const cartController = require('./controller')

router.put('/carts',
   
    cartController.update
)

router.get('/carts',
    police_check('read', 'Cart'),
    cartController.index
)

module.exports = router