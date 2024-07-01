import React, { useState, useRef, useEffect } from 'react';
import { Fivestar, Fourstar, Quote, ShowDown, ShowUp, Verified } from './Svg';
import profilepic1 from '../assets/images/paul cregs.jpg';
import profilepic2 from '../assets/images/sarah deke.jpg';
import profilepic3 from '../assets/images/martha cynthia.jpg';

function Testimonies() {
    const [show, setShow] = useState(false);
    const showRef = useRef();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                showRef.current.style.maxHeight = 'none';
            } else if (!show) {
                showRef.current.style.maxHeight = '0';
            } else {
                showRef.current.style.maxHeight = `${showRef.current.scrollHeight}px`;
            }
        };

        handleResize(); // Set initial state based on screen size
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [show]);

    const handleShowToggle = () => {
        setShow(prevState => {
            const newShowState = !prevState;
            if (newShowState) {
                showRef.current.style.maxHeight = `${showRef.current.scrollHeight}px`;
            } else {
                showRef.current.style.maxHeight = '0';
            }
            return newShowState;
        });
    };

    return (
        <div className="bg-gray-100 w-full px-3 lg:pb-6 pt-6 my-5">
            <div className="text-center w-full mb-3">
                <h2 className="font-bold text-xl lg:text-2xl text-red-600 "><span className='shadow-md rounded-full px-3'>WHAT OUR CUSTOMERS SAY</span></h2>
                <p className="lg:text-lg">We're not just about selling shoes, we love to hear from our customers</p>
            </div>
            <div className="flex flex-col justify-evenly py-4 md:flex-row transition-all duration-500 ease-linear">
                <div className="w-full py-4 lg:px-6 px-2 bg-white grid">
                    <Quote fillColor="#111111" h="20" w="20" styleProp="scale-y-[-1] scale-x-[-1]" />
                    <blockquote className="text-gray-500 lg:text-lg">
                        I've been a loyal customer of Shoe Haven for years, and I can confidently say that their quality is unmatched. Every pair I've owned has been durable, comfortable, and stylish. I wouldn't shop anywhere else for my footwear needs.
                    </blockquote>
                    <Quote fillColor="#111111" h="20" w="20" styleProp="scale-y-[1] float-right" />
                    <div className="mt-4 w-full flex justify-between">
                        <div className="flex items-center">
                            <div className="overflow-hidden h-7 w-7 rounded-full mr-2">
                                <img src={profilepic1} alt="profile" className="object-cover h-full w-full" />
                            </div>
                            <p className="text-md">Paul Cregs</p>
                            <Verified fillColor="blue" styleProp="w-3 ml-2" />
                        </div>
                        <Fivestar styleProp="flex" widthSize="10" />
                    </div>
                </div>
                <div className="w-full py-4 lg:px-6 px-2 bg-white my-3 md:my-0 md:mx-3 grid">
                    <Quote fillColor="#111111" h="20" w="20" styleProp="scale-y-[-1] scale-x-[-1]" />
                    <blockquote className="text-gray-500 lg:text-lg">
                        I recently purchased a pair of shoes from Shoe Haven, and I couldn't be happier with my decision. Not only do they look fantastic, but they're also incredibly comfortable. I've received so many compliments whenever I wear them. Definitely recommend!
                    </blockquote>
                    <Quote fillColor="#111111" h="20" w="20" styleProp="scale-y-[1] float-right" />
                    <div className="mt-4 w-full flex justify-between">
                        <div className="flex items-center">
                            <div className="overflow-hidden h-7 w-7 rounded-full mr-2">
                                <img src={profilepic2} alt="profile" className="object-cover h-full w-full" />
                            </div>
                            <p className="text-md">Sarah Duke</p>
                            <Verified fillColor="blue" styleProp="w-3 ml-2" />
                        </div>
                        <Fourstar styleProp="flex" widthSize="10" />
                    </div>
                </div>
                <div ref={showRef} className="w-full max-h-0 transition-all duration-500 ease-linear overflow-hidden bg-white md:max-h-none md:block">
                    <div className="py-4  lg:px-6 px-2">
                        <Quote fillColor="#111111" h="20" w="20" styleProp="scale-y-[-1] scale-x-[-1] " />
                        <blockquote className="text-gray-500 lg:text-lg">
                            I was skeptical about buying shoes online, but after reading the positive reviews of Shoe Haven, I decided to give them a try. I'm so glad I did! The ordering process was seamless, and my shoes arrived quickly. They fit perfectly and exceeded my expectations in terms of quality. I'll definitely be a repeat customer.
                        </blockquote>
                        <Quote fillColor="#111111" h="20" w="20" styleProp="scale-y-[1] float-right" />
                        <div className="mt-4 w-full flex justify-between ">
                            <div className="flex items-center">
                                <div className="overflow-hidden h-7 w-7 rounded-full mr-2">
                                    <img src={profilepic3} alt="profile" className="object-cover h-full w-full" />
                                </div>
                                <p className="text-md">Martha Cynthia</p>
                                <Verified fillColor="blue" styleProp="w-3 ml-2" />
                            </div>
                            <Fivestar styleProp="flex" widthSize="10" />
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleShowToggle} className="md:hidden float-right mb-7 bg-red-500 w-fit px-3 h-7 flex items-center justify-center">
                {show ? (
                    <span className="text-white flex items-center">
                        show less <ShowUp />
                    </span>
                ) : (
                    <span className="text-white items-center flex">
                        show more <ShowDown />
                    </span>
                )}
            </button>
        </div>
    );
}

export default Testimonies;
