import React, { useState, useEffect, useRef } from 'react';

const IconShopify = () => {
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
                viewBox="0 0 27 30"
                aria-hidden="true"
                className="!tw-fill-current tw-h-4 tw-w-4 cursor-pointer"
                onClick={handleIconClick}
              >
                <path
                  fill="#95BF47"
                  d="M23.1 5.76a.28.28 0 0 0-.26-.24l-2.24-.05-1.95-1.9c-.17-.17-.53-.12-.65-.08l-.9.27a7.06 7.06 0 0 0-.42-1.06C16.05 1.5 15.1.84 14 .84c-.07 0-.14 0-.24.03-.02-.05-.07-.07-.1-.12A2.3 2.3 0 0 0 11.81 0c-1.45.05-2.9 1.08-4.05 2.94a11.94 11.94 0 0 0-1.64 4.22c-1.66.5-2.82.86-2.84.89-.85.26-.87.29-.97 1.08L.02 26.73l18.41 3.17 7.98-1.97c-.02-.03-3.28-22.03-3.3-22.17Zm-6.9-1.71c-.44.12-.92.29-1.43.43 0-.72-.1-1.76-.43-2.63 1.08.22 1.61 1.45 1.85 2.2Zm-2.42.75-3.08.94a7.43 7.43 0 0 1 1.54-3.02c.27-.26.63-.58 1.04-.77.43.84.53 2.03.5 2.84ZM11.83.96c.34 0 .63.08.87.22a4.72 4.72 0 0 0-1.13.9 8.6 8.6 0 0 0-1.9 4l-2.54.76c.5-2.31 2.46-5.8 4.7-5.88Z"
                ></path>
                <path
                  fill="#5E8E3E"
                  d="m22.84 5.52-2.24-.05-1.95-1.9a.46.46 0 0 0-.24-.12v26.43l7.98-1.98L23.1 5.73a.28.28 0 0 0-.27-.21Z"
                ></path>
                <path
                  fill="#fff"
                  d="m13.98 9.61-.92 3.47s-1.04-.48-2.27-.38C9 12.82 9 13.95 9 14.24c.1 1.54 4.17 1.88 4.4 5.52.18 2.87-1.51 4.82-3.94 4.96-2.94.2-4.56-1.54-4.56-1.54l.63-2.65s1.61 1.23 2.91 1.13a1.16 1.16 0 0 0 1.14-1.23c-.12-2.02-3.45-1.9-3.67-5.22-.17-2.8 1.67-5.64 5.71-5.89a4.7 4.7 0 0 1 2.37.3Z"
                ></path>
              </svg>{' '}

      {isModalOpen && (
        <div
          className="fixed bg-white border border-gray-300 dark:bg-black p-4 z-50"
          style={modalStyle}
          ref={modalRef}
        >
          {/* Modal content */}

          <code>
            <pre>
              {` query Shopify {
    allShopifyProduct {
      edges {
        node {
          title
          priceRangeV2 {
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            src
            altText
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

export default IconShopify;
