import type { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface SidebarProps {
    isOpen: boolean;
    children?: ReactNode;
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, children, onClose }) => {
    return (
        <>
            <div className={`fixed flex flex-col top-0 left-0 h-[100vh] bg-gray-100 text-gray-800 shadow-lg
                transform transition-all duration-300 ease-in-out z-50
                ${isOpen ? 'translate-x-0 w-64' : 'w-16'}`}>
                <div className="flex items-center justify-between p-4 shadow-xs">
                    {isOpen ? (
                      <>
                        <h2 className="text-2xl font-bold text-[var(--primary-color)]">NoteNest</h2>
                        <button onClick={onClose} className="md:hidden">
                          <FaTimes/>
                        </button>
                      </>
                    ) : (
                        <h2 className="text-2xl font-bold text-[var(--primary-color)]">NN</h2>
                    )}
                </div>

                <div className="p-4 overflow-y-auto">
                    {children}
                </div>
            </div>
            
            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden" 
                    onClick={onClose}
                />
            )}
        </>
    )
}

export default Sidebar