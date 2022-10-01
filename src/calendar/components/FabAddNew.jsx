import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';
import { BsPlus } from 'react-icons/bs';
export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {
        _id: '123',
        name: 'Fernando',
      },
    });
    openDateModal();
  };

  return (
    <button
      className="bg-blue-500 p-4 fixed bottom-0 right-0 m-4 rounded-full"
      onClick={handleClickNew}
    >
      <BsPlus size="40px" color="white" />
    </button>
  );
};
