import { gql } from '@apollo/client';

export const QUERY_DREAMS = gql`
query dreams($username: String) {
    dreams(username: $username) {
      _id
      dreamText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
  `;