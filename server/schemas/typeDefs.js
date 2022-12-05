const { gql } = require('apollo-server-express');

const typeDefs = gql`
    # define which fields are accessible from the Class model
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        _id: ID!
        author: String!
        description: String!
        bookId: String!
        image: String!
        link: String!
        title: String!
    }

    input bookInput {
        authors: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String 
    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        getSingleUser: User
        users: [User]
    }
    
    type Mutation {
        createUser(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(input: bookInput!): [User]
        deleteBook(bookId: ID!): [User]
    }
`;

module.exports = typeDefs;