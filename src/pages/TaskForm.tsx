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
    <div>
      <h2>{isEditOrUpdate(JSON.stringify(params), url) ? 'Edit Task' : 'Adding a Task'}</h2>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log({ values, actions });
          if (isEditOrUpdate(JSON.stringify(params), url)) {
            updateTask(values);
            navigate("/");
          } else { await createTask(values, actions.resetForm); }
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="title">Title</label>
            <Field type="text" id="title" name="title" placeholder="Write a Title"
            />
            <label htmlFor="description">Description</label>
            <Field as="textarea" rows={3} id="description" name="description" placeholder="Write a Description" />
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
          </Form>)}
      </Formik>
    </div>
  );
}

export default TaskForm;
