import { useDroppable } from "@dnd-kit/core";

const DroppableColumn = ({ id, title, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="border h-full p-3 bg-gray-100 min-h-[300px]">
      <h1 className="text-2xl text-center bg-green-500 text-white p-3">{title}</h1>
      {children}
    </div>
  );
};

export default DroppableColumn;
