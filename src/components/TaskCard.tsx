import { TasksModel } from "../models";

function TaskCard(props: { task: TasksModel }) {
  return (
    <div>
      <h2>{props.task.title}</h2>
      <p>{props.task.description}</p>
      <span>{props.task.done === 1 || props.task.done === true ? '✅' : '❌'}</span>
      <span>{props.task.updated_at as string}</span>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  )
}

export default TaskCard;
