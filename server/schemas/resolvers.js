const Post = require('../models/Event.model');
const User = require('../models/User.model');

const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
      return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
      }
      return null; // Invalid hard-coded value (not an integer)
    },
  });

const resolvers = {
    Query: {
        getAllEvents: async () => {
            // const posts = await Post.find()
            // return posts
            return await Event.find();
        }
    },
    Mutation: {
        createPost: async (parent, args, context, info) => {
            const { title, description } = args.post
            const post = new Post({ title, description })
            await post.save();
            return post;
        }
    }
};

module.exports = resolvers;