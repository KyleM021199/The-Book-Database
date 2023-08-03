const  { User, Book} = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent,{_id}) =>{
            return User.findOne({_id});
        },  
    },

    Mutation: {
        login: async(parent, args) =>{

        },
        addUser: async(parent, args) =>{
            const user = await User.create(args);
            return user;
        },
        saveBook: async(parent, args) =>{

        },
        removeBook:async(parent, args) =>{

        }

    },
}
module.exports = resolvers;