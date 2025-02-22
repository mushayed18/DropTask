import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import TaskCard from "../../components/TaskCard";

const ManageTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks
  const fetchTasks = () => {
    if (user?.email) {
      axios
        .get(`https://drop-task-server.vercel.app/tasks/${user.email}`)
        .then((res) => setTasks(res.data))
        .catch((err) => {});
    }
  };

  useEffect(() => {
    fetchTasks(); // Initial fetch when component loads
  }, [user?.email]);

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold text-center mb-6">My Tasks</h2>

      {tasks.length === 0 ? (
        <div className="h-72 flex justify-center items-center">
          <p className="text-center text-gray-500">No tasks found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onUpdate={fetchTasks} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageTask;
