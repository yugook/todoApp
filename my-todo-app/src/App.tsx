import { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
import { graphqlOperation } from '@aws-amplify/api-graphql';
import { listTodos } from './graphql/queries';
import { createTodo } from './graphql/mutations';
import { updateTodoStatus } from './graphql/mutations'; // 新しいミューテーション
import { deleteTodo } from './graphql/mutations';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import { generateClient } from '@aws-amplify/api';
import { FaPlus } from 'react-icons/fa'; // アイコンカラー

// Amplifyの設定
Amplify.configure(amplifyconfig);

const client = generateClient();

type Todo = {
  id: string;
  name: string;
  description: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ name: '', description: '' });

  // Todoリストの取得
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const todoData: any = await client.graphql(graphqlOperation(listTodos));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const todosFromAPI = todoData.data.listTodos.items.filter((item: any) => item !== null);
      setTodos(todosFromAPI);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const addTodo = async () => {
    const todo = {
      name: newTodo.name,
      description: newTodo.description,
      completed: false,
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newTodoData: any = await client.graphql(
        graphqlOperation(createTodo, { input: todo })
      );
      setTodos([...todos, newTodoData.data.createTodo]);
      setNewTodo({ name: '', description: '' });
    } catch (err) {
      console.error('Error creating todo:', err);
    }
  };

  const toggleTodoStatus = async (id: string, completed: boolean) => {
    try {
      console.log('Request Payload:', { id, completed: !completed });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updatedTodo: any = await client.graphql(
        graphqlOperation(updateTodoStatus, { id, completed: !completed })
      );
      console.log('Server Response:', updatedTodo);
  
      if (!updatedTodo.data.updateTodoStatus) {
        console.error('Failed to update todo status');
        return;
      }
  
      setTodos(
        todos.map((todo) =>
          todo.id === id ? updatedTodo.data.updateTodoStatus : todo
        )
      );
    } catch (err) {
      console.error('Error updating todo status:', err);
    }
  };

  const deleteTodoItem = async (id: string) => {
    try {
      await client.graphql(graphqlOperation(deleteTodo, { input: { id } }));
      setTodos(todos.filter((todo) => todo.id !== id)); // ローカル状態から削除
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="App">
      <h1>My Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Todo Name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Todo Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <button onClick={addTodo} className="add-task-button">
          {/* アイコンを追加し、アイコンの隣にテキストを配置 */}
          <FaPlus style={{ marginRight: '5px' }} /> Add Todo
        </button>
      </div>
      <div>
        <button onClick={fetchTodos}>Refresh Todos</button>
      </div>
      <div className="todo-list">
        {todos
          .filter((todo) => todo !== null) // nullを除外
          .map((todo) => (
            <div key={todo.id} className="todo-item">
              <h3>{todo.name}</h3>
              <p>{todo.description}</p>
              <p>Status: {todo.completed ? 'Completed' : 'Incomplete'}</p>
              <button onClick={() => toggleTodoStatus(todo.id, todo.completed)}>
                {todo.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
              </button>
              <button onClick={() => deleteTodoItem(todo.id)} className="delete">
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default withAuthenticator(App);