const router = require('express').Router()
const { police_check } = require('../../middleware/index')
const deliveryAddressController = require('./controller')

router.post('/delivery-address',
    police_check('create', 'DeliveryAddress'),
    deliveryAddressController.store
)
router.get('/delivery-address',
police_check('view', 'DeliveryAddress'),
deliveryAddressController.index)

router.put('/delivery-address/:id',
    police_check('update', 'DeliveryAddress'),
    deliveryAddressController.update
)

router.delete('/delivery-address/:id',deliveryAddressController.destory)

module.exports = router