const express = require("express")
const router = express.Router()
const Post = require("../models/Post")
const verifyToken = require("../verifyToken")


// ================POST ROUTES============




// CREATE
router.post('/create', verifyToken, async (req, res) => {
    try {

        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }
})



//UPDATE
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(500).json(err)
    }
})


//DELETE
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json('Post has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})

// 2:33:20



// GET & SEARCH POSTS
router.get('/', async (req, res) => {
    const query = req.query
    try {
        //search method
        const searchFilter = {
            title: { $regex: query.search, $options: "i" }, // $options: "i" it will search irrespective of the sentences case
        }
        const posts = await Post.find(query.search ? searchFilter : null).sort({ createdAt: -1 });
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err);
    }
})




//GET POST DETAIL
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err);
    }
})



//GET USER POSTS 
router.get("/user/:userId", async (req, res) => {
    try {

        const posts = await Post.find({ userId: req.params.userId })
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err);
    }
})



// //GET POST CATEGORIES
// router.get('/:postId/categories', async (req, res) => {
//     try {
//         const postId = req.params.postId;
//         const post = await Post.findById(postId).populate('categories')
//         if (!post) {
//             return res.status(404).json({ message: 'Post not found' })
//         }
//         res.status(200).json(post.categories);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })



//2: 08: 27
module.exports = router;