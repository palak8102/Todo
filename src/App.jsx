import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { MdMovieEdit } from 'react-icons/md';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const t = todos.find(i => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo('');
      saveToLS();
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <div className="bg-custom-image bg-cover bg-center h-full w-full">
      <Navbar />
      <div className="md:container md:max-w-3xl mx-auto my-5 rounded-xl p-5 bg-blue-50 min-h-[90vh]">
        <div className="addtodo mb-5">
          <h2 className="text-lg font-bold mb-2">Add your Todo</h2>
          <div className="flex items-center">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter new todo"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-green-200 disabled:bg-green-300 hover:bg-yellow-100 p-3 py-1 text-black rounded-md ml-2 font-bold"
            >
              Save
            </button>
          </div>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} /> Show Finished Todos
        <h2 className="text-lg font-bold mb-2">Todos</h2>
        <div className="todos ">
          {todos.length === 0 && <div className="m-5">No Todo Available</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todo flex w-full justify-between items-center my-3 p-4 bg-white shadow-md rounded-md"
              >
                <div className="flex items-center flex-grow gap-4">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="form-checkbox h-5 w-5 text-green-500"
                  />
                  <div
                    className={`text-gray-700 md:flex-grow ${item.isCompleted ? 'line-through' : ''} md:break-words md:max-w-xl`}
                  >
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex gap-2 h-full">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-green-200 hover:bg-yellow-100 p-3 text-black rounded-md font-bold"
                  >
                    <MdMovieEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-200 hover:bg-red-100 p-3 text-black rounded-md font-bold"
                  >
                    <MdOutlineDeleteSweep />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
