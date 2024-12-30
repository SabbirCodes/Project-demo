import React from 'react';

function TaskItem({ task, completeTask, deleteTask }) {
  return (
    <div className={`flex items-center justify-between p-3 bg-gray-800 rounded mb-2 ${task.completed ? 'bg-gray-700/20' : ''}`}>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => completeTask(task.id)}
          className="w-5 h-5"
        />
        <p className={`${task.completed ? 'line-through text-gray-400' : ''}`}>
          {task.text}
        </p>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-600"
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
