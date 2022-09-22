const router = require('express').Router()
const { police_check } = require('../../middleware')
const tagContrroller = require('./controller')

router.post('/tags',
    police_check('create', 'Tag'),
    tagContrroller.store)
router.get('/tags', tagContrroller.index)

router.put('/tags/:id',
    police_check('update', 'Tag'),
    tagContrroller.update)

router.delete('/tags/:id',
    police_check('delete', 'Tag'),
    tagContrroller.destroy)

module.exports = router