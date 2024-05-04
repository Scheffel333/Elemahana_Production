import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
const EditInventoryRecords = () => {
    const location = useLocation();
    const highlighted = location.state?.highlighted || false;
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        type: '',
        record_ID: '',
        record_name: '',
        storage: '',
        size: '',
        unit: '',
        quantity: '',
        unit_price: '',
        payer: '',
        expire_date: '',
        description: '',
        ava_status: 'in stock'
    });
    const [selectedType, setSelectedType] = useState('');
    const [autoSaveTransaction, setAutoSaveTransaction] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://elemahana-backend.vercel.app/inventoryinputs/${id}`)
            .then((response) => {
                const data = response.data;
                setFormData({
                    type: data.type,
                    record_ID: data.record_ID,
                    record_name: data.record_name,
                    storage: data.storage,
                    size: data.size,
                    unit: data.unit,
                    quantity: data.quantity,
                    unit_price: data.unit_price,
                    payer: data.payer,
                    expire_date: data.expire_date ? data.expire_date.split("T")[0] : '',
                    description: data.description,
                    ava_status: data.ava_status
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
            size: "",
            unit: "",
            quantity: "",
            unit_price: "",
            payer: "",
            expire_date: "",
            description: "",
            ava_status: "in stock"
        });
    };
    const handleEdit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setLoading(true);

        const { type, record_ID, record_name, storage, size, unit, quantity,unit_price,payer, expire_date, description, ava_status} = formData;

        // Prepare the updated data object to send in the PUT request
        const updatedData = {
            type,
            record_ID,
            record_name,
            storage,
            size,
            unit,
            quantity,
            unit_price,
            payer,
            expire_date,
            description,
            ava_status
        };

        try {
            await axios.put(`https://elemahana-backend.vercel.app/inventoryinputs/${id}`, updatedData);
            setLoading(false);
            enqueueSnackbar('Record Edited Successfully!', {
                variant: 'success',
                autoHideDuration: 6000,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
            });
            navigate('/inventory/inventoryrecords');

            if (autoSaveTransaction) {
                const transactionData = {
                    date: new Date().toISOString().slice(0, 10),
                    type: 'expense',
                    subtype: 'Inventory Fee',
                    amount: formData.quantity * formData.unit_price,
                    description: `${formData.record_name} , Quantity purchased - ${formData.quantity}`,
                    payer_payee: formData.payer,
                    method: 'Automated Entry',
                };

                await axios.post('https://elemahana-backend.vercel.app/transactions', transactionData);
            }
        } catch (error) {
            setLoading(false);
            enqueueSnackbar('Error editing record', { variant: 'error' });
            console.log(error);
        }
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
                                            className="form-radio h-4 w-4 text-lime-600 transition duration-150 ease-in-out"
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
                                            className="form-radio h-4 w-4 text-lime-600 transition duration-150 ease-in-out"
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
                                            className="form-radio h-4 w-4 text-lime-600 transition duration-150 ease-in-out"
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
                                            className="form-radio h-4 w-4 text-lime-600 transition duration-150 ease-in-out ml-6"
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
                                    <div className="sm:col-span-2 sm:col-start-1">
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
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="record_name"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Plant Name
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name="record_name"
                                                value={formData.record_name}
                                                onChange={handleChange}
                                                id="record_name"
                                                autoComplete="record_name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                                                required
                                            >
                                                <option value="">Select</option>
                                                <option value="Papaya">Papaya</option>
                                                <option value="Apple Guava">Apple Guava</option>
                                                <option value="Coconut">Coconut</option>
                                                {formData.record_name && !["Papaya", "Apple Guava", "Coconut"].includes(formData.record_name) && (
                                                    <option value={formData.record_name}>{formData.record_name}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}
                            {formData.type === "Agrochemical" && (
                                <>
                                    <div className="sm:col-span-2 sm:col-start-1">
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
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="record_name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Chemical Name
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name="record_name"
                                                value={formData.record_name}
                                                onChange={handleChange}
                                                id="record_name"
                                                autoComplete="record_name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                                            >
                                                <option>Select</option>
                                                <option>Booster K 45%</option>
                                                <option>Daconil Chlorothalonil (chlorothalonil 500g/l SC) fungicide
                                                </option>
                                                <option>Marshal 20 SC (carbosulfan 200g/l SC) insecticide</option>
                                                <option>Mitsu Abamectin (abamectin 18g/l EC) insecticide</option>
                                                <option>Alberts solution</option>
                                                <option>Crop Master solution</option>
                                                <option>Oasis Thiram (thiuram disulfide) fungicide</option>
                                                <option>Glyphosate weedicide</option>
                                                <option>Rootone</option>
                                                {![
                                                    "Booster K 45%",
                                                    "Daconil Chlorothalonil (chlorothalonil 500g/l SC) fungicide",
                                                    "Marshal 20 SC (carbosulfan 200g/l SC) insecticide",
                                                    "Mitsu Abamectin (abamectin 18g/l EC) insecticide",
                                                    "Alberts solution",
                                                    "Crop Master solution",
                                                    "Oasis Thiram (thiuram disulfide) fungicide",
                                                    "Glyphosate weedicide",
                                                    "Rootone",
                                                ].includes(formData.record_name) && (
                                                    <option value={formData.record_name}>{formData.record_name}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                </>
                            )}
                            {formData.type === "Equipments" && (
                                <>
                                    <div className="sm:col-span-2 sm:col-start-1">
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
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                                                required/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
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
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                                                required/>
                                        </div>
                                    </div>
                                </>
                            )}
                            {formData.type === "Fertilizer" && (
                                <>
                                    <div className="sm:col-span-2 sm:col-start-1">
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
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="record_name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Fertilizer Name
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name="record_name"
                                                value={formData.record_name}
                                                onChange={handleChange}
                                                id="record_name"
                                                autoComplete="record_name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                                                required
                                            >
                                                <option>Select</option>
                                                <option>Urea</option>
                                                <option>Coconut fertilizer</option>
                                                <option>Dolomite</option>
                                                <option>YPM</option>
                                                <option>Muriate of potash</option>
                                                <option>Papaya fertilizer</option>
                                                <option>Guava fertilizer</option>

                                                {![
                                                    "Urea",
                                                    "Coconut fertilizer",
                                                    "Dolomite",
                                                    "YPM",
                                                    "Muriate of potash",
                                                    "Papaya fertilizer",
                                                    "Guava fertilizer",
                                                ].includes(formData.record_name) && (
                                                    <option value={formData.record_name}>{formData.record_name}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                </>
                            )}
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
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6">
                                        <option>Select</option>
                                        <option>Warehouse 1</option>
                                        <option>Warehouse 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
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
                                        min="1"
                                        value={formData.quantity}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                                        required/>
                                </div>
                            </div>
                            {(formData.type === "Agrochemical" || formData.type === "Fertilizer") && (
                                <>
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="size"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Size
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="size"
                                                value={formData.size}
                                                min="1"
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                                                required/>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="unit"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Unit
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                name="unit"
                                                value={formData.unit}
                                                onChange={handleChange}
                                                id="unit"
                                                autoComplete="unit"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6">
                                                <option>Select</option>
                                                <option>ml</option>
                                                <option>l</option>
                                                <option>KG</option>
                                                <option>g</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="unit_price"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Unit Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="unit_price"
                                        value={formData.unit_price}
                                        min="1"
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                                        required/>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="payer"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Payer
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="payer"
                                        value={formData.payer}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                                        required/>
                                </div>
                            </div>
                            {(formData.type === "Agrochemical" || formData.type === "Fertilizer") && (
                                <>
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
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                </>
                            )}
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
                                                className="border border-gray-400 rounded-md p-2 w-80 focus:ring-2 focus:ring-inset focus:ring-lime-600"/>
                                </div>
                            </div>
                            <div className="sm:col-span-2 sm:col-start-1 mt-4">
                                <label
                                    htmlFor="ava_status"
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    Status
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="ava_status"
                                        name="ava_status"
                                        value={formData.ava_status}
                                        disabled // Disable user input
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        required/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end space-x-4">
                        <div
                            className="flex  justify-end gap-2 align-middle items-center text-sm font-semibold h-full pr-8 z-30">
                            <label className="bg-gray-200 py-1 pl-4 rounded-full">
                                Automatically save to transactions
                                <input
                                    className="size-6 ml-4 mr-1 form-checkbox text-lime-600 bg-white border-gray-300 rounded-full focus:border-lime-500 focus:ring focus:ring-lime-500 focus:ring-opacity-50 hover:bg-lime-100 checked:bg-lime-500"
                                    type="checkbox"
                                    checked={autoSaveTransaction}
                                    onChange={(e) => setAutoSaveTransaction(e.target.checked)}/>

                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="rounded-full bg-gray-300 px-4 py-1 hover:bg-gray-400 text-sm font-semibold text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-full bg-lime-200 px-4 py-1 text-sm font-semibold text-gray-900 shadow-sm hover:bg-lime-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default EditInventoryRecords;