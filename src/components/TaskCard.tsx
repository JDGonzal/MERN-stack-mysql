import { TasksModel } from "../models";
import { useTasks } from "../context";
import { useNavigate } from 'react-router-dom';

function TaskCard(props: { task: TasksModel }) {

  const { deleteTask, updateTask } = useTasks();
  const navigate = useNavigate();

  const handleDone = () => {
    (props.task.done === 1 || props.task.done === true )?props.task.done=0:props.task.done=1;
    updateTask(props.task);
  }

  return (
    <div>
      <h2>{props.task.title}</h2>
      <p>{props.task.description}</p>
      <span>{props.task.done === 1 || props.task.done === true ? '✅' : '❌'}</span>
      <span>{props.task.updated_at as string}</span>
      <button onClick={() => { navigate(`/edit/${props.task.id_text}`) }}>Edit</button>
      <button onClick={() => { deleteTask(props.task.id_text as string); }}>Delete</button>
      <button onClick={() => { handleDone()}}>Toggle Taks</button>
    </div>
  )
}

export default TaskCard;
