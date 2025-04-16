import React from 'react'

const Process = () => {
    return (
        <div className='relative flex w-full justify-center item-center md:mt-10 md:mb-10 mb-16'>
            <div className='w-[90%] lg:w-[80%] mx-auto z-30'>
                <div className='flex flex-col lg:flex-row justify-center items-center w-full gap-5 py-'>
                    <div className='flex flex-col w-full gap-2'>
                        <span className='text-[#333333] text-xl font-semibold'>What We Offer</span>
                        <h2 className='text-2xl md:text-4xl  font-bold w-full lg:w-[90%] text-[#333333]'>Best Gujarati & Punjabi Delights in a Cozy AC Dining Hall Near karjat</h2>
                        <p className='text-gray-500 text-sm mt-2'>At Sanika Baug, indulge in the authentic flavors of <span className='font-semibold text-md'>Gujarati Thali</span> for just <span className='font-semibold text-md'>₹99/-</span> and <span className='font-semibold text-md'>Punjabi Thali</span> for <span className='font-semibold text-md'>₹150/-</span>. Our <span className='font-semibold text-md'>AC Hall</span> offers a comfortable and aesthetic setting, perfect for enjoying traditional meals with fresh ingredients and spices that transport you to the heart of Gujarat and Punjab. With expertly crafted thalis, we ensure an unmatched dining experience. Located in Halol, near karjat, our <span className='font-semibold text-md'>AC Dining Hall</span> provides the perfect ambiance for a memorable meal that will leave you craving more!</p>
                    </div>
                    <div className='w-full grid grid-cols-2 gap-5'>
                        <div className='p-2 h-60 bg-white shadow-xl rounded-xl flex flex-col justify-between gap-1'>

                            {/* <img src="/img/rest1.jpeg" className='object-fill md:object-cover h-full w-full rounded-xl' alt='google' /> */}
                            <div className='h-full w-full rounded-xl flex justify-center items-center mt-0'>
                                <img src="/img/rest1.jpeg" className='object-fill md:object-cover h-[12rem] w-full rounded-xl' alt='google' />
                            </div>
                            <div className="flex flex-col gap-0 w-full">
                                <h2 className='text-sm md:text-lg font-semibold text-[#800000] text-center'>AC Dining Hall</h2>
                            </div>

                        </div>
                        <div className='p-2 h-60 bg-white shadow-xl rounded-xl flex flex-col justify-between gap-1'>

                            {/* <img src="/img/gujratiThali.jpg" className='object-fill md:object-cover h-full w-full rounded-xl' alt='meta' /> */}

                            <div className='h-full w-full rounded-xl flex justify-center items-center mt-0'>
                                <img src="/img/gujratiThali.jpg" className='object-fill md:object-cover h-[12rem] w-full rounded-xl' alt='google' />
                            </div>
                            <div className="flex flex-col gap-0 w-full">
                                <h2 className='text-sm md:text-lg font-semibold text-[#800000] text-center'>Gujrati Thali at ₹99/-</h2>
                            </div>

                        </div>
                        <div className='p-2 h-60 bg-white shadow-xl rounded-xl flex flex-col justify-between gap-1'>

                            {/* <img src="/img/punjabiThali.avif" className='object-fill md:object-cover h-full w-full rounded-xl' alt='amazon' /> */}

                            <div className='h-full w-full rounded-xl flex justify-center items-center mt-0'>
                                <img src="/img/punjabiThali.avif" className='object-fill md:object-cover h-[12rem] w-full rounded-xl' alt='google' />
                            </div>
                            <div className="flex flex-col gap-0 w-full">
                                <h2 className='text-sm md:text-lg font-semibold text-[#800000] text-center'>Punjabi Thali at ₹150/-</h2>
                            </div>


                        </div>
                        <div className='p-2 h-60 bg-white shadow-xl rounded-xl flex flex-col justify-between gap-1'>
                            {/* <img src="/img/rest2.jpeg" className='object-fill md:object-cover h-full w-full rounded-xl' alt='linked' /> */}

                            <div className='h-full w-full rounded-xl flex justify-center items-center mt-0'>
                                <img src="/img/rest2.jpeg" className='object-fill md:object-cover h-[12rem] w-full rounded-xl' alt='google' />
                            </div>
                            <div className="flex flex-col gap-0 w-full">
                                <h2 className='text-sm md:text-lg font-semibold text-[#800000] text-center'>AC Dining Hall</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-[20%] lg:top-0 lg:bottom-0 lg:my-auto right-0 w-[70%] lg:w-[50%] h-48 lg:h-52 bg-[#F5F5DC] rounded-l-2xl'></div>
        </div>
    )
}

export default Process