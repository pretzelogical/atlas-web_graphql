import { getTaskDetailQuery } from '../queries/queries';
import { useQuery } from 'react-apollo';

function TaskDetails({ taskId }) {
  const id = taskId;
  const {loading, error, data} = useQuery(getTaskDetailQuery, {
    variables: {
      id
    }
  });

  function displayTaskDetails() {
    if (data) {
      console.log(loading, error, data);
      const task = data.task;
      return (
        <div>
          <h2> Title of task: {task.title} </h2>
          <p> Weight of the task: {task.weight} </p>
          <p> Title of the project: {task.project.title} </p>
          <p> All tasks of the project: </p>
          <ul className="other-tasks">
            {' '}
            {task.project.tasks.map((item) => {
              return <li key={item.id}> {item.title} </li>;
            })}{' '}
          </ul>
        </div>
      );
    } else {
      return <div> No task selected... </div>;
    }
  }

  return <div id="task-details"> {displayTaskDetails()} </div>;
}

export default TaskDetails;
