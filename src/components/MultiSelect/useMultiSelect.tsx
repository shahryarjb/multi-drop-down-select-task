import {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
} from 'react';

interface UseMultiSelectProps {
  selectedItems: string[];
  inputValue: string;
  isOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  addItemHandler: (event: KeyboardEvent<HTMLInputElement>) => void;
  selectItemHandler: (item: string) => void;
  inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  removeItemHandler: (item: string) => void;
  handleInputClick: React.MouseEventHandler<HTMLInputElement>;
}

const useMultiSelect = (): UseMultiSelectProps => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const addItemHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      // This sort can be an option on the custom hook
      setSelectedItems([...selectedItems, inputValue.trim()].sort());
      setInputValue('');
      setIsOpen(true);
    }
  };

  const selectItemHandler = useCallback((item: string) => {
    setInputValue(item);
  }, []);

  const inputChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );

  const removeItemHandler = useCallback(
    (item: string) => {
      const updatedItems = selectedItems.filter(
        (selectedItem) => selectedItem !== item
      );
      setSelectedItems(updatedItems);
    },
    [selectedItems]
  );

  const outsideClickHandler = (event: MouseEvent) => {
    console.log(isOpen, "Why it is always false?")
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen((prv) => {
        console.log(prv, "Why does it work?")
        return false
      });
    }
  };

  useEffect(() => {
    document.addEventListener('click', outsideClickHandler);
    return () => {
      document.removeEventListener('click', outsideClickHandler);
    };
  }, []);

  const handleInputClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      e.stopPropagation();
      !isOpen && selectedItems.length > 0 ? setIsOpen(true) : null;
    },
    [isOpen, selectedItems]
  );

  return {
    selectedItems,
    inputValue,
    isOpen,
    dropdownRef,
    addItemHandler,
    selectItemHandler,
    inputChangeHandler,
    removeItemHandler,
    handleInputClick,
  };
};

export default useMultiSelect;
