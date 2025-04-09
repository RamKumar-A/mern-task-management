import { useState } from 'react';
import { HiOutlineTrash, HiPlusSm } from 'react-icons/hi';
import { LuPaperclip } from 'react-icons/lu';

function AddAttachmentsInput({ attachments, setAttachments }) {
  const [option, setOption] = useState('');

  function handleAddOption() {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption('');
    }
  }

  function handleDeleteOption(i) {
    const updatedArr = attachments.filter((_, index) => index !== i);
    setAttachments(updatedArr);
  }

  return (
    <div>
      {attachments.map((item, i) => (
        <div
          key={i}
          className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <div className="flex-1 flex items-center gap-3 border border-gray-100 ">
            <LuPaperclip className="text-gray-400" />
            <p className="text-xs text-black">{item}</p>
          </div>
          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(i)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}
      <div className="flex items-center gap-5 mt-4">
        <div className="flex-1 flex items-center gap-3 border border-gray-100 rounded-md px-3">
          <LuPaperclip className="text-gray-400" />
          <input
            type="text"
            placeholder="Add File Link"
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
    </div>
  );
}

export default AddAttachmentsInput;
