const  { User, Book} = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async () =>{
            return User.find({});
        },
    },

    Mutation: {
        login: async(parent, args) =>{

        },
        addUser: async(parent, args) =>{
            const user = await Book.create(args);
            return user;
        },
        saveBook: async(parent, args) =>{

        },
        removeBook:async(parent, args) =>{
            
        }

    },
}
module.exports = resolvers;