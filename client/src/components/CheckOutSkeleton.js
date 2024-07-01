import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function CheckOutSkeleton() {
  return (
    <div className='grid place-items-center my-7 px-3'>
      <div className=' w-full lg:w-11/12 md:flex h-[500px]'>
        <div className='w-full lg:grid content-start hidden '>
            <div class="grid grid-cols-4 gap-4">
                <div class="bg-white grid place-items-center rounded  p-4">
                    <div className='mb-3 w-6 h-6 rounded-full'>
                      <Skeleton circle className='w-full h-full' />
                    </div>
                    <div className='w-full h-5'>
                    <Skeleton count={2} className='w-full h-full' />
                    </div>
                </div>
                <div class="bg-white grid place-items-center    rounded p-4">
                  <div className='mb-3 w-6 h-6 rounded-full'>
                        <Skeleton circle className='w-full h-full' />
                      </div>
                      <div className='w-full h-5'>
                      <Skeleton count={2} className='w-full h-full' />
                    </div>
                </div>
                <div class="bg-white grid place-items-center  rounded p-4">
                   <div className='mb-3 w-6 h-6 rounded-full'>
                        <Skeleton circle className='w-full h-full' />
                      </div>
                      <div className='w-full h-5'>
                      <Skeleton count={2} className='w-full h-full' />
                   </div>
               </div>
               <div class="bg-white grid place-items-center  rounded p-4">
                   <div className='mb-3 w-6 h-6 rounded-full'>
                        <Skeleton circle className='w-full h-full' />
                      </div>
                      <div className='w-full h-5'>
                      <Skeleton count={2} className='w-full h-full' />
                   </div>
               </div>
            </div>
            <div className='w-1/2 h-4 mt-10'>
              <Skeleton count={3}  className='h-full w-full'/>
            </div>
            <div className='w-7 h-7 rounded-full mt-16'>
              <Skeleton circle className='w-full h-full'/>
            </div>
            <div className='w-16 h-10  mt-5 rounded'>
              <Skeleton className='w-full h-full'/>
            </div>
        </div>
        <div className='w-full grid lg:hidden'>
          <span className='space-y-12'>
          <div className='flex'>
            <div className='h-7 w-7 rounded-full mr-4'>
              <Skeleton circle className='w-full h-full'/>
            </div>
            <div className='h-5  w-2/3'>
                <Skeleton count={2} className='w-full h-full' />
            </div>
          </div>
          <div className='flex'>
            <div className='h-7 w-7 rounded-full mr-4'>
              <Skeleton circle className='w-full h-full'/>
            </div>
            <div className='h-5  w-2/3'>
                <Skeleton count={2} className='w-full h-full' />
            </div>
          </div>
          <div className='flex'>
            <div className='h-7 w-7 rounded-full mr-4'>
              <Skeleton circle className='w-full h-full'/>
            </div>
            <div className='h-5  w-2/3'>
                <Skeleton count={2} className='w-full h-full' />
            </div>
          </div>
          <div className='flex'>
            <div className='h-7 w-7 rounded-full mr-4'>
              <Skeleton circle className='w-full h-full'/>
            </div>
            <div className='h-5  w-2/3'>
                <Skeleton count={2} className='w-full h-full' />
            </div>
          </div>
            <div className='h-5 w-1/2'>
              <Skeleton count={3} className='w-full h-full'/>
            </div>
            </span>
            <div className='w-6 h-6 rounded-full mt-14'>
              <Skeleton circle className='w-full h-full' />
            </div>
            <div className='w-16 h-10 mt-3'>
              <Skeleton className='w-full h-full' />
            </div>

        </div>
        <div className='w-full flex items-start justify-center mt-16 lg:mt-0'>
          <div className='md:w-[450px] md:max-w-[550px] w-full h-[400px] '>
          <Skeleton className='w-full h-full' />
          </div>
        </div>
      </div>
      </div> 
  )
}

export default CheckOutSkeleton
