import { useState } from "react";
import Modal from "./Modal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const TaskCard = ({ task, onUpdate }) => { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        onUpdate(); // Refresh tasks list
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-md bg-white">
      <h3 className="text-lg font-semibold text-green-500">{task.title}</h3>
      {task.description && <p className="text-gray-600 font-bold">{task.description}</p>}
      <p className="text-sm text-gray-500 pt-2">
        {new Date(task.timestamp).toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
      </p>
      <div className="flex justify-center gap-2 mt-8">
        <button onClick={() => setIsModalOpen(true)} className="hover:bg-white hover:text-green-500 border border-green-500 text-white bg-green-500 cursor-pointer px-3 py-1 rounded-md"><FaRegEdit /></button>
        <button className="hover:bg-green-500 border border-green-500 hover:text-white cursor-pointer bg-white text-green-500 px-3 py-1 rounded-md"><RiDeleteBin6Line /></button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleUpdate}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
    </div>
  );
};

export default TaskCard;
