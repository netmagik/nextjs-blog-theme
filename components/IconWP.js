import React, { useState, useEffect, useRef } from 'react';

const IconWP = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleIconClick = (event) => {
    const { clientX, clientY } = event;
    setIconPosition({ x: clientX, y: clientY });
    setIsModalOpen(true);
  };

  const modalStyle = {
    top: iconPosition.y - 300, // Adjust the modal position as needed
    left: iconPosition.x + 10, // Adjust the modal position as needed
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div>
      <svg
        id="wp-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        aria-hidden="true"
        className="!tw-fill-current tw-h-4 tw-w-4 dark:fill-white cursor-pointer"
        onClick={handleIconClick}
      >
        <path d="M15 .9a14.011 14.011 0 0 1 7.883 2.408 14.208 14.208 0 0 1 3.81 3.81A14.011 14.011 0 0 1 29.1 15a14.011 14.011 0 0 1-2.409 7.882 14.21 14.21 0 0 1-3.81 3.81A14.011 14.011 0 0 1 15 29.1a14.011 14.011 0 0 1-7.882-2.409 14.208 14.208 0 0 1-3.81-3.81A14.011 14.011 0 0 1 .9 15a14.011 14.011 0 0 1 2.409-7.882 14.205 14.205 0 0 1 3.81-3.81A14.011 14.011 0 0 1 15 .9Zm0-.9C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15Z"></path>
        <path d="M2.5 15c0 4.947 2.875 9.223 7.045 11.249L3.582 9.913A12.451 12.451 0 0 0 2.5 14.999Zm20.939-.63c0-1.546-.555-2.616-1.03-3.448-.635-1.03-1.229-1.902-1.229-2.932 0-1.149.871-2.218 2.1-2.218.055 0 .107.006.161.01A12.453 12.453 0 0 0 15 2.5c-4.367 0-8.209 2.24-10.444 5.634.293.01.57.015.804.015 1.308 0 3.332-.159 3.332-.159.673-.04.753.95.08 1.03 0 0-.678.08-1.43.119l4.551 13.54 2.736-8.204-1.947-5.336c-.674-.04-1.311-.119-1.311-.119-.674-.04-.595-1.07.079-1.03 0 0 2.064.16 3.292.16 1.307 0 3.332-.16 3.332-.16.674-.04.753.95.08 1.03 0 0-.679.08-1.431.119l4.517 13.437 1.29-4.086c.573-1.786.909-3.051.909-4.12Zm-8.22 1.723L11.47 26.99a12.493 12.493 0 0 0 7.682-.2 1.143 1.143 0 0 1-.09-.172L15.22 16.093Zm10.75-7.09c.054.398.084.825.084 1.285 0 1.268-.237 2.694-.95 4.477l-3.818 11.039C25 23.637 27.5 19.61 27.5 15c0-2.174-.555-4.217-1.53-5.997Z"></path>
      </svg>

      {isModalOpen && (
        <div
          className="fixed bg-white border border-gray-300 dark:bg-black p-4 z-50"
          style={modalStyle}
          ref={modalRef}
        >
          {/* Modal content */}

          <code>
            <pre>
              {`query WordPress {
  allWpPost {
    edges {
      node {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
}
`}
            </pre>
          </code>
        </div>
      )}
    </div>
  );
};

export default IconWP;
