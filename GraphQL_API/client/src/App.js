// components
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import AddProject from './components/AddProject';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <div id="bg"> </div>
        <h1> Holberton school tasks </h1>
        <TaskList />
        <AddProject />
        <AddTask />
      </div>
    </ApolloProvider>
  );
}

export default App;

