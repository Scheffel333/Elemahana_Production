import SideBar from "../../../components/SideBar";
import React from "react";
import Navbar from "../../../components/utility/Navbar";
import WaterTank from "../../../components/Inventory/Water/WaterTank";
import InventoryNavbar from "../../../components/Inventory/InventoryNavbar";
import BackButton from "../../../components/utility/BackButton";
import Breadcrumb from "../../../components/utility/Breadcrumbs";
import { SnackbarProvider } from 'notistack'; // Import SnackbarProvider

export default function Water() {
    const breadcrumbItems = [
        { name: 'Inventory', href: '/inventory/home' },
        { name: 'Water', href: '/inventory/water' },
    ];

    return (
        <SnackbarProvider maxSnack={3}> {/* Wrap your component tree with SnackbarProvider */}
            <div className="Equipment">
                <div className="border-b sticky top-0 z-10">
                    <Navbar/>
                </div>
                <div className="">
                    {/* Fixed Sidebar */}
                    <div className="grid sm:grid-cols-6 ">
                        <div className="col-span-1 sticky left-0 top-0">
                            <SideBar/>
                        </div>

                        <div className="w-full col-span-5 flex flex-col ">
                            <InventoryNavbar/>
                            <div className="flex flex-row ">
                                <BackButton/>
                                <Breadcrumb items={breadcrumbItems}/>
                            </div>
                            <WaterTank/>
                        </div>
                    </div>
                </div>
            </div>
        </SnackbarProvider>
    );
}
