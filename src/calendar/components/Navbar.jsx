import { FcCalendar } from 'react-icons/fc';
import { BiExit } from 'react-icons/bi';

export const Navbar = () => {
  return (
    <div className="h-[8vh] bg-[#1d1d1b] mb-4 px-4 flex justify-between items-center">
      <p className="text-white font-semibold flex items-center">
        <FcCalendar size="30px" />
        &nbsp; Santiago
      </p>
      <button className="p-2 bg-red-600 text-white font-semibold flex items-center rounded-md hover:bg-red-700">
        <BiExit size="25px" /> &nbsp; Salir
      </button>
    </div>
  );
};
