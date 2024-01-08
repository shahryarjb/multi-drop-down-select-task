import { useEffect, useMemo, useRef } from 'react';

type ItemsListTypes = {
  selectedItems: string[];
  selectItemHandler: (item: string) => void;
  isOpen: boolean;
};

const ItemsList = ({
  selectedItems,
  isOpen,
  selectItemHandler,
}: ItemsListTypes) => {
  const selectedRef = useRef<any>();
  const markedRef = useRef<number | null>(null);

  if (process.env.NODE_ENV === 'development')
    console.log('Rendering ItemsList');

  useEffect(() => {
    if (markedRef.current !== null && isOpen) {
      const liElements: NodeListOf<HTMLLIElement> =
        selectedRef.current.querySelectorAll('ul li');

      liElements[markedRef.current].classList.add('selected');
      liElements.forEach((li, i) => {
        const svgElement = li.querySelector('svg');
        const isSelected =
          i === markedRef.current && li.classList.contains('selected');

        if (svgElement) {
          svgElement.classList.toggle('selected', isSelected);
        }
      });
    }
  }, [isOpen]);

  // It is nasty code but it make the process isolate and prevents re rendering
  // And can be an item of a helper
  const selectedRowHandler = (item: string, index: number) => {
    selectItemHandler(item);
    markedRef.current = index;

    const liElements: NodeListOf<HTMLLIElement> =
      selectedRef.current.querySelectorAll('ul li');

    liElements.forEach((li) => li.classList.remove('selected'));
    liElements[index].classList.add('selected');

    liElements.forEach((li, i) => {
      const svgElement = li.querySelector('svg');
      const isSelected = i === index && li.classList.contains('selected');

      if (svgElement) {
        svgElement.classList.toggle('selected', isSelected);
      }
    });
  };

  const memoizedItemsList = useMemo(() => {
    if (process.env.NODE_ENV === 'development')
      console.log('Rendering memoized ItemsList');

    return (
      <div className="dropdown">
        <ul ref={selectedRef}>
          {selectedItems.map((item: string, index: number) => (
            <li key={index} onClick={() => selectedRowHandler(item, index)}>
              <span>{item}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ display: 'none' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    );
  }, [selectedItems]);

  return <>{isOpen && selectedItems.length > 0 ? memoizedItemsList : null}</>;
};

export default ItemsList;
