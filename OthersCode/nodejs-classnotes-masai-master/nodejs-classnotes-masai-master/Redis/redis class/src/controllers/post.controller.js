const express = require("express");

const Post = require("../models/post.model");

const redis = require("../configs/redis");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    const posts = await Post.find().lean().exec();

    redis.set("allPosts", post._id.toString(), JSON.stringify(posts));

    return res.status(201).send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    redis.get("allPosts", async function (err, fetchedPosts) {
      if (err) return res.status(500).send({ message: err.message });
      if (fetchedPosts)
        return res
          .status(200)
          .send({ posts: JSON.parse(fetchedPosts), redis: true });

      const posts = await Post.find().lean().exec();
      redis.set("allPosts", JSON.stringify(posts));

      return res.status(200).send({ posts, redis: false });
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // posts.620e26e3016519842f847e6f
    redis.get(`posts.${req.params.id}`, async function (err, fetchedPost) {
      if (err) return res.status(500).send({ message: err.message });

      if (fetchedPost)
        return res
          .status(200)
          .send({ post: JSON.parse(fetchedPost), redis: true });

      const post = await Post.findById(req.params.id).lean().exec();
      redis.set(`posts.${req.params.id}`, JSON.stringify(post));

      return res.status(200).send({ post, redis: false });
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    const posts = await Post.find().lean().exec();

    redis.set(`posts.${req.params.id}`, JSON.stringify(post));
    redis.set("allPosts", JSON.stringify(posts));

    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    const posts = await Post.find().lean().exec();

    redis.del(`posts.${req.params.id}`);
    redis.set("allPosts", JSON.stringify(posts));

    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
