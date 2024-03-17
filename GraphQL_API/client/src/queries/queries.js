import { gql } from "apollo-boost";


export const getTasksQuery = gql`
  query {
    tasks {
      id
      title
    }
  }
`;

export const getProjectsQuery = gql`
  query {
    projects {
      id
      title
    }
  }
`;
