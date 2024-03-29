import graphql from "graphql";
import _ from "lodash";
import Book from "../models/book.model.js";
import Author from "../models/author.model.js";

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

const BookType: graphql.GraphQLObjectType<any, any> = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //find which author corresponds to which book
                // return _.find(authors, { id: parent.authorId });
                return Author.findById(parent.authorId);
            },
        },
    }),
});

const AuthorType: graphql.GraphQLObjectType<any, any> = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, { authorId: parent.id });
                return Book.find({ authorId: parent.id });
            },
        },
    }),
});

const RootQuery: graphql.GraphQLObjectType<any, any> = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args) {
                // code to get data from db
                // return _.find(books, { id: args.id });
                return Book.findById(args.id);
            },
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                //find author based on id
                // return _.find(authors, { id: args.id });
                return Author.findById(args.id);
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
                return Book.find({});
            },
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
                return Author.find({});
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age,
                });
                return author.save();
            },
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                });
                return book.save();
            },
        },
    },
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
