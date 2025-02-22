import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableTask = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="p-3 bg-white border shadow-md cursor-pointer">
      {task.title}
    </div>
  );
};

export default DraggableTask;
