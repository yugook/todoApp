declare const createTodo: any;
export { createTodo };

export const updateTodoStatus = /* GraphQL */ `
  mutation UpdateTodoStatus($id: ID!, $completed: Boolean!) {
    updateTodoStatus(id: $id, completed: $completed) {
      id
      name
      description
      completed
    }
  }
`;

export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      id
      name
      description
      completed
    }
  }
`;