import { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const AddTask = () => {
  const { user } = useContext(AuthContext); 
  const [taskData, setTaskData] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.uid) {
      toast.error("You must be logged in to add tasks.");
      return;
    }

    if (!taskData.title) {
      toast.error("Title is required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/tasks", {
        ...taskData,
        userId: user.uid, 
      });

      toast.success(response.data.message);
      setTaskData({ title: "", description: "" });

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add task");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-11/12 lg:w-8/12 border-2 rounded-md px-8 py-10">
        <h2 className="text-2xl font-bold mb-4">Add a New Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Task Title (max 50 chars)"
            value={taskData.title}
            onChange={handleChange}
            maxLength={50}
            required
            className="border p-2 rounded-md"
          />
          <textarea
            name="description"
            placeholder="Task Description (max 200 chars)"
            value={taskData.description}
            onChange={handleChange}
            maxLength={200}
            className="border p-2 rounded-md h-32 resize-none"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border border-green-500 cursor-pointer">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
