import React, { useEffect, useState } from 'react';
import { GiChemicalDrop, GiFertilizerBag } from "react-icons/gi";
import { IoIosLeaf } from "react-icons/io";
import axios from "axios";

const InHome = () => {
    const [inventoryInputs, setInventoryInputs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/inventoryinputs`)
            .then((response) => {
                setInventoryInputs(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (recordId) => {
        axios
            .delete(`http://localhost:5555/inventoryinputs/${recordId}`)
            .then(() => {
                setInventoryInputs(prevRecords => prevRecords.filter(record => record._id !== recordId));
            })
            .catch((error) => {
                console.log(error);
                // Handle error
            });
    };

    const filteredRecords = inventoryInputs.filter((record) =>
        Object.values(record).some((value) => {
            if (typeof value === 'string' || typeof value === 'number') {
                return String(value).toLowerCase().includes(searchQuery.toLowerCase());
            }
            return false;
        })
    );

    return (
        <div className="bg-white py-24 sm:py-32 mt-[-96px]">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome to Inventory</h2>

                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col bg-green-300 p-8 rounded-lg transition duration-300 ease-in-out hover:bg-green-400 hover:shadow-md">
                            <div className="flex items-center justify-center">
                                <IoIosLeaf className="text-5xl text-black mr-4"/>
                                <dt className="text-xl font-semibold leading-6 text-black">Plants</dt>
                            </div>
                            <div className="p-8">
                                {Object.values(
                                    filteredRecords
                                        .filter((record) => record.type === "Planting")
                                        .reduce((acc, record) => {
                                            if (!acc[record.record_name]) {
                                                acc[record.record_name] = {...record};
                                            } else {
                                                acc[record.record_name].quantity += record.quantity;
                                            }
                                            return acc;
                                        }, {})
                                ).map((record, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex flex-row items-center gap-4 w-full justify-between ">
                                            <dd className="text-base tracking-tight sm:text-lg -ml-12">{record.record_name}</dd>
                                            <div className="text-base tracking-tight sm:text-lg -mr-10">{record.quantity} plants</div>
                                        </div>
                                        {index < Object.values(filteredRecords).length - 1 && (
                                            <hr className="my-4 -ml-12 -mr-10 border-black"/>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col bg-blue-300 p-8 rounded-lg transition duration-300 ease-in-out hover:bg-blue-400 hover:shadow-md">
                            <div className="flex items-center justify-center">
                                <GiChemicalDrop className="text-5xl text-black mr-4"/>
                                <dt className="text-xl font-semibold leading-6 text-black">Agro Chemicals</dt>
                            </div>
                            <div className="p-8">
                                {Object.values(
                                    filteredRecords
                                        .filter((record) => record.type === "Agrochemical")
                                        .reduce((acc, record) => {
                                            if (!acc[record.record_name]) {
                                                acc[record.record_name] = {...record};
                                            } else {
                                                acc[record.record_name].quantity += record.quantity;
                                            }
                                            return acc;
                                        }, {})
                                ).map((record, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex flex-row items-center gap-4 w-full justify-between ">
                                            <dd className="text-base tracking-tight sm:text-lg -ml-12">{record.record_name}</dd>
                                            <div className="text-base tracking-tight sm:text-lg -mr-10">{record.quantity}</div>
                                        </div>
                                        {index < Object.values(filteredRecords).length - 1 && (
                                            <hr className="my-4 -ml-12 -mr-10 border-black "/>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div
                            className="flex flex-col bg-yellow-300 p-8 rounded-lg transition duration-300 ease-in-out hover:bg-yellow-400 hover:shadow-md">
                            <div className="flex items-center justify-center">
                                <GiFertilizerBag className="text-5xl text-black mr-4"/>
                                <dt className="text-xl font-semibold leading-6 text-black">Fertilizers</dt>
                            </div>
                            <div className="p-8">
                                {Object.values(
                                    filteredRecords
                                        .filter((record) => record.type === "Fertilizer")
                                        .reduce((acc, record) => {
                                            if (!acc[record.record_name]) {
                                                acc[record.record_name] = {...record};
                                            } else {
                                                acc[record.record_name].quantity += record.quantity;
                                            }
                                            return acc;
                                        }, {})
                                ).map((record, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex flex-row items-center gap-4 w-full justify-between ">
                                            <dd className="text-base tracking-tight sm:text-lg -ml-12">{record.record_name}</dd>
                                            <div className="text-base tracking-tight sm:text-lg -mr-10">{record.quantity}</div>
                                        </div>
                                        {index < Object.values(filteredRecords).length - 1 && (
                                            <hr className="my-4 -ml-12 -mr-10 border-black "/>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InHome;