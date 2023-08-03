import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser(){

    }
`;


export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            _id
            username
            email
            password        
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook(){

    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook(){

    }
`;

