import { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { getProjectsQuery, addTaskMutation, getTasksQuery } from '../queries/queries';


function AddTask(props) {
  const [inputs, setInputs] = useState({
    title: '',
    weight: 1,
    description: '',
    projectId: ''
  });
  // eslint-disable-next-line
  const projectsData = useQuery(getProjectsQuery);
  const [addTaskFunc, addTaskData] = useMutation(addTaskMutation);


  const handleChange = (e) => {
    const newInputs = {
      ...inputs
    };
    if (e.target.name === 'weight')
      newInputs[e.target.name] = parseInt(e.target.value);
    else newInputs[e.target.name] = e.target.value;
    setInputs(newInputs);
  };

  function displayProjects() {
    if (projectsData.loading) {
      return <option> Loading projects... </option>;
    } else {
      return projectsData.data.projects.map((project) => {
        return (
          <option key={project.id} value={project.id}>
            {' '}
            {project.title}{' '}
          </option>
        );
      });
    }
  }

  const submitForm = (e) => {
    e.preventDefault();
    addTaskFunc({
      variables: {
        title: inputs.title,
        weight: inputs.weight,
        description: inputs.description,
        projectId: inputs.projectId
      },
      refetchQueries: [{ query: getTasksQuery }]
    });
    if (addTaskData.error) {
      console.error(addTaskData.error);
    }
  };

  return (
    <form
      class="task"
      id="add-task"
      onSubmit = {submitForm}
    >
      <div className="field">
        <label> Task title: </label>{' '}
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={inputs.title}
          required
        />
      </div>{' '}
      <div className="field">
        <label> Weight: </label>{' '}
        <input
          type="number"
          name="weight"
          onChange={handleChange}
          value={inputs.weight}
          required
        />
      </div>
      <div className="field">
        <label> description: </label>{' '}
        <textarea
          name="description"
          onChange={handleChange}
          value={inputs.description}
          required
        />
      </div>
      <div className="field">
        <label> Project: </label>{' '}
        <select
          name="projectId"
          onChange={handleChange}
          value={inputs.projectId}
          required
        >
          {' '}
          <option value="" selected="selected" disabled="disabled">
            {' '}
            Select project{' '}
          </option>{' '}
          {displayProjects()}
        </select>{' '}
      </div>
      <button> + </button>{' '}
    </form>
  );
}

export default AddTask;
