import ProfileDropdown from "./ProfileDropdown";

interface NavbarProps{
    onClick: () => void;
    isOpen: boolean;
}
const Navbar:React.FC<NavbarProps> = ({onClick, isOpen}) => {
  return (
      <nav className={`fixed flex justify-between top-0 left-0 right-0 bg-gray-50 shadow-sm p-4 z-40 ${isOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
          <button
              onClick={onClick}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
          </button>
          <ProfileDropdown/>
      </nav>
  )
}

export default Navbar