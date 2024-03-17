import { useState } from 'react';
// components
import { useQuery } from 'react-apollo';
import { getTasksQuery } from '../queries/queries';


function TaskList(props) {
  const setSelected = useState(null);
  // eslint-disable-next-line
  const { loading, error, data } = useQuery(getTasksQuery);

  function displayTasks() {
    console.log(loading, data);

    if (loading) {
      return <div>Loading tasks...</div>;
    } else {
      return data.tasks.map((task) => (
        <li key={task.id} onClick={() => setSelected(task.id)}>
          {task.title}
        </li>
      ));
    }
  }

  return (
    <div>
      <ul id="task-list">{displayTasks()}</ul>
    </div>
  );
}

export default TaskList;
