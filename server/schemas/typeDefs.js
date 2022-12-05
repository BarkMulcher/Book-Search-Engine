const { gql } = require('apollo-server-express');

const typeDefs = gql`
    # define which fields are accessible from the Class model
    type Book {
        _id: ID
        author: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    
    type User {
        _id: ID!
        username: String!
        email: String!
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        getSingleUser(id: String, username: String): User
        book: Book

    }
    
    type Mutation {
        createUser(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(userId: ID!, book: String!): [User]
        deleteBook(userId: ID!, book: String!): [User]
    }
`;

module.exports = typeDefs;