const  { User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent,{_id}) =>{
            return User.findOne({_id});
        },  
    },

    Mutation: {
        login: async(parent, {email, password}) =>{
            const user = await User.findOne({email, password})
            if(!user){
                throw AuthenticationError;
                }
                const correctPw = await user.isCorrectPassword(password);
    
                if(!correctPw){
                   throw AuthenticationError;
                }
                const token = signToken(user)
                return {user, token};
        },
        addUser: async(parent, {username, email, password}) =>{
            const user = await User.create({username, email, password });   
            if (!user) {
               throw AuthenticationError;
              }
            const token = signToken(user)
            return {user, token};
        },
        saveBook: async(parent, {authors, des}) =>{

        },
        removeBook:async(parent, {bookId}) =>{
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
              );
              return
        }

    },
}
module.exports = resolvers;