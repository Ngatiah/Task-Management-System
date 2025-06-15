// import React from 'react'
// import {useAuth} from '../../../contexts/authContext'
// import { taskSchema } from '../../lib/validation'
// import { editTask,fetchSingleTask } from '../taskServices'
// import TaskForm from '../../ui/forms/TaskForm'

// export default function EditTask() {
//   const { currentUser } = useAuth()

//   const handleEditTask = async (data) => {
//   const result = await editTask(currentUser.uid, data);
//   if (result.success) {
//     window.Swal.fire({
//       title: "Task Updated",
//       text: "Your task was updated successfully.",
//       icon: "success",
//       confirmButtonColor: "#3085d6",
//     });
//   } else {
//     window.Swal.fire({
//       title: "Error",
//       text: result.error || "Something went wrong.",
//       icon: "error",
//       confirmButtonColor: "#d33",
//     });
//   }
//   return result;
// };


//   return (
//     <TaskForm
//       schema={taskSchema}
//       defaultValues={{ title: "", description: "" }}
//       onSubmit={handleEditTask}
//       type="EDIT_TASK"
//     />
//   )
// }

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/authContext';
import { useParams,useNavigate } from 'react-router-dom';
import { taskSchema } from '../../lib/validation';
import { editTask, fetchSingleTask } from '../taskServices';
import TaskForm from '../../ui/forms/TaskForm';
import { Button } from '@radix-ui/themes';

export default function EditTask() {
  const { currentUser, loading : authLoading } = useAuth();
  const { taskId } = useParams(); // Get taskId from URL
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      const result = await fetchSingleTask(currentUser.uid, taskId);
      if (result.success) {
        setDefaultValues({
          title: result.task.title || '',
          description: result.task.description || '',
          imageUrl: result.task.imageUrl || '',
          dueDate: result.task.dueDate || '',
          priority: result.task.priority || '',
            // status: result.task.status || 'pending',

        });
      //   console.log({
      //   title: result.task.title || '',
      //   description: result.task.description || '',
      //   dueDate: result.task.dueDate || '',
      //   priority: result.task.priority || '',
      //   imageUrl: result.task.imageUrl || '',
      // });

        
      } else {
        window.Swal.fire({
          title: "Error",
          text: result.error || "Failed to load task.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
      setLoading(false);
    };

    if (!authLoading && currentUser?.uid && taskId) {
      loadTask();
    }
  }, [currentUser, taskId,authLoading]);

  const handleEditTask = async (data) => {
    const result = await editTask(currentUser.uid, taskId, data);
    if (result.success) {
      window.Swal.fire({
        title: "Task Updated",
        text: "Your task was updated successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } else {
      window.Swal.fire({
        title: "Error",
        text: result.error || "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
    return result;
  };

  if (authLoading || loading || !defaultValues) return <p>Loading task...</p>;

  return (
    <>
    <TaskForm
      schema={taskSchema}
      defaultValues={defaultValues}
      onSubmit={handleEditTask}
      type="EDIT_TASK"
    />
    <Button onClick={()=>navigate('home')}>Cancel</Button>
    </>
  );
}

