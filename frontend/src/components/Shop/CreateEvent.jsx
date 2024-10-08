import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categoriesData } from '../../static/data';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useRecoilState, useRecoilValue } from 'recoil';
import { server } from '../../server';
import { sellerState } from '../../recoil/atoms/seller';
import axios from 'axios';
import { toast } from 'react-toastify';
import { eventsState } from '../../recoil/atoms/event';




const CreateEvent = () => {
    const { _id } = useRecoilValue(sellerState)

    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [category, setCategory] = useState("");
    const [originalPrice, setOriginalPrice] = useState();
    const [discountPrice, setDiscountPrice] = useState();
    const [stock, setStock] = useState();
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [events, setEvents] = useRecoilState(eventsState);

    const today = new Date().toISOString().slice(0, 10);

    const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : "";

    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
        setStartDate(startDate);
        setEndDate(null);
        document.getElementById("end-date").min = minEndDate.toISOString().slice(0, 10);
    };

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
    };

    const handleImageChange = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newForm = new FormData();

        images.forEach((image) => {
            newForm.append('images', image);
        });
        newForm.append('name', name);
        newForm.append('description', description);
        newForm.append('category', category);
        newForm.append('tags', tags);
        newForm.append('originalPrice', originalPrice);
        newForm.append('discountPrice', discountPrice);
        newForm.append('stock', stock);
        newForm.append('shopId', _id);
        newForm.append('start_Date', startDate.toISOString());
        newForm.append('finish_Date', endDate.toISOString());


        try {
            const response = await axios.post(`${server}/event/create-event`, newForm, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Event created successfully');

            setEvents((prevEvents) => [...prevEvents, response.data.event]);
            navigate('/dashboard-events');

        } catch (error) {
            console.error('Error creating product:', error);
            toast.error('Error creating product');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className=' w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll'>
            <h5 className='text-[30px] font-Poppins text-center'>Create Event</h5>
            {/* Create Event Form */}
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <label className='pb-2'>
                        Name <span className='text-red-500'>*</span>
                    </label>
                    <input type="text" name='name' className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your product name...' />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        cols="30"
                        required
                        rows="8"
                        type="text"
                        name="description"
                        value={description}
                        className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter your event product description..."
                    ></textarea>
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Category <span className='text-red-500'>*</span>
                    </label>
                    <select className='w-full mt-2 border h-[35px] rounded-[5px]' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Choose a category"> Choose a category</option>
                        {
                            categoriesData && categoriesData.map((i) => (
                                <option value={i.title} key={i.title}>
                                    {i.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Tags
                    </label>

                    <input type="text"
                        name='tags' className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' value={tags} onChange={(e) => setTags(e.target.value)} placeholder='Enter event product tags...' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Original Price
                    </label>
                    <input type="number"
                        name='price' className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder='Enter your event product price...' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Price (With Discount) <span className='text-red-500'>*</span>
                    </label>
                    <input type="number"
                        name='price'
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        value={discountPrice}
                        onChange={(e) => setDiscountPrice(e.target.value)} placeholder='Enter your event product price with discount...' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Product Stock <span className='text-red-500'>*</span>
                    </label>
                    <input type="number"
                        name='stock'
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        value={stock}
                        onChange={(e) => setStock(e.target.value)} placeholder='Enter your event product stock...' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Event Start Date <span className='text-red-500'>*</span>
                    </label>
                    <input type="date" id="start-date"
                        name='start-date'
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        value={startDate ? startDate.toISOString().slice(0, 10) : ""}
                        onChange={handleStartDateChange} min={today} placeholder='Enter your event product stock...' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Event End Date <span className='text-red-500'>*</span>
                    </label>
                    <input type="date" id="end-date"
                        name='end-date'
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        value={endDate ? endDate.toISOString().slice(0, 10) : ""}
                        onChange={handleEndDateChange} min={minEndDate} placeholder='Enter your event product stock...' />
                </div>
                <br />
                <div>
                    <label className='pb-2'>
                        Upload Product Images<span className='text-red-500'>*</span>
                    </label>
                    <input type="file" name="" id="upload"
                        className='hidden' multiple onChange={handleImageChange} />
                    <div className='w-full flex items-center flex-wrap'>
                        <label htmlFor="upload">
                            <AiOutlinePlusCircle size={30} className='mt-3' color='#555' />
                        </label>
                        {
                            images && images.map((i) => (
                                <img src={URL.createObjectURL(i)} key={i} alt="" className='h-[120px] w-[120px] object-cover m-2' />
                            ))
                        }
                    </div>
                    <br />
                    <div>
                        <input type="submit"
                            value="Create"
                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm' />
                    </div>
                </div>
            </form>
        </div>

    )
}




export default CreateEvent