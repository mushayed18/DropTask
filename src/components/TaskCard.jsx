const TaskCard = ({ task }) => {
    const formattedDate = new Date(task.timestamp).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  
    return (
      <div className="border p-4 rounded-md shadow-md bg-white">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        {task.description && <p className="text-gray-600">{task.description}</p>}
        <p className="text-sm text-gray-500">{formattedDate}</p>
        <div className="flex justify-end gap-2 mt-3">
          <button className="bg-blue-500 text-white px-3 py-1 rounded-md">Edit</button>
          <button className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
        </div>
      </div>
    );
  };
  
  export default TaskCard;
  