

const router = require('express').Router();
const  authorization = require('../../../security/utils')
const userController = require('../../../controllere/api/v1/users_controller');
// const {updateUser} = userController;
//UPDATE USER INFO
router.put('/:id',authorization.verifyToken,userController.updateUser)
router.delete('/:id',authorization.verifyToken,userController.deleteUser)
router.get("/:id",authorization.verifyToken,userController.getUserInfo)
router.put("/:id/follow",authorization.verifyToken,userController.followUser)
router.put("/:id/unfollow",authorization.verifyToken,userController.unfollowUser)

module.exports = router;