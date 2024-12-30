import TaskItem from "./task-item";

const TaskList = ({ tasks, deleteTask, completeTask }) => {
  return (
    <div className="w-full max-w-lg mt-5">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            completeTask={completeTask}
          />
        ))
      ) : (
        <p className="text-gray-400">No tasks yet. Add one above!</p>
      )}
    </div>
  );
};

export default TaskList;
