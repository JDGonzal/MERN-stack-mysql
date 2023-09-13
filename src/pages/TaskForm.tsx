import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TasksModel, initialTask } from '../models';
import { useTasks } from '../context';

const isEditOrUpdate = (params: string, url: string) => {
  let id_text = '';
  if (params.length > 36) id_text = JSON.parse(params).id_text;
  if (id_text.length === 36 && url === '/edit/') return true;
  return false;
}

function TaskForm() {
  const { createTask, readTask, updateTask } = useTasks();
  const [task, setTask] = useState<TasksModel>(initialTask);
  const params = useParams();
  const navigate = useNavigate();

  const url = window.location.href.slice(-42).substring(0, 6);
  console.log(params, url);

  useEffect(() => {
    const loadTask = async () => {
      if (isEditOrUpdate(JSON.stringify(params), url)) {
        const data = await readTask(params.id_text as string);
        await setTask(data);
      }
    };
    loadTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">

      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log({ values, actions });
          if (isEditOrUpdate(JSON.stringify(params), url)) updateTask(values);
          else createTask(values, actions.resetForm);
          navigate("/");
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="grid bg-slate-500 px-4 py-6 rounded-md max-w-md mx-auto">
            <h2 className="text-xl font-bold uppercase text-center">
              {isEditOrUpdate(JSON.stringify(params), url) ? 'Edit Task' : 'Adding a Task'}
            </h2>
            <div className="">
              <label htmlFor="title" className="block">Title</label>
              <Field className="px-2 py1 rounded-mdv w-full" type="text" id="title" name="title" placeholder="Write a Title"
              />
              <label htmlFor="description" className="block">Description</label>
              <Field className="px-2 py1 rounded-md w-full" as="textarea" rows={3} id="description" name="description" placeholder="Write a Description" />
            </div>
            <div className="flex justify-end">
              <button className=" bg-green-600 text-slate-200 rounded-md py-2 px-4 hover:bg-green-400 hover:text-white" type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
            </div>

          </Form>)}
      </Formik>
    </div>
  );
}

export default TaskForm;
