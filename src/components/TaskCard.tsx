import { TasksModel } from "../models";
import { useTasks } from "../context";
import { useNavigate } from 'react-router-dom';

function TaskCard(props: { task: TasksModel }) {

  const { deleteTask, updateTask } = useTasks();
  const navigate = useNavigate();

  const handleDone = () => {
    (props.task.done === 1 || props.task.done === true) ? props.task.done = 0 : props.task.done = 1;
    updateTask(props.task);
  }

  return (
    <div className="bg-zinc-600 text-blue-200 rounded-md p-4">
      <header className="flex justify-between">
        <h2 className="text-xl text-center font-bold">{props.task.title}</h2>
        <span>{props.task.done === 1 || props.task.done === true ? '✅' : '❌'}</span>
      </header>
      <div className="block">
        <p className="text-xs">{props.task.description}</p>
      </div>
      <div className="block">
        <span className="text-sm">{String(props.task.updated_at).substring(0, 16)}</span>
      </div>

      <div className="flex flex-col-3 text-xs gap-3 pt-6">
        <button className="bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-700"
          onClick={() => { navigate(`/edit/${props.task.id_text}`) }}>Edit</button>
        <button className="bg-red-600 px-2 py-1 rounded-md hover:bg-red-800"
          onClick={() => { deleteTask(props.task.id_text as string); }}>Delete</button>
        <button className="bg-orange-500 px-2 py-1 rounded-md hover:bg-orange-700"
          onClick={() => { handleDone() }}>Status</button>
      </div>

    </div>
  )
}

export default TaskCard;
