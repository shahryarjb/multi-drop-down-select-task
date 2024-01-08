import React from 'react';

type TagsListTypes = {
  selectedItems: string[];
  removeItemHandler: (item: string) => void;
};

const TagsList = ({ selectedItems, removeItemHandler }: TagsListTypes) => {
  if (process.env.NODE_ENV === 'development')
    console.log('Rendering memoized Render');

  return (
    <>
      {selectedItems.map((item: string, index: number) => (
        <div
          key={index}
          className="selected-item"
          onClick={() => removeItemHandler(item)}
        >
          {item}
          <span className="remove-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>
      ))}
    </>
  );
};

export default React.memo(TagsList);
