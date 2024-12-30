import { useState } from 'react'

const TaskInput = ({addTask, resetTasks}) => {
    const [task, setTask] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!task) return
        addTask(task)
        setTask('')
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" 
        className='p-2 rounded bg-gray-800 text-white w-72'
        placeholder='Enter a task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        />
        <button type='submit' className='p-2 rounded bg-gray-600 hover:bg-gray-700 ml-2'>Add</button>
        <button className='p-2 rounded bg-gray-600 hover:bg-gray-700 ml-2' onClick={resetTasks}>
            Clear
        </button>
    </form>
  )
}

export default TaskInput