import express from 'express'
import * as NewsController  from '../controllers/news.control'
const router = express.Router();

router.post('/news/new-post',NewsController.createNewPost)
router.get('/news/get-all',NewsController.getAllPost)
router.get('/news/get-by-id/:id',NewsController.getDetailPost);
router.get('/news/get-by-slug/:slug',NewsController.getDetailPostBySlug)
router.patch('/news/edit-post',NewsController.editPost);
router.delete('/news/delete-post/:id',NewsController.deletePost);

export default router
