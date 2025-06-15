import React, { useState,useEffect } from 'react'
import { useAuth } from '../../contexts/authContext'
import TodoCard from '../../components/ui/TodoCard'
import {Plus} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { fetchTasks } from '../../components/services/taskServices'

const Home = () => {
    const [tasks,setTasks] = useState([])
    const [searchQuery,setSearchQuery] = useState('')
    
    const navigate = useNavigate()

    const { currentUser } = useAuth()
    useEffect(() => {
        if (currentUser?.uid) {
            fetchTasks(currentUser.uid).then(setTasks);
        }
    }, [currentUser]);

    // const filteredTasks = tasks.filter(task =>
    //     task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     task.description.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    const filteredTasks = tasks.filter(task => {
        if (!task || !task.title || !task.description) return false;
        return (
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        });

    return (
        <>
        <div className='flex justify-end'>
        <header className="flex justify-between items-center bg-white p-4  sticky top-0 z-10 w-2/3 mt-10 ">
        <input
            type="text"
            placeholder="Search for tasks"
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
        />
        <div className="flex items-center gap-4">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
                            onClick={()=>navigate(`/add-task`)}
                        >
                            <span>Add Task</span>
                            <Plus className='h-5 w-5' />
                        </button>
        </div>
        </header>
        </div>
        <div className='text-2xl font-bold p-4'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}</div>

       <section className='p-4 flex flex-cols-1 items-center gap-4'>
                {filteredTasks.length === 0 ? (
                    <p>No tasks found.</p>
                ) : (
                    filteredTasks.map(task => (
                        <div key={task.taskId}>
                            <TodoCard
                                title={task.title}
                                description={task.description}
                                taskId={task.taskId}
                                imageUrl={task.imageUrl}
                                // status={task.status}
                                category={task.category}
                                dueDate={task.dueDate}
                                priority={task.priority}
                                onDeleted={(deletedId) =>
                                    setTasks(prev => prev.filter(task => task.taskId !== deletedId))
                                }
                            />
                        </div>
                    ))
                )}
            </section>

        </>
    )
}

export default Home