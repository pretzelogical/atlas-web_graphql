import { useState } from 'react';
// components
import { useQuery } from 'react-apollo';
import { getTasksQuery } from '../queries/queries';
import TaskDetails from './TaskDetails';


function TaskList(props) {
  const [state, setState] = useState({
    selected: null
  })
  // eslint-disable-next-line
  const { loading, error, data } = useQuery(getTasksQuery);

  function displayTasks() {
    console.log(loading, data);

    if (loading) {
      return <div>Loading tasks...</div>;
    } else {
      return data.tasks.map((task) => (
        <li key={task.id} onClick={() => setState({ selected: task.id })}>
          {task.title}
        </li>
      ));
    }
  }

  return (
    <div>
      <ul id="task-list">{displayTasks()}</ul>
      <TaskDetails taskId={state.selected}/>
    </div>
  );
}

export default TaskList;
