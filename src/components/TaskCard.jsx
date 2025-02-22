import { useState, useContext } from "react";
import Modal from "./Modal";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const TaskCard = ({ task, onUpdate }) => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const handleUpdate = async () => {
    if (!user?.email) {
      toast.error("You must be logged in to update tasks.");
      return;
    }

    try {
      const response = await fetch(
        `https://drop-task-server.vercel.app/tasks/${task._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email, // ✅ Send email
            title,
            description,
          }),
        }
      );

      if (response.ok) {
        onUpdate(); // Refresh task list
        setIsModalOpen(false);
        toast.success("Your task has been updated!", {
          style: {
            background: "#00C951",
            color: "#FFFFFF",
          },
        });
      } else {
        toast.error("Failed to update task.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleDeleteBtn = () => {
    if (!user?.email) {
      toast.error("You must be logged in to delete tasks.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00C951",
      cancelButtonColor: "#939AA6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://drop-task-server.vercel.app/tasks/${task._id}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: user.email }), // ✅ Send email instead of UID
            }
          );

          if (response.ok) {
            onUpdate(); // Refresh task list
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the task.",
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="border p-4 rounded-md shadow-md bg-white flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-green-500">{task.title}</h3>
      {task.description && (
        <p className="text-gray-600 font-bold pt-5">{task.description}</p>
      )}
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
        })}{" "}
        (last time edited)
      </p>
      <div className="flex justify-center gap-2 mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-white hover:text-green-500 border border-green-500 text-white bg-green-500 cursor-pointer px-3 py-1 rounded-md"
        >
          <FaRegEdit />
        </button>
        <button
          onClick={handleDeleteBtn}
          className="hover:bg-green-500 border border-green-500 hover:text-white cursor-pointer bg-white text-green-500 px-3 py-1 rounded-md"
        >
          <RiDeleteBin6Line />
        </button>
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
