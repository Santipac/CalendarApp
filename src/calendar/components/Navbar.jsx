import { FcCalendar } from 'react-icons/fc';
import { BiExit } from 'react-icons/bi';
import { useAuthStore } from '../../hooks/useAuthStore';

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();
  return (
    <div className="h-[8vh] bg-[#1d1d1b] mb-4 px-4 flex justify-between items-center">
      <p className="text-white font-semibold text-lg flex items-center">
        <FcCalendar size="30px" />
        &nbsp; {user.name}
      </p>
      <button
        className="p-2 bg-red-600 text-white font-semibold flex items-center rounded-md hover:bg-red-700"
        onClick={startLogout}
      >
        <BiExit size="25px" /> &nbsp; Salir
      </button>
    </div>
  );
};
