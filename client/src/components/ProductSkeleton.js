import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ProductSkeleton() {
  return (
    <div className='md:w-[400px]'>
    <hr className='my-1 border-t-2 mt-2 border-gray-100'/>
    <Skeleton className='w-full'/>
    <Skeleton className='w-full' count={4}/>
    <hr className='my-1 border-t-2 border-gray-100'/>
    <Skeleton/>
    <div className='flex w-10 -mt-1'>
    <div className="five-pointed-star"> </div>
    <div className="five-pointed-star"></div>
    <div className="five-pointed-star"></div>
    <div className="five-pointed-star"></div>
    <div className="five-pointed-star"></div>
    </div>
    <hr className='my-1 border-t-2 border-gray-100'/>
    <Skeleton count={2}/>
    <hr className='my-1 border-t-2 border-gray-100'/>
    <Skeleton count={2}/>
    <hr className='my-1 border-t-2 border-gray-100'/>
    <Skeleton/>
    </div>
  )
}

export default ProductSkeleton
