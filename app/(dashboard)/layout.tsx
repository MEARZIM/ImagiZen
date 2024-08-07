import { SidebarLayout } from "@/components/layouts/dashboard/sidebar-layout"

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full relative">
            <div className="md:flex md:w-72 md:fixed md:flex-col md:inset-y-0 z-[80] bg-gray-900  text-white" >
                <div>
                   <SidebarLayout/>
                </div>
            </div>
            <main className="md:pl-72"> 
                {children}
            </main>
           
        </div>
    )
}

export default DashBoardLayout