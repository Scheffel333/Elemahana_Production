import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Navbar from "../../../components/utility/Navbar";
import SideBar from "../../../components/SideBar";
import Breadcrumb from "../../../components/utility/Breadcrumbs";
import React from "react";
import EmployeeNavbar from "../../../components/Employee/EmployeeNavbar";
import EditEmployee from "../../../components/Employee/Employee_register/EditEmployee";
import {SnackbarProvider} from "notistack";

export default function EditEmployeePage() {

    const breadcrumbItems = [
        { name: 'Employee', href: '/employees/home' },
        { name: 'Registration', href: '/employees/registration' },
        { name: 'Edit Employee Details', href: '/employees/registration/editEmployee' },
    ];

    return (
        <div className="">
            <div className=" sticky top-0 z-10">
                <Navbar/>
            </div>
            <div className="">
                <div className="grid sm:grid-cols-6 ">
                    <div className="  col-span-1 sticky top-0">
                        <SideBar/>
                    </div>

                    <div className="w-full col-span-5 flex flex-col ">
                        <EmployeeNavbar/>
                        <Breadcrumb items={breadcrumbItems}/>

                        <div>
                                <EditEmployee/>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}