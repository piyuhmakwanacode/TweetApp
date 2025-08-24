// import { useEffect } from 'react';

// const Popup = ({ message, type = 'success', onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose(); // auto close after 3 seconds
//     }, 2000);

//     return () => clearTimeout(timer); // cleanup
//   }, [onClose]);



//   const bgColor = type === 'success' ? 'bg-green-950' : 'bg-red-950';

//   return (
//     <div
//       className={`duration-500 fixed top-0 left-1/2 transform -translate-x-1/2 px-6 transition-top  py-3 rounded shadow-md text-white z-50 flex items-center justify-between min-w-[300px] ${bgColor} `}
//     >
//       <span>{message}</span>
//       <button
//         onClick={onClose}
//         className="ml-4 text-white hover:text-gray-300 font-bold"
//       >
//         ✕
//       </button>
//     </div>
//   );
// };

// export default Popup;

import { useEffect, useState } from 'react';

const Popup = ({ message, type = 'success', onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start slide-down animation
    setVisible(true);

    const timer = setTimeout(() => {
      handleClose();
    }, 3000); // auto-hide in 2s

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false); // trigger slide-up
    setTimeout(() => {
      onClose(); // remove component after animation
    }, 300); // match transition duration
  };

  const bgColor = type === 'success' ? 'bg-[#002626] ' : 'bg-[#330000]';

  return (
    <div
      className={`fixed top-[-60px] left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-md text-white z-50 flex items-center justify-between min-w-[300px] transition-all duration-600 ease-in-out backdrop:blur-2xl
        ${bgColor}
        ${visible ? 'translate-y-20 opacity-100' : 'translate-y-[-60px] opacity-0'}
      `}
    >
      <span>{message}</span>
      <button
        onClick={handleClose}
        className="ml-4 text-white hover:text-gray-300 font-bold text-lg"
      >
        ✕
      </button>
    </div>
  );
};

export default Popup;
