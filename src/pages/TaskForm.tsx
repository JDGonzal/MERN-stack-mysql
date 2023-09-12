import { Formik, Form, Field } from 'formik';
import { initialTask } from '../models';
import { useTasks } from '../context';

function TaskForm() {

  const { createTask } = useTasks();
  return (
    <div>
      <h2>Adding a Task</h2>
      <Formik
        initialValues={initialTask}
        onSubmit={async (values, actions) => {
          console.log({ values, actions });
          await createTask(values, actions.resetForm);
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
