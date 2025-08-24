import { useState } from 'react'
import { NavLink, Outlet } from 'react-router';
import { MdDashboard, } from 'react-icons/md';
import { FaNotesMedical } from "react-icons/fa";
import type { IconType } from 'react-icons';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

interface NavItems {
    item: string;
    action: string;
    icon: IconType;
    isActive ?: boolean;
}

const UserLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const navLinks: NavItems[] = [
        { item: "Dashboard", action: "/dashboard", icon: MdDashboard },
        { item: "Your Notes", action: "/notes", icon: FaNotesMedical },
    ]

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar onClick={toggleSidebar} isOpen={isSidebarOpen} />
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}>
                <ul className="space-y-2">
                    {navLinks.map(item => (
                        <li key={item.action}>
                        <NavLink 
                            to={item.action}
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded transition ${!isSidebarOpen ? 'justify-center' : ''} 
                                ${isActive 
                                    ? 'bg-[var(--primary-color-hover)] text-white' 
                                    : 'hover:bg-[var(--primary-light)]'
                                }
                                `}
                            title={!isSidebarOpen ? item.item : ''}
                        >
                            <item.icon className="text-2xl" />
                            {isSidebarOpen && <span className="ml-3 font-semibold">{item.item}</span>}
                        </NavLink>
                        </li>
                    ))}
                </ul>
            </Sidebar>

            {/* Main content */}
            <main className={`h-screen pt-16 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64 ' : 'ml-16'} p-4 mt-4`}>
                <Outlet />
            </main>
        </div>
    )
}

export default UserLayout