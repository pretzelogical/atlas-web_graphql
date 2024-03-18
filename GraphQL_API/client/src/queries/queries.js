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

export const addTaskMutation = gql`
  mutation($title: String!, $weight: Int!, $description: String!, $projectId: ID!) {
    addTask(title: $title, weight: $weight, description: $description, projectId: $projectId) {
      title
      id
    }
  }
`;


export const getTaskDetailQuery = gql`
  query($id: ID!) {
    task(id: $id) {
      id
      title
      weight
      description
      project {
        id
        title
        weight
        description
        tasks {
          id
          title
          weight
        }
      }
    }
  }
`;
