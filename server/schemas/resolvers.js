const Post = require('../models/Post.model');

const resolvers = {
    Query: {
        hello: () => {
            return "hello world";
        },
        getAllPosts: async () => {
            // const posts = await Post.find()
            // return posts
            return await Post.find();
        }
    },
};

module.exports = resolvers;