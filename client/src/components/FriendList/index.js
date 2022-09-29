import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token
    user {
        _id
        username
    }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
    token
    user {
        _id
        username
    }
    }
}
`;

export const ADD_THOUGHT = gql`
mutation addDream($dreamText: String!) {
    addDream(dreamText: $dreamText) {
    _id
    dreamText
    createdAt
    username
    commentCount
    comments {
        _id
    }
    }
}
`;

export const ADD_REACTION = gql`
mutation addReaction($thoughtId: ID!, $commentBody: String!) {
    addReaction(thoughtId: $thoughtId, commentBody: $commentBody) {
    _id
    commentCount
    comments {
        _id
        commentBody
        createdAt
        username
    }
    }
}
`;

export const ADD_FRIEND = gql`
mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
    _id
    username
    friendCount
    friends {
        _id
        username
    }
    }
}
`;

export const REMOVE_FRIEND = gql`
mutation removeFriend($id: ID!) {
    removeFriend(id: $id) {
    _id
    username
    friends {
        _id
        username
    }
    }
}
`;
