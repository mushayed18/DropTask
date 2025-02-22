import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import DroppableColumn from "../../components/DroppableColumn";
import DraggableTask from "../../components/DraggableTask";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user.uid;

  useEffect(() => {
    fetchTasks(); // Fetch initial tasks

    const interval = setInterval(async () => {
      const res = await fetch("http://localhost:5000/tasks/update-check");
      const data = await res.json();
      if (data.update) {
        fetchTasks(); // Fetch tasks if an update occurred
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:5000/tasks/${userId}`);
    const data = await res.json();
    setTasks(data);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedTaskId = active.id;
    const overCategory = over.id;

    // If the task is being moved within the same category
    if (overCategory === tasks.find(task => task._id === draggedTaskId).category) {
      const oldIndex = tasks.findIndex(task => task._id === draggedTaskId);
      const newIndex = tasks.findIndex(task => task._id === over.id);

      // Reorder the tasks array locally
      const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
      setTasks(reorderedTasks);

      // Update the task position in the backend
      await updateTaskPosition(draggedTaskId, newIndex);
    } else {
      // If the task is being moved to a different category
      const updatedTasks = tasks.map(task =>
        task._id === draggedTaskId ? { ...task, category: overCategory } : task
      );
      setTasks(updatedTasks);

      // Update category in the database
      await fetch(`http://localhost:5000/tasks/${draggedTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: overCategory }),
      });
    }
  };

  const updateTaskPosition = async (taskId, newIndex) => {
    await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ position: newIndex }),
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="min-h-96 grid md:grid-cols-3 gap-14 px-10 pt-24">
        {["To-Do", "In Progress", "Done"].map(category => (
          <DroppableColumn key={category} id={category} title={category}>
            <SortableContext
              items={tasks.filter(task => task.category === category).map(task => task._id)}
              strategy={verticalListSortingStrategy}
            >
              {tasks
                .filter(task => task.category === category)
                .map(task => (
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
