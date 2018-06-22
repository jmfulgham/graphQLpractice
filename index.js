const {GraphQLServer} = require('graphql-yoga');
const photos = require('./data/photos.json');
const users = require('./data/users.json');
const typeDefs = `
    type Photo{
        id: ID!
        name: String
        description: String
        category: PhotoCategory
    }

    type User{
        id: ID!
        name: String!
    }
    enum PhotoCategory {
        LANDSCAPE
        SELFIE
        PORTRAIT
    }

    type Query{
        totalPhotos: Int!
        allPhotos: [Photo!]!
        totalUsers: Int!
        allUsers: [User!]!
    }

    type Mutation{
        postPhoto(input:PostPhotoInput!): Photo!

    }

    input PostPhotoInput{
        name: String!
        description: String
        category: PhotoCategory=PORTRAIT
    }

`
const resolvers = {
    Query : {
        totalPhotos: () => photos.length,
        allPhotos: () => photos,
        totalUsers: () => user.length,
        allUsers: ()=> user
    },


    Mutation: {
        postPhoto: (root, args ) => {
            const newPhoto = {
                id: "7",
                ...args.input
            }
        photos.push(newPhoto)
        return newPhoto
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

const options = {
    port: 4000, 
    endpoint: '/graphql',
    playground: '/playground'
}

const ready = ({port}) => 
    console.log(`graph service running on port ${port}`);

server.start(options,ready)