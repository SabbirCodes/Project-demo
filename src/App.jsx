import React, { useState, useEffect } from 'react';
import TaskInput from './components/task-input';
import TaskList from './components/task-list';

function App() {
  const [tasks, setTasks] = useState([]);
  const [timeLeft, setTimeLeft] = useState(3 * 24 * 60 * 60);
  const [message, setMessage] = useState('');
  const [completedTasks, setCompletedTasks] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [customDays, setCustomDays] = useState(0);

  useEffect(() => {
    const storedTimeLeft = localStorage.getItem('timeLeft');
    const storedIsRunning = localStorage.getItem('isRunning');
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const storedCompletedTasks = localStorage.getItem('completedTasks');

    if (storedTimeLeft) {
      setTimeLeft(Number(storedTimeLeft));
    }
    if (storedIsRunning === 'true') {
      setIsRunning(true);
    }
    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks);
    }
    if (storedCompletedTasks) {
      setCompletedTasks(parseInt(storedCompletedTasks, 10));
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem('timeLeft', newTime);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleTimeUp();
    }

    localStorage.setItem('isRunning', isRunning);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', completedTasks);
  }, [tasks, completedTasks]);

  const formatTimeLeft = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const setCustomTime = () => {
    const newTime = customDays * 24 * 60 * 60;
    setTimeLeft(newTime);
    localStorage.setItem('timeLeft', newTime);
    if (!isRunning) {
      setIsRunning(true);
      setCompletedTasks(0);
      setMessage('');
    }
  };

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    if (!isRunning) {
      setIsRunning(true);
      setCompletedTasks(0);
      setMessage('');
    }
  };

  const completeTask = (id) => {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    setCompletedTasks(prev => {
      const newCompletedTasks = tasks.filter(task => task.completed).length + 1;
      return newCompletedTasks;
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const resetTasks = () => {
    setTasks([]);
    setCompletedTasks(0);
    setIsRunning(false);
    setTimeLeft(10);
    // localStorage.clear();
  };

  const handleTimeUp = () => {
    setIsRunning(false);
    const completedCount = tasks.filter(task => task.completed).length;

    if (completedCount >= 2) {
      setMessage(`Time is up! 🎉 Congratulations! ${localStorage.getItem("completedTasks")} tasks completed.`);
    } else if (completedCount === 1) {
      setMessage('Time is up! 🦀 Crab! 1 task completed.');
    } else {
      setMessage('Time is up! ❌ No tasks completed.');
    }

    const newTime = customDays * 24 * 60 * 60;
    localStorage.setItem('timeLeft', newTime);
    localStorage.setItem('isRunning', 'false');

    setTimeLeft(newTime);
    setCompletedTasks(0);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">To-Do App</h1>
      <div className="mb-4 flex gap-2">
        <input
          type="number"
          value={customDays}
          onChange={(e) => setCustomDays(Math.max(1, parseInt(e.target.value) || 1))}
          className="bg-gray-800 text-white px-3 py-2 rounded w-20"
          min="1"
        />
        <button
          onClick={setCustomTime}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Set Days
        </button>
      </div>
      <TaskInput addTask={addTask} resetTasks={resetTasks} />
      <div className='text-xl'>Time left: {formatTimeLeft(timeLeft)}</div>
      {message && <p className="text-red-500">{message}</p>}
      <TaskList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;