import TagsList from './components/TagsList';
import ItemsList from './components/ItemsList';
import useMultiSelect from './useMultiSelect';

function MultiSelect() {
  const {
    selectedItems,
    inputValue,
    isOpen,
    dropdownRef,
    addItemHandler,
    selectItemHandler,
    inputChangeHandler,
    removeItemHandler,
    handleInputClick,
  } = useMultiSelect();

  return (
    <>
      <div className="multi-select">
        <div className="selected-items">
          <TagsList
            selectedItems={selectedItems}
            removeItemHandler={removeItemHandler}
          />
        </div>
      </div>

      <div className="multi-select" ref={dropdownRef}>
        <input
          value={inputValue}
          onChange={inputChangeHandler}
          onKeyDown={addItemHandler}
          placeholder="Type and press Enter to add"
          onClick={handleInputClick}
        />

        <div>
          <ItemsList
            isOpen={isOpen}
            selectedItems={selectedItems}
            selectItemHandler={selectItemHandler}
          />
        </div>
      </div>
    </>
  );
}

export default MultiSelect;
