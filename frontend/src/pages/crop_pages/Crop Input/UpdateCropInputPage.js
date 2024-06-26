import SideBar from "../../../components/SideBar";
import React from "react";
import Navbar from "../../../components/utility/Navbar";
import EditCropInput from "../../../components/cropManagement_home/CropInputComponents/EditCropInput";
import BackButton from "../../../components/utility/BackButton";
export default function UpdateCropInputPage() {
    return (
        <div className="">
            <div className="border-b sticky top-0 z-10">
                <Navbar/>
            </div>
            <div className="flex">
                <div className="fixed h-full">
                    <SideBar/>
                </div>
                <div className="flex flex-row ml-64">
                    <BackButton/>
                </div>
            </div>
            <EditCropInput/>
        </div>
    );
}