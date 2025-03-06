import CustomSelect from '../custom-select/CustomSelect';
import './task-list.scss';
import {useEffect, useState} from 'react';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'in-progress',
        priority: 'medium',
    });

    const statusOptions = [
        {value: 'in-progress', label: 'In Progress'},
        {value: 'done', label: 'Done'},
    ];

    const priorityOptions = [
        {value: 'low', label: 'Low'},
        {value: 'medium', label: 'Medium'},
        {value: 'high', label: 'High'},
    ];

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) setTasks(JSON.parse(savedTasks));
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewTask((prevTask) => ({...prevTask, [name]: value}));
    };

    const handleAddTask = () => {
        if (!newTask.title.trim()) return;
        setTasks([{
            ...newTask,
            status: 'in-progress',
            id: Date.now().toString()
        }, ...tasks]);
        setNewTask({
            title: '',
            description: '',
            status: 'in-progress',
            priority: 'medium'
        });
        setShowAddTask(false);
    };

    const updateTask = (id, updates) => {
        setTasks((prevTasks) => prevTasks.map(task => (task.id === id ? {...task, ...updates} : task)));
    };

    const handleDeleteTask = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this task?');
        if (confirmed) {
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
        }
    };

    return (
        <div className="task-list">
            <div className="task-list-header">
                <h2>Task List</h2>
                {!showAddTask && (
                    <button className="task-button"
                            onClick={() => setShowAddTask(true)}>
                        Add Task
                    </button>
                )}
            </div>

            {showAddTask && (
                <div className="add-task-form">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newTask.title}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newTask.description}
                        onChange={handleInputChange}
                    />
                    <div className="lower-container">
                        <div className="select-container">
                            <label>Priority: </label>
                            <CustomSelect
                                options={priorityOptions}
                                value={newTask.priority}
                                onChange={(newValue) => setNewTask((prev) => ({
                                    ...prev,
                                    priority: newValue
                                }))}
                            />
                        </div>
                        <div className="actions-container">
                            <button className="task-button"
                                    onClick={handleAddTask}>Add Task
                            </button>
                            <button className="task-button"
                                    onClick={() => setShowAddTask(false)}>Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="tasks-list">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className="task-item">
                            <div className="task-content">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <div className="lower-container">
                                    <div className="task-metadata">
                                        <div className="select-container">
                                            <label>Status: </label>
                                            <CustomSelect
                                                options={statusOptions}
                                                value={task.status}
                                                onChange={(newValue) => updateTask(task.id, {status: newValue})}
                                            />
                                        </div>
                                        <div className="select-container">
                                            <label>Priority: </label>
                                            <CustomSelect
                                                options={priorityOptions}
                                                value={task.priority}
                                                onChange={(newValue) => updateTask(task.id, {priority: newValue})}
                                            />
                                        </div>
                                    </div>
                                    <div className="actions-container">
                                        <button
                                            onClick={() => updateTask(task.id, {status: 'done'})}
                                            className="task-button">Complete
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task.id)}
                                            className="task-button">Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="empty-message">No tasks yet.</p>
                )}
            </div>
        </div>
    );
};

export default TaskList;