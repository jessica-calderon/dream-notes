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
  
  export const QUERY_DREAM = gql`
    query dream($id: ID!) {
      dream(_id: $id) {
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
  
  export const QUERY_USER = gql`
    query user($username: String!) {
      user(username: $username) {
        _id
        username
        email
        friendCount
        friends {
          _id
          username
        }
        dreams {
          _id
          dreamText
          createdAt
          commentCount
        }
      }
    }
  `;
  
  export const QUERY_ME = gql`
    {
      me {
        _id
        username
        email
        friendCount
        dreams {
          _id
          dreamText
          createdAt
          commentCount
          comments {
            _id
            createdAt
            commentBody
            username
          }
        }
        friends {
          _id
          username
        }
      }
    }
  `;
  
  export const QUERY_ME_BASIC = gql`
    {
      me {
        _id
        username
        email
        friendCount
        friends {
          _id
          username
        }
      }
    }
  `;

  export const QUERY_CHECKOUT = gql`
{
  getCheckout {
    products: prod_MYl1b4gPre11OV {
      session: sk_test_51LpdIaFuLGGbh7OBppdOfwpUZJoPacZ9rOKzDt2p5ZAEPk6fepcxLljwKjrYmXlOefkPgW9yHOm14s0ozIsgyBVy00kYw7xZ5a
    } 
    }
  }
  `;