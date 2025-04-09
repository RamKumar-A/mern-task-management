import { useState } from 'react';
import { HiOutlineTrash, HiPlusSm } from 'react-icons/hi';

function TodoListInput({ todoList, setTodoList }) {
  const [option, setOption] = useState('');

  function handleAddOption() {
    if (option.trim()) {
      setTodoList([...todoList, option.trim()]);
      setOption('');
    }
  }

  function handleDeleteOption(i) {
    const updatedArr = todoList.filter((_, index) => index !== i);
    setTodoList(updatedArr);
  }

  return (
    <div>
      {todoList.map((item, i) => (
        <div
          key={i}
          className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <p className="text-xs text-black">
            <span className="text-xs text-gray-400 font-semibold mr-2">
              {i < 9 ? `0${i + 1}` : i + 1}
            </span>
            {item}
          </p>
          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(i)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}
      <div className="flex items-center gap-5 mt-4">
        <input
          type="text"
          placeholder="Enter Task"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md"
        />
        <button className="card-btn text-nowrap" onClick={handleAddOption}>
          <HiPlusSm className="text-lg" />
          Add{' '}
        </button>
      </div>
    </div>
  );
}

export default TodoListInput;
