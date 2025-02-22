import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="my-3 p-3 bg-gray-500 text-white border shadow-md cursor-pointer">
      {task.title}
    </div>
  );
};

export default DraggableTask;
