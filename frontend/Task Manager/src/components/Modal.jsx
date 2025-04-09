import { HiOutlineX } from 'react-icons/hi';

function Modal({ children, isOpen, onClose, title }) {
  if (!isOpen) return;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-fu h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 backdrop-opacity-80 backdrop-blur-xl">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow-md ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 ">{title}</h3>
            <button
              type="button"
              className="text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-950 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center  cursor-pointer"
              onClick={onClose}
            >
              <HiOutlineX className="text-lg" />
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
