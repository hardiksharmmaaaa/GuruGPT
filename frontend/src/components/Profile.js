import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User, Mail, Calendar, Edit } from 'lucide-react';

const Profile = ({ user, onLogout, onEditProfile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="flex items-center gap-2">
                {user.picture ? (
                    <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                        {user.name?.charAt(0) || 'U'}
                    </div>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                            {user.picture ? (
                                <img src={user.picture} alt={user.name} className="w-12 h-12 rounded-full" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white text-lg font-bold">
                                    {user.name?.charAt(0) || 'U'}
                                </div>
                            )}
                            <div>
                                <p className="font-semibold text-slate-800 dark:text-slate-100">{user.name}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-3">
                            <User className="w-4 h-4 text-slate-400" />
                            <span>{user.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span>Age: {user.age || 'Not set'}</span>
                        </div>
                    </div>
                    <div className="p-2 border-t border-slate-200 dark:border-slate-700">
                        <button
                            onClick={() => {
                                onEditProfile();
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200"
                        >
                            <Edit className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </button>
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;