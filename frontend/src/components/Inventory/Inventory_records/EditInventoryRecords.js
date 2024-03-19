import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const EditInventoryRecords = () => {
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        type: '',
        record_ID: '',
        record_name: '',
        storage: '',
        quantity: '',
        expire_date: '',
        description: ''
    });
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/inventoryinputs/${id}`)
            .then((response) => {
                const data = response.data;
                setFormData({
                    type: data.type,
                    record_ID: data.record_ID,
                    record_name: data.record_name,
                    storage: data.storage,
                    quantity: data.quantity,
                    expire_date: data.expire_date ? data.expire_date.split("T")[0] : '',
                    description: data.description
                });
                setSelectedType(data.type);
                setLoading(false);
            }).catch((error) => {
            setLoading(false);
            enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
            console.log(error);
        });
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'type') {
            setSelectedType(value);
        }
        setFormData({ ...formData, [name]: value });
    };
    const handleCancel = () => {
        setFormData({
            type: "",
            record_ID: "",
            record_name: "",
            storage: "",
            quantity: "",
            expire_date: "",
            description: ""
        });
    };
    const handleEdit = () => {
        setLoading(true);
        axios
            .put(`http://localhost:5555/inventoryinputs/${id}`, formData)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Record Edited successfully', { variant: 'success' });
                navigate('/inventory/inventoryrecords', { state: { highlighted: true } });
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
            });
    };
    return (
        <div className="pt-2">
            <div className="flex flex-col ml-96 mt-6">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Inventory Records Form
                </h1>
            </div>
            <form
                className="flex flex-col items-center justify-center"
                onSubmit={handleEdit}
                method="PUT">
                <div className="space-y-12 px-0 py-16 w-6/12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Type
                                </label>
                                <div className="mt-2 flex">
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="Planting"
                                            name="type"
                                            value="Planting"
                                            onChange={handleChange}
                                            checked={selectedType === "Planting"}
                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                            required
                                        />
                                        <label
                                            htmlFor="Planting"
                                            className="ml-2 text-sm leading-5 text-gray-900">
                                            Planting
                                        </label>
                                    </div>
                                    <div className="flex items-center ml-6">
                                        <input
                                            type="radio"
                                            id="Agrochemical"
                                            name="type"
                                            value="Agrochemical"
                                            onChange={handleChange}
                                            checked={selectedType === "Agrochemical"}
                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                            required
                                        />
                                        <label
                                            htmlFor="Agrochemical"
                                            className="ml-2 text-sm leading-5 text-gray-900">
                                            Agrochemical
                                        </label>
                                    </div>
                                    <div className="flex items-center ml-6">
                                        <input
                                            type="radio"
                                            id="Equipments"
                                            name="type"
                                            value="Equipments"
                                            onChange={handleChange}
                                            checked={selectedType === "Equipments"}
                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                            required
                                        />
                                        <label
                                            htmlFor="Equipments"
                                            className="ml-2 text-sm leading-5 text-gray-900">
                                            Equipments
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="Fertilizer"
                                            name="type"
                                            value="Fertilizer"
                                            onChange={handleChange}
                                            checked={formData.type === "Fertilizer"}
                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out ml-6"
                                            required
                                        />
                                        <label
                                            htmlFor="Fertilizer"
                                            className="ml-2 text-sm leading-5 text-gray-900">
                                            Fertilizer
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {selectedType === "Planting" && (
                                <>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="record_ID"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Plant ID
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="record_ID"
                                                name="record_ID"
                                                onChange={handleChange}
                                                value={formData.record_ID}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="record_name"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Plant Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="record_name"
                                                name="record_name"
                                                onChange={handleChange}
                                                value={formData.record_name}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="method"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Storage Location
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name="storage"
                                                value={formData.storage}
                                                onChange={handleChange}
                                                id="storage"
                                                autoComplete="storage"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                <option>Select</option>
                                                <option>Warehouse 1</option>
                                                <option>Warehouse 2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="quantity"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Stocked Quantity
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                onChange={handleChange}
                                                value={formData.quantity}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                rows={3}
                                                onChange={handleChange}
                                                className="border border-gray-400 rounded-md p-2 w-80"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {selectedType === "Agrochemical" && (
                                <>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                    <label
                                            htmlFor="record_ID"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Chemical ID
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="record_ID"
                                                name="record_ID"
                                                onChange={handleChange}
                                                value={formData.record_ID}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="record_name"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Chemical Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="record_name"
                                                name="record_name"
                                                onChange={handleChange}
                                                value={formData.record_name}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="method"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Storage Location
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name="storage"
                                                value={formData.storage}
                                                onChange={handleChange}
                                                id="storage"
                                                autoComplete="storage"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                <option>Select</option>
                                                <option>Warehouse 1</option>
                                                <option>Warehouse 2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="quantity"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Stocked Quantity
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                onChange={handleChange}
                                                value={formData.quantity}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="expire_date"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Expire date
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="date"
                                                id="expire_date"
                                                name="expire_date"
                                                onChange={handleChange}
                                                value={formData.expire_date}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                rows={3}
                                                onChange={handleChange}
                                                className="border border-gray-400 rounded-md p-2 w-80"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {selectedType === "Equipments" && (
                                <>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="record_ID"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Equipment ID
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="record_ID"
                                                name="record_ID"
                                                onChange={handleChange}
                                                value={formData.record_ID}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="record_name"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Equipment Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="record_name"
                                                name="record_name"
                                                onChange={handleChange}
                                                value={formData.record_name}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="method"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Storage Location
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name="storage"
                                                value={formData.storage}
                                                onChange={handleChange}
                                                id="storage"
                                                autoComplete="storage"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                <option>Select</option>
                                                <option>Warehouse 1</option>
                                                <option>Warehouse 2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="quantity"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Stocked Quantity
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                onChange={handleChange}
                                                value={formData.quantity}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                rows={3}
                                                onChange={handleChange}
                                                className="border border-gray-400 rounded-md p-2 w-80"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {formData.type === "Fertilizer" && (
                                <>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="record_ID"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Fertilizer ID
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="record_ID"
                                                name="record_ID"
                                                onChange={handleChange}
                                                value={formData.record_ID}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="record_name"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Fertilizer Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                id="record_name"
                                                name="record_name"
                                                onChange={handleChange}
                                                value={formData.record_name}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="method"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Storage Location
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name="storage"
                                                value={formData.storage}
                                                onChange={handleChange}
                                                id="storage"
                                                autoComplete="storage"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                <option>Select</option>
                                                <option>Warehouse 1</option>
                                                <option>Warehouse 2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="quantity"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Stocked Quantity
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                onChange={handleChange}
                                                value={formData.quantity}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="expire_date"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            Expire date
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="date"
                                                id="expire_date"
                                                name="expire_date"
                                                onChange={handleChange}
                                                value={formData.expire_date}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium leading-6 text-gray-900">
                                            description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                rows={3}
                                                onChange={handleChange}
                                                className="border border-gray-400 rounded-md p-2 w-80"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default EditInventoryRecords;