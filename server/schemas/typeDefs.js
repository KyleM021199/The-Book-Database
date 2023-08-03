const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
}

type Book{
    author: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type Auth{
    token: String
    user: [User]
}

type Query{
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth

}

`

module.exports = typeDefs;