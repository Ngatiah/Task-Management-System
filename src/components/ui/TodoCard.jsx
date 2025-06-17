import React, { useState } from 'react'
import {Box,Card,Text} from '@radix-ui/themes'
// import { buttonVariants } from './CustomButton'
import { deleteTask } from '../services/taskServices'
import { useAuth } from '../../contexts/authContext'
import { useNavigate } from 'react-router-dom'
// import { cn } from '../constants'
import { DropdownMenu } from '@radix-ui/themes'
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import categoryImageMap from '../../data/data.json'


const categoryColors = {
  Work: "bg-yellow-100 text-yellow-800",
  Personal: "bg-pink-100 text-pink-800",
  Health: "bg-red-100 text-red-800",
  Study: "bg-green-100 text-green-800",
  Creativity: "bg-purple-100 text-purple-800",
  Workouts: "bg-orange-100 text-orange-800",
  Finance: "bg-blue-100 text-blue-800",
  Groceries: "bg-emerald-100 text-emerald-800",
  Errands: "bg-indigo-100 text-indigo-800",
  Entertainment: "bg-indigo-100 text-indigo-800"

};

// const statusColors = {
//   "In Progress": "bg-yellow-100 text-yellow-800",
//   "Completed": "bg-green-100 text-green-800",
//   // "Review": "bg-blue-100 text-orange-800",
//   // "Not Started": "bg-gray-100 text-gray-800",
// };

const priorityColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800",
};


// const TodoCard = ({title,description,taskId,onDeleted,imageUrl,category,status="In Progress"})=> {
const TodoCard = ({title,description,taskId,onDeleted,imageUrl,category,dueDate,priority})=> {
  // const statusStyle = statusColors[status] || "bg-gray-100 text-gray-800";
  // reverse map url to get category
  const resolvedCategory = Object.keys(categoryImageMap).find(
    key => categoryImageMap[key] === imageUrl
  );
  const badgeColor = categoryColors[resolvedCategory] || "bg-gray-100 text-gray-800";
  const {currentUser} = useAuth()
  const navigate = useNavigate()
  const handleDeleteTask = async () => {
  const confirm = await window.Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (confirm.isConfirmed) {
    const result = await deleteTask(currentUser.uid, taskId);
    if (result.success) {
      window.Swal.fire({
        title: "Deleted!",
        text: "Your task has been deleted.",
        icon: "success",
      });
      if (onDeleted) onDeleted(taskId);
    } else {
      window.Swal.fire({
        title: "Error",
        text: result.error || "Failed to delete task.",
        icon: "error",
      });
    }
  } else if (confirm.dismiss === window.Swal.DismissReason.cancel) {
    navigate("/home"); 
  }
};

//  console.log("Image URL for task", title, imageUrl)
//  console.log("Category for task:", category);



  return (
    <Box maxWidth="350px">
    <Card size="4">
        <div className='flex justify-between items-center'>
        <Text as="div" size="4" weight="bold">
         {title}
        </Text>
        <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-2 rounded hover:bg-gray-100">
          <DotsHorizontalIcon className="w-5 h-5" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        side="bottom"
        align="end"
        className="bg-white rounded shadow-md p-1 min-w-[150px] border"
      >
        <DropdownMenu.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>navigate(`/edit-task/${taskId}`)}>
          Edit
        </DropdownMenu.Item>
        <DropdownMenu.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>handleDeleteTask(taskId)}>
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
   
        </div>

        <Text as="div" color="gray" size="2">
          {description}
        </Text>
        <img src={imageUrl}  alt={`${category}Image`} className="w-full h-60 object-cover rounded mt-3"/>
        {/* <div className="mt-3 flex justify-center">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyle}`}>
          {status}
        </span>
      </div> */}
      <div className="mt-2 flex justify-start gap-2">
        {priority && (
          <div className="mt-3 flex justify-start items-center">
            <span className={`text-xs font-semibold p-2 rounded-full ${priorityColors[priority]} || "bg-gray-100 text-gray-800"`}>
             Priority: {priority}
            </span>
          </div>
        )}
        {resolvedCategory && (
          <div className="mt-3 flex justify-start items-center">
            <span className={`text-xs font-semibold p-2 rounded-full ${badgeColor}`}>
              {resolvedCategory}
            </span>
          </div>
        )}
      </div>
        {dueDate && (
          <div className="mt-3 flex justify-start items-center">
            <span className="text-xs font-semibold p-2 rounded-full bg-gray-100 text-gray-800">
              Due: {new Date(dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>
        )}
    </Card>
</Box>

  )
}
export default TodoCard

