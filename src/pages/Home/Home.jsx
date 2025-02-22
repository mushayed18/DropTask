import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import DroppableColumn from "../../components/DroppableColumn";
import DraggableTask from "../../components/DraggableTask";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
  const userEmail = user?.email; // ✅ Use email instead of uid

  useEffect(() => {
    if (userEmail) {
      fetchTasks(); // Fetch tasks only if user is logged in

      const interval = setInterval(async () => {
        const res = await fetch(
          "https://drop-task-server.vercel.app/tasks/update-check"
        );
        const data = await res.json();
        if (data.update) {
          fetchTasks(); // Fetch tasks if an update occurred
        }
      }, 5000); // Poll every 5 seconds

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [userEmail]); // ✅ Run effect when userEmail changes

  const fetchTasks = async () => {
    if (!userEmail) return;

    const res = await fetch(
      `https://drop-task-server.vercel.app/tasks?email=${userEmail}` // ✅ Use email query param
    );
    const data = await res.json();
    setTasks(data);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || !userEmail) return;

    const draggedTaskId = active.id;
    const overCategory = over.id;

    // If the task is being moved within the same category
    if (
      overCategory === tasks.find((task) => task._id === draggedTaskId).category
    ) {
      const oldIndex = tasks.findIndex((task) => task._id === draggedTaskId);
      const newIndex = tasks.findIndex((task) => task._id === over.id);

      // Reorder the tasks array locally
      const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
      setTasks(reorderedTasks);

      // Update the task position in the backend
      await updateTaskPosition(draggedTaskId, newIndex);
    } else {
      // If the task is being moved to a different category
      const updatedTasks = tasks.map((task) =>
        task._id === draggedTaskId ? { ...task, category: overCategory } : task
      );
      setTasks(updatedTasks);

      // Update category in the database
      await fetch(
        `https://drop-task-server.vercel.app/tasks/${draggedTaskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail, category: overCategory }), // ✅ Send email in body
        }
      );
    }
  };

  const updateTaskPosition = async (taskId, newIndex) => {
    await fetch(`https://drop-task-server.vercel.app/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, position: newIndex }), // ✅ Send email in request
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="min-h-96 grid md:grid-cols-3 gap-14 px-10 pt-24">
        {["To-Do", "In Progress", "Done"].map((category) => (
          <DroppableColumn key={category} id={category} title={category}>
            <SortableContext
              items={tasks
                .filter((task) => task.category === category)
                .map((task) => task._id)}
              strategy={verticalListSortingStrategy}
            >
              {tasks
                .filter((task) => task.category === category)
                .map((task) => (
                  <DraggableTask key={task._id} task={task} />
                ))}
            </SortableContext>
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
};

export default Home;
