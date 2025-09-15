import PropertifyNavbar from "./components/navbar/Navbar"
import PropertifySidebar from "./components/sidebar/Sidebar"
import type { RootState } from "@/store/store"
import { useSelector } from "react-redux"

const Layout = ({ children }: { children: React.ReactNode }) => {
    const isCollapsed = useSelector((state: RootState) => state.sidebar.isCollapsed)

    return (
        <div className="">

            <PropertifyNavbar />
            <div className="">
                <div
                    className={`transition-all duration-300 p-2 pt-0 overflow-y-auto flex-1 ${isCollapsed
                        ? "ml-16"
                        : "ml-80"
                        }`}
                >
                    {children}
                </div>
            </div>
            <PropertifySidebar />

        </div>
    )
}

export default Layout
