import { gql } from 'graphql-tag';

export const QUERY_PARTS = gql`
  query getParts($category: ID) {
    parts(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($parts: [ID]!) {
    checkout(parts: $parts) {
      session
    }
  }
`;

export const QUERY_ALL_PARTS = gql`
  {
    parts {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        parts {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
