const express = require('express');
const router = express.Router();

router.use(require('../routes/viewAllDepts'));
router.use(require('./viewAllEmps'));
router.use(require('./viewAllRoles'));
router.use(require('./addDept'));
router.use(require('./addEmp'));
router.use(require('./addRole'));
router.use(require('./updateEmpRole'));


module.exports = router;