const  { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent,{user = null, params}) =>{
            const foundUser = await User.findOne({
                $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
              });
              if (!foundUser) {
                return res.status(400).json({ message: 'Cannot find a user with this id!' });
              }
              return foundUser
        },  
    },

    Mutation: {
        login: async(parent, {email, password}) =>{
            const user = await User.findOne({email, password})
            if(!user){
                return res.status(400).json({ message: "Can't find this user" });
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
        saveBook: async(parent, {user, body}) =>{
            try {
                const updatedUser = await User.findOneAndUpdate(
                  { _id: user._id },
                  { $addToSet: { savedBooks: body } },
                  { new: true, runValidators: true }
                );
                return updatedUser;
              } catch (err) {
                console.log(err);
                return res.status(400).json(err);
              }
        },
        removeBook: async(parent, { user, params}) =>{
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId  } } },
                { new: true }
              );
              if (!updatedUser) {
                return res.status(404).json({ message: "Couldn't find user with this id!" });
              }
              return updatedUser
        }

    },
}
module.exports = resolvers;