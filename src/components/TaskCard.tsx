import { TasksModel } from "../models";
import { deleteTasksRequest } from '../api';

const handleDelete = async (id_text: string) => {
  try {
    const res = await deleteTasksRequest(id_text);
    console.log(res);
  } catch (err) { console.log(err); }
}

function TaskCard(props: { task: TasksModel }) {
  return (
    <div>
      <h2>{props.task.title}</h2>
      <p>{props.task.description}</p>
      <span>{props.task.done === 1 || props.task.done === true ? '✅' : '❌'}</span>
      <span>{props.task.updated_at as string}</span>
      <button>Edit</button>
      <button onClick={() => { handleDelete(props.task.id_text as string); }}>Delete</button>
    </div>
  )
}

export default TaskCard;
