const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String!
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me(id: ID, username: String): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String, password: String!): Auth
        saveBook(authors: [String], description: String!, title: String!, bookId: String!, image: String, link: String): User
        deleteBook(bookId: String!): User 
    }
`;

module.exports = typeDefs;