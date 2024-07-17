import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className='grid place-items-center h-screen bg-gray-100'>
            <div className=' min-h-40 grid place-items-center mt-8'>
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">404</h1>
                    <p className="text-lg md:text-2xl text-gray-700 mb-4">Sorry, the page you are looking for does not exist.</p>
                    <Link to="/">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                            Go to Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
