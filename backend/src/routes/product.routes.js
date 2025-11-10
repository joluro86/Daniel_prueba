const { Router } = require('express');
const p = require('../controllers/product.controller');
const router = Router();

router.get('/', p.getAll);
router.get('/:id', p.getOne);
router.post('/', p.create);
router.put('/:id', p.update);
router.delete('/:id', p.remove);

module.exports = router;
