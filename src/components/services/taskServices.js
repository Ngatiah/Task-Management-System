import { ref, push, update, remove,get,child,getDatabase } from 'firebase/database'
import {database} from '../../firebase/firebase'


// ADD TASK
export const addTask = async (userId, taskData) => {
  try {
    const taskRef = ref(database, `tasks/${userId}`)
    // const taskWithId = { ...taskData, id: taskRef.key };   
    // await set(taskRef, taskWithId);
    const newTaskRef = await push(taskRef, taskData)
    return { success: true, id: newTaskRef.key }
    // return { success: true, id: taskRef.key };
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// export const addTask = async (userId, taskData) => {
//   try {
//     const taskRef = ref(database, `tasks/${userId}`)
//     const taskWithDefaults = {
//       status: "pending",
//       created_at: Date.now(),
//       ...taskData,
//     };
//     const newTaskRef = await push(taskRef, taskWithDefaults)
//     return { success: true, id: newTaskRef.key }
//   } catch (error) {
//     return { success: false, error: error.message }
//   }
// }


// EDIT TASK
export const editTask = async (userId, taskId, updatedData) => {
  try {
    const taskRef = ref(database, `tasks/${userId}/${taskId}`)
    await update(taskRef, updatedData)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// DELETE TASK
export const deleteTask = async (userId, taskId) => {
  try {
    const taskRef = ref(database, `tasks/${userId}/${taskId}`)
    await remove(taskRef)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}


// fetching tasks
export async function fetchTasks(userId) {
  try {
    const db = getDatabase();
    const snapshot = await get(child(ref(db), `tasks/${userId}`));

    if (snapshot.exists()) {
      const data = snapshot.val();
      // Convert object to array of tasks with taskId
      return Object.entries(data).map(([id, task]) => ({
        taskId: id,
        ...task,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

// fetching single task
export const fetchSingleTask = async (userId, taskId) => {
  try {
    const db = getDatabase();
    const taskRef = ref(db, `tasks/${userId}/${taskId}`);
    const snapshot = await get(taskRef);

    if (snapshot.exists()) {
      return { success: true, task: snapshot.val() };
    } else {
      return { success: false, error: "Task not found." };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}