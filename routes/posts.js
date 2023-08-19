const router = require("express").Router();
const User = require("../models/user")
const Post = require("../models/posts")

//create new post
router.post("/", async (req, res) => {
   const newPost = new Post(req.body);
   try {
     const SavedPost = await newPost.save()
     res.status(200).json(SavedPost);
    } catch (err) {
    res.status(500).json(err);
  } 
});

//update post 
router.put("/:id", async (req,res) => {
try {
  const post = await Post.findById(req.params.id)
  if(post.username === req.body.username) {
    try {
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id, 
    {
      $set: req.body,
  },
   { new: true }
   );
   res.status(200).json(updatedPost)
  } catch (err) {
    res.status(500).json(err)
  }    
  }else{
    res.status(401).json("You can only update your post")
  }
} catch (err) {
  res.status(500).json(err)
}
})


//delete post 
router.delete("/:id", async (req,res) => {
  try {
    const post = await Post.findById(req.params.id)
    if(post.username === req.body.username) {
      try {
      await post.deleteOne()
      res.status(200).json("post has been deleted")
    } catch (err) {
      res.status(500).json({ message: err})
    }    
    }else{
      res.status(401).json("You can only delete your post")
    }
  } catch (err) {
    res.status(500).json({ message: err}); 
  }
  })

//get post
router.get("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err);
    }
})

//get All posts
router.get("/", async (req,res) => {
  const username = req.query.user
  const catName = req.query.cat;
  try {
      let posts;
      if (username){
        posts = await Post.find({username})  
      } else if(catName){
        posts = await Post.find({
        categories:{
        $in: [catName],
        },})
      } else {
        posts = await Post.find()
      }
      res.status(200).json(posts)
  } catch (err) {
      res.status(500).json(err);
  }
})

module.exports = router;