const router = require('express').Router();

const  authorization = require('../../../security/utils')
const postController = require("../../../controllere/api/v1/posts_controller");

router.post("/newPost",authorization.verifyToken,postController.createPost);
router.put("/:id",authorization.verifyToken,postController.updatePost);
router.delete("/postId/:id",authorization.verifyToken,postController.deletePost);
//router.get("/:id",authorization.verifyToken, postController.getPost);
router.get("/allPosts", authorization.verifyToken,postController.getAllPostsFromDatabase);

module.exports = router;