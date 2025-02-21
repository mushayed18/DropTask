import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import TaskCard from "../../components/TaskCard";

const ManageTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      axios
        .get(`http://localhost:5000/tasks/${user.uid}`)
        .then((res) => setTasks(res.data))
        .catch((err) => console.error("Error fetching tasks:", err));
    }
  }, [user?.uid]);

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold text-center mb-6">My Tasks</h2>

      {tasks.length === 0 ? (
        <div className="h-72 flex justify-center items-center">
          <p className="text-center text-gray-500">No tasks found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageTask;
