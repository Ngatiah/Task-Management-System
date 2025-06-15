import React from 'react'
import {useAuth} from '../../../contexts/authContext'
import { taskSchema } from '../../lib/validation'
import { addTask } from '../taskServices'
import TaskForm from '../../ui/forms/TaskForm'
import { useNavigate } from 'react-router-dom'
import { Button } from '@radix-ui/themes'

export default function AddTask() {
  const navigate = useNavigate() 
  const { currentUser } = useAuth()

  const handleAddTask = async (data) => {
  const result = await addTask(currentUser.uid, data);
  // console.log("New Task ID:", result.id); // <-- this will now show the ID correctly

  if (result.success) {
    window.Swal.fire({
      title: "Task Added",
      text: "Your task was successfully added!",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  } else if (confirm.dismiss === window.Swal.DismissReason.cancel) {
    navigate("/home"); 
  }
  else {
    window.Swal.fire({
      title: "Error",
      text: result.error || "Something went wrong.",
      icon: "error",
      confirmButtonColor: "#d33",
    });
  }
  return result;
};


  return (
    <>
    <TaskForm
      schema={taskSchema}
      defaultValues={{
          title: "",
          description: "",
          imageUrl: "",
          priority: "",
          dueDate: "",  // ISO format e.g. "2025-06-20"
        }}
      onSubmit={handleAddTask}
      type="ADD_TASK"
    />
    <Button onClick={()=>navigate('home')}>Cancel</Button>

    </>
  )
}