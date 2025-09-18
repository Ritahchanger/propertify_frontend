import React, { useState, useEffect } from "react"
import PropertifyNavbar from "./components/navbar/Navbar"
import PropertifySidebar from "./components/sidebar/Sidebar"
import type { RootState } from "@/store/store"
import { useSelector, useDispatch } from "react-redux"
import { closeMobile } from "./components/sidebar/SidebarSlice"
import AddPropertyModal from "@/modules/property/components/AddProperty"

const MOBILE_BREAKPOINT = 1024;

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { isCollapsed, isMobileOpen } = useSelector((state: RootState) => state.sidebar)
    const dispatch = useDispatch()

    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 10)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            const isMobileView = window.innerWidth < MOBILE_BREAKPOINT;
            setIsMobile(isMobileView);

            // Auto-close mobile menu on desktop
            if (!isMobileView && isMobileOpen) {
                dispatch(closeMobile());
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch, isMobileOpen]);

    const formatTime = (date: Date) => {
        const time = date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0')
        return `${time}.${milliseconds}`
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    // Calculate the correct width class based on sidebar states
    const getContentWidthClass = () => {
        if (isMobile) {
            // Mobile view
            return isMobileOpen ? "ml-0" : "ml-0"
        } else {
            // Desktop view
            return isCollapsed ? "ml-16" : "ml-80"
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertifyNavbar />
            <div className="flex">
                <PropertifySidebar />
                <div
                    className={`transition-all duration-300 p-2 px-0 pt-0 overflow-y-auto flex-1 ${getContentWidthClass()}`}
                    style={{ minHeight: 'calc(100vh - 64px)' }}
                >
                    {children}
                </div>
            </div>

            {/* Real-time Clock with Date */}
            <div className="fixed right-4 bottom-4 z-50">
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-sm px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="flex justify-between items-center space-x-6">
                        {/* Date */}
                        <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span className="text-xs font-medium text-gray-600 group-hover:text-blue-500 transition-colors duration-200">
                                {formatDate(currentTime)}
                            </span>
                        </div>

                        {/* Time with milliseconds */}
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-mono font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                                {formatTime(currentTime)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <AddPropertyModal />
        </div>
    )
}

export default Layout