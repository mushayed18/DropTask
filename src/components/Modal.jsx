const Modal = ({ isOpen, onClose, onSave, title, setTitle, description, setDescription }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-md">
        <div className="bg-white p-6 rounded-md shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Edit Task</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            placeholder="Task Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            placeholder="Task Description (Optional)"
          ></textarea>
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
            <button onClick={onSave} className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  