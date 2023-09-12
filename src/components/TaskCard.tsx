import { TasksModel } from "../models";
import { useTasks } from "../context";

function TaskCard(props: { task: TasksModel }) {

  const { deleteTask } = useTasks();

  return (
    <div>
      <h2>{props.task.title}</h2>
      <p>{props.task.description}</p>
      <span>{props.task.done === 1 || props.task.done === true ? '✅' : '❌'}</span>
      <span>{props.task.updated_at as string}</span>
      <button>Edit</button>
      <button onClick={() => { deleteTask(props.task.id_text as string); }}>Delete</button>
    </div>
  )
}

export default TaskCard;
