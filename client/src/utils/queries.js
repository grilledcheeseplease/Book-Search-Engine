import { gql } from '@apollo/client';

export const GET_ME = gql`
    query getMe($id:ID!, $username:String) {
        getMe(id:$ID, username:$String) {
            _id
            username
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;