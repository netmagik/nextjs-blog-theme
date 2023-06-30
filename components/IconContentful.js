import React, { useState, useEffect, useRef } from 'react';

const IconContentful = () => {
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
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                aria-hidden="true"
                className="!tw-fill-current tw-h-4 tw-w-4 cursor-pointer"
                onClick={handleIconClick}
              >
                <path
                  fill="#FAE501"
                  d="M11.095 20.906c-1.594-1.5-2.531-3.563-2.531-5.907a8.28 8.28 0 0 1 2.438-5.906 3.282 3.282 0 0 0 0-4.687 3.283 3.283 0 0 0-4.689 0C3.688 7.124 2 10.874 2 14.999s1.688 7.875 4.407 10.594a3.283 3.283 0 0 0 4.688 0 3.461 3.461 0 0 0 0-4.687Z"
                ></path>
                <path
                  fill="#4FB5E1"
                  d="M11.095 9.094c1.5-1.594 3.563-2.532 5.908-2.532 2.344 0 4.407.938 5.907 2.438a3.283 3.283 0 0 0 4.688 0 3.282 3.282 0 0 0 0-4.688C24.878 1.687 21.128 0 17.003 0 12.877 0 9.126 1.688 6.407 4.406a3.282 3.282 0 0 0 0 4.688 3.463 3.463 0 0 0 4.688 0Z"
                ></path>
                <path
                  fill="#F05751"
                  d="M22.91 20.906c-1.5 1.594-3.563 2.532-5.907 2.532A8.283 8.283 0 0 1 11.095 21a3.283 3.283 0 0 0-4.688 0 3.282 3.282 0 0 0 0 4.688C9.127 28.313 12.877 30 17.003 30c4.125 0 7.876-1.688 10.595-4.406a3.282 3.282 0 0 0 0-4.688 3.463 3.463 0 0 0-4.688 0Z"
                ></path>
                <path
                  fill="#0681B6"
                  d="M8.751 10.032a3.281 3.281 0 1 0 .001-6.563 3.281 3.281 0 0 0 0 6.563Z"
                ></path>
                <path
                  fill="#CD4739"
                  d="M8.751 26.532a3.282 3.282 0 1 0 0-6.564 3.282 3.282 0 0 0 0 6.564Z"
                ></path>
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
              {`query Contentful {
    allContentfulPageBlogPost {
      edges {
        node {
          id
          title
          publishedDate
          featuredImage {
            url
            title
          }
          content {
            raw
          }
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

export default IconContentful;
