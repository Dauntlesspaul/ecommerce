import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function CustomSkeleton({cards}) {
  return (
    
     Array(cards).fill(0).map((item, i )=> {

     return ( <div key={i} className='h-fit m-2'>
        <div className="2xl:w-64 2xl:h-72 xl:w-56 xl:h-64 lg:w-48 lg:h-56 w-40 h-48 bg-neutral-100 p-1 relative ">
          <Skeleton className='w-full h-full'/>
        </div>
        <Skeleton className='h-3'/>
        <div className='flex w-10  -mt-2'>
        <div className="five-pointed-star"> </div>
        <div className="five-pointed-star"></div>
        <div className="five-pointed-star"></div>
        <div className="five-pointed-star"></div>
        <div className="five-pointed-star"></div>
        </div>
        <Skeleton className='h-3'/>
        </div>)
        })
   
  )
}

export default CustomSkeleton
