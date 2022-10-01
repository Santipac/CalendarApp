import { useCalendarStore, useUiStore } from '../../hooks';
import { FaTrashAlt } from 'react-icons/fa';
export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      className="bg-red-500 p-6 fixed bottom-0 left-0 m-4 rounded-full"
      onClick={handleDelete}
      style={{
        display: hasEventSelected ? '' : 'none',
      }}
    >
      <FaTrashAlt color="white" size="25px" />
    </button>
  );
};
