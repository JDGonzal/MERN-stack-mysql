import { Formik, Form, Field } from 'formik';
import { TasksModel } from '../models';
import { createTaskRequest } from '../api';

function TaskForm() {
  const initialValues: TasksModel = { title: '', description: '' };

  return (
    <div>
      <h2>Adding a Task</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          console.log({ values, actions });
          await createTaskRequest(values)
            .then((res) => {
              console.log(res);
              actions.resetForm();
            })
            .catch((err) => console.log(err));
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
            <button type="submit" disabled={isSubmitting}>{isSubmitting?"Saving...":"Save"}</button>
          </Form>)}
      </Formik>
    </div>
  );
}

export default TaskForm;
