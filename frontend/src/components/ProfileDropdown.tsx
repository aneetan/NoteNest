import { useEffect, useRef, useState } from "react"
import { MdLogout } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { NavLink } from "react-router";

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    return (
        <>
        <div className="flex items-center mr-6 relative" ref={dropdownRef}>
            <button 
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
            >
                <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                className="w-8 h-8 object-cover rounded-full"
                alt="Profile"
                />
                <span className="mx-2 font-semibold">  User </span>
                <RiArrowDropDownLine className={`text-2xl transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <NavLink 
                        to="/logout" 
                        className="flex items-center px-4 py-2 font-semibold text-red-500 hover:bg-gray-100"
                        // onClick={logout}
                    >
                        <MdLogout className="mr-2" /> Logout
                    </NavLink>
                </div>
            )}
            </div>
        
        </>
    )
}

export default ProfileDropdown