import React from 'react'
import fullstar from '../assets/images/star-icon.svg'
import emptystar from '../assets/images/star-full-icon.svg'
import halfstar from '../assets/images/star-half-icon.svg'

export function Fivestar({widthSize, styleProp}) {
  return (
    <div  className={styleProp}>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={fullstar} alt="star"/>
    </div>
  )
}
export function Fourstar({widthSize, styleProp}) {
  return (
    <div  className={styleProp}>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={emptystar} alt="star"/>
    </div>
  )
}
export function Fourhalf({widthSize, styleProp}) {
  return (
    <div className={styleProp}>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={halfstar} alt="star"/>
    </div>
  )
}
export function Threestar({widthSize, styleProp}) {
  return (
    <div className={styleProp}>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={fullstar} alt="star"/>
      <img width={widthSize} src={emptystar} alt="star"/>
      <img width={widthSize} src={emptystar} alt="star"/>
    </div>
  )
}

export function Padlock({widthSize, fillColor}) {
  return (
    <div>
      <svg
       xmlns="http://www.w3.org/2000/svg"
      shapeRendering="auto" 
      textRendering="geometricPrecision" 
      fill={fillColor}  
      className={widthSize} 
      imageRendering ="optimizeQuality" 
      fillRule="evenodd" 
      clipRule="evenodd" 
      viewBox="0 0 390 511.815"><path
       d="M24.983 197.869h16.918v-39.203c0-43.387 17.107-82.959 44.667-111.698C114.365 18 152.726 0 194.998 0c42.259 0 80.652 17.981 108.41 46.968 27.58 28.739 44.692 68.292 44.692 111.698v39.203h16.917c13.738 0 24.983 11.245 24.983 24.984v263.978c0 13.739-11.245 24.984-24.983 24.984H24.983C11.226 511.815 0 500.57 0 486.831V222.853c-.013-13.739 11.226-24.984 24.983-24.984zm149.509 173.905l-26.968 70.594h94.923l-24.966-71.573c15.852-8.15 26.688-24.67 26.688-43.719 0-27.169-22.015-49.169-49.184-49.169-27.153 0-49.153 22-49.153 49.169-.016 19.826 11.737 36.905 28.66 44.698zM89.187 197.869h211.602v-39.203c0-30.858-12.024-58.823-31.376-79.005-19.147-19.964-45.49-32.368-74.428-32.368-28.925 0-55.288 12.404-74.422 32.368-19.37 20.182-31.376 48.147-31.376 79.005v39.203z"
       />
       </svg>
    </div>
  )
}
export function Eye({fillColor}) {
  return (
    <div>
      <svg 
      width="24"
      className=" cursor-pointer"
      height="24"
      fill={fillColor} 
      fillRule="evenodd" 
      clipRule="evenodd"><path 
      d="M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z"
       />
       </svg>
    </div>
  )
}
export function EyeOff({widthSize, fillColor}) {
  return (
    <div>
      <svg width="24" 
      height="24"
      fill={fillColor} 
      className={widthSize}  
      xmlns="http://www.w3.org/2000/svg" 
      fillRule="evenodd"
       clipRule="evenodd"><path
        d="M8.137 15.147c-.71-.857-1.146-1.947-1.146-3.147 0-2.76 2.241-5 5-5 1.201 0 2.291.435 3.148 1.145l1.897-1.897c-1.441-.738-3.122-1.248-5.035-1.248-6.115 0-10.025 5.355-10.842 6.584.529.834 2.379 3.527 5.113 5.428l1.865-1.865zm6.294-6.294c-.673-.53-1.515-.853-2.44-.853-2.207 0-4 1.792-4 4 0 .923.324 1.765.854 2.439l5.586-5.586zm7.56-6.146l-19.292 19.293-.708-.707 3.548-3.548c-2.298-1.612-4.234-3.885-5.548-6.169 2.418-4.103 6.943-7.576 12.01-7.576 2.065 0 4.021.566 5.782 1.501l3.501-3.501.707.707zm-2.465 3.879l-.734.734c2.236 1.619 3.628 3.604 4.061 4.274-.739 1.303-4.546 7.406-10.852 7.406-1.425 0-2.749-.368-3.951-.938l-.748.748c1.475.742 3.057 1.19 4.699 1.19 5.274 0 9.758-4.006 11.999-8.436-1.087-1.891-2.63-3.637-4.474-4.978zm-3.535 5.414c0-.554-.113-1.082-.317-1.562l.734-.734c.361.69.583 1.464.583 2.296 0 2.759-2.24 5-5 5-.832 0-1.604-.223-2.295-.583l.734-.735c.48.204 1.007.318 1.561.318 2.208 0 4-1.792 4-4z"
        />
      </svg>
    </div>
  )
}
export function Filter({fillColor}) {
  return (
    <div>
    <svg
    xmlns="http://www.w3.org/2000/svg" 
    id="Layer_1" data-name="Layer 1" 
    viewBox="0 0 24 24"
    width="10" 
    height="10"
    fill={fillColor}
    >
      <path d="M24,3.5c0,.83-.67,1.5-1.5,1.5H1.5c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5H22.5c.83,0,1.5,.67,1.5,1.5ZM14.5,20h-5c-.83,0-1.5,.67-1.5,1.5s.67,1.5,1.5,1.5h5c.83,0,1.5-.67,1.5-1.5s-.67-1.5-1.5-1.5Zm4-9H5.5c-.83,0-1.5,.67-1.5,1.5s.67,1.5,1.5,1.5h13c.83,0,1.5-.67,1.5-1.5s-.67-1.5-1.5-1.5Z"/>
    </svg>
    </div>
  )
}

export function ShowDown() {
  return (
    <div>
      <svg 
      xmlns="http://www.w3.org/2000/svg" 
      id="Bold" 
      viewBox="0 0 24 24" 
      width="16" 
      height="16"
      fill='white'
      className='mt-1 ml-1'
      ><path d="M19.061,7.854a1.5,1.5,0,0,0-2.122,0l-4.586,4.585a.5.5,0,0,1-.707,0L7.061,7.854A1.5,1.5,0,0,0,4.939,9.975l4.586,4.586a3.5,3.5,0,0,0,4.95,0l4.586-4.586A1.5,1.5,0,0,0,19.061,7.854Z"/>
      </svg>
    </div>
  )
}

export function ShowUp() {
  return (
    <div>
     <svg
      xmlns="http://www.w3.org/2000/svg" 
      id="Bold" viewBox="0 0 24 24" 
      width="16" 
      height="16"
      fill='white'
      className='mt-1 ml-1'
      >
        <path d="M19.061,13.439,14.475,8.854a3.583,3.583,0,0,0-4.95,0L4.939,13.439a1.5,1.5,0,0,0,2.122,2.122l4.586-4.586a.5.5,0,0,1,.707,0l4.585,4.586a1.5,1.5,0,0,0,2.122-2.122Z"/>
        </svg>

    </div>
  )
}



export function Tag({ widthSize, fillColor }) {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="122.879px"
      height="122.891px"
      viewBox="0 0 122.879 122.891"
      xmlSpace="preserve"
      fill={fillColor}
      className={widthSize}
    >
      <g>
        <path
          d="M89.767,18.578c3.848,0,7.332,1.561,9.854,4.082c2.521,2.522,4.082,6.007,4.082,9.855s-1.561,7.332-4.082,9.854 c-2.522,2.522-6.007,4.082-9.854,4.082c-3.849,0-7.333-1.56-9.854-4.082c-2.522-2.522-4.082-6.006-4.082-9.854 s1.56-7.333,4.082-9.855C82.434,20.138,85.918,18.578,89.767,18.578L89.767,18.578z M122.04,56.704l-65.337,65.337 c-1.132,1.133-2.969,1.133-4.101,0L0.849,70.287c-1.132-1.131-1.132-2.967,0-4.1L66.186,0.85C66.752,0.284,67.494,0,68.236,0v0 h50.051c1.602,0,2.9,1.298,2.9,2.9c0,0.048-0.002,0.097-0.004,0.145l1.694,51.517c0.026,0.83-0.301,1.589-0.845,2.134 L122.04,56.704L122.04,56.704z M54.652,115.889l62.406-62.407L115.49,5.8H69.438L7.001,68.238L54.652,115.889L54.652,115.889z M96.244,26.037c-1.657-1.657-3.948-2.683-6.478-2.683c-2.53,0-4.82,1.025-6.478,2.683c-1.658,1.657-2.684,3.948-2.684,6.478 s1.025,4.82,2.684,6.478c1.657,1.658,3.947,2.683,6.478,2.683c2.529,0,4.82-1.025,6.478-2.683s2.683-3.948,2.683-6.478 S97.901,27.694,96.244,26.037L96.244,26.037z"
        />
      </g>
    </svg>
  );
}

export function SearchGlass({fillColor }) {
  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    version="1.1" id="Capa_1" x="0px" y="0px" 
    viewBox="0 0 513.749 513.749" 
    xmlSpace="preserve" 
    width="20" 
    height="20"
    fill={fillColor}
    >
    <g>
      <path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z"/>
    </g>
    </svg>
  );
}

export function Sort({fillColor }) {
  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    id="Layer_1" 
    data-name="Layer 1" 
    viewBox="0 0 24 24" 
    width="11" 
    height="11"
    fill={fillColor}
    >
      <path d="M22.5,8H11.5c-.829,0-1.5,.672-1.5,1.5s.671,1.5,1.5,1.5h11c.828,0,1.5-.672,1.5-1.5s-.672-1.5-1.5-1.5Z"/>
      <path d="M18.5,14h-7c-.829,0-1.5,.672-1.5,1.5s.671,1.5,1.5,1.5h7c.828,0,1.5-.672,1.5-1.5s-.672-1.5-1.5-1.5Z"/>
      <path d="M14.5,20h-3c-.829,0-1.5,.672-1.5,1.5s.671,1.5,1.5,1.5h3c.828,0,1.5-.672,1.5-1.5s-.672-1.5-1.5-1.5Z"/>
      <path d="M9.752,3.879L6.166,.293c-.391-.391-1.024-.391-1.414,0L1.166,3.879c-.39,.391-.39,1.024,0,1.414,.187,.187,.442,.293,.707,.293h2.127V25.229c0,.828,.671,1.5,1.5,1.5s1.5-.672,1.5-1.5V5.586h2.045c.552,0,1-.448,1-1,0-.265-.105-.519-.293-.707Z"/>
      </svg>
  );
}

export function Quote({fillColor, h, w, styleProp}) {
  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    id="Outline" 
    viewBox="0 0 24 24" 
    width={w}
    height={h}
    fill={fillColor}
    className={styleProp}
    >
      <path d="M8,4H4A4,4,0,0,0,0,8v4a2,2,0,0,0,2,2H7.91A6.006,6.006,0,0,1,2,19a1,1,0,0,0,0,2,8.009,8.009,0,0,0,8-8V6A2,2,0,0,0,8,4Z"/>
      <path d="M22,4H18a4,4,0,0,0-4,4v4a2,2,0,0,0,2,2h5.91A6.006,6.006,0,0,1,16,19a1,1,0,0,0,0,2,8.009,8.009,0,0,0,8-8V6A2,2,0,0,0,22,4Z"/>
    </svg>
    
  );
}

export function Google() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 300 1000 400"
    className='w-16 sm:w-20 md:w-32 lg:w-48 2xl:w-72 xl:w-60 h-auto'
    >
  <path fill='#B3B6B7' d="M212.38,463v26.67h64.09c-3.18,37.22-34.43,53.14-64.09,53.14-37.82,0-70.86-29.45-70.86-70.86,0-40.2,31.45-71.25,70.86-71.25,30.45,0,48.37,19.3,48.37,19.3l18.71-19.3S255.37,374,211.38,374c-56.13,0-99.32,46.78-99.32,97.34,0,49.56,40.8,97.93,100.72,97.93,52.74,0,91.36-35.83,91.36-88.78a82.92,82.92,0,0,0-1.59-17.71ZM377,443.87c-37.22,0-63.7,28.66-63.7,62.3,0,34,25.88,63.3,64.1,63.3,34.63,0,63.1-26.28,63.1-62.5C440.68,465.17,407.64,443.87,377,443.87Zm.4,24.48c18.31,0,35.63,14.53,35.63,38.22,0,23.09-17.32,38-35.63,38-20.31,0-36.23-16.13-36.23-38.22C341.16,484.67,356.89,468.35,377.39,468.35Zm138.33-24.48c-37.22,0-63.69,28.66-63.69,62.3,0,34,25.88,63.3,64.09,63.3,34.64,0,63.1-26.28,63.1-62.5C579.22,465.17,546.18,443.87,515.72,443.87Zm.4,24.48c18.32,0,35.63,14.53,35.63,38.22,0,23.09-17.32,38-35.63,38-20.3,0-36.22-16.13-36.22-38.22C479.7,484.67,495.42,468.35,516.12,468.35Zm135.55-24.48c-34,0-60.9,29.46-60.9,62.7,0,37.82,31.05,62.9,60.31,62.9,18.11,0,27.66-7.17,34.83-15.33v12.34c0,21.7-13.34,34.64-33.24,34.64-19.31,0-29.06-14.34-32.45-22.3L595.94,589c8.56,18.12,26.08,37,56.93,37,33.84,0,59.71-21.1,59.71-65.49V447.65H685.91V458.2c-8.36-8.76-19.51-14.33-34.24-14.33Zm2.39,24.68c16.72,0,33.84,14.13,33.84,38.22,0,24.48-17.12,38-34.24,38-18.11,0-35-14.53-35-37.82,0-24.09,17.52-38.42,35.43-38.42Zm176.56-24.88c-32,0-59.12,25.28-59.12,62.7,0,39.61,30.06,62.9,62.3,62.9,26.87,0,43.19-14.53,53.15-27.47l-21.9-14.53c-5.77,8.76-15.13,17.32-31,17.32-17.91,0-26.08-9.76-31-19.11l85-34.84-4.38-10.15c-8.56-20.1-27.67-36.82-52.94-36.82Zm1,24.08c11.55,0,19.91,6.17,23.49,13.34l-56.73,23.49C796,486.46,813.3,467.75,831.61,467.75ZM730.89,565.69h27.87V380.57H730.89Z"/>
</svg>
  );
}

export function Cocacola() {
  return (
    <svg 
    version="1.1" 
    id="Layer_1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    x="0px" y="0px"
    viewBox="0 300 1000 400"
    xmlSpace="preserve"
    className='w-16 sm:w-20 md:w-32 lg:w-48 2xl:w-72 xl:w-60 h-auto'
    fill='#B3B6B7'
    >
 <g>
   <g>
     <g>
       <g>
         <g>
           <g>
             <path className="st0" d="M104.4,476.5c24.1-44.6,65.8-93.3,115-109.6c10.1-2.5,23.5-5.4,32.5,1.6c8,5.9,9,16,7.2,25.1
               c-2.4,10.8-9.7,24.4-22.1,26.1c-2.2,0-4.1-0.8-5.5-2.3c-3.2-3.1-3-7.7-2.3-11.8c2-8.5,9.9-17.6,19-18.8c1.6-1,0.9-2.9,0.5-4.2
               c-1.2-1.9-2.6-3.3-4.9-3.8c-9.9-1.1-17.3,5-24.9,10.2c-28.7,23.1-49.6,52.8-67.1,82.3c-14.3,26.6-26.5,54.1-30,85.1
               c-1.7,22.5,5.4,44.6,25.4,55.5c21.7,11.5,49.8,3.7,71.6-2.2l20-6.1l38.4-11.4c36.4-10.6,82.1-13,117.6,1.1
               c21.5,9,43.7,21.2,57.7,42.4c0,0.6,0,1.2-0.7,1.1c-30.5-8.3-70.2-16.6-100.4-2.1l-1.4-0.3c-9.2-14.7-24.7-22.8-40.5-26
               c-51.3-5-93.4,19.3-141.6,25.4c-24.4,2.2-50.6,1.5-67.6-17.2c-26.9-26.8-23.7-74.2-10.9-106.6
               C93.5,498.4,98.7,487.3,104.4,476.5z"/>
             <path className="st0" d="M175.1,492.5c12.7-23.4,32.3-51.9,59.2-60.5c7.2-1.6,15-0.9,20.5,3.8c11.6,11.6,7.1,31.4,3.2,45.1
               c0,0.8,0.7,1.7,1.4,1.8c10.3-0.3,18.7-5.1,26.1-12.2c16-17.9,33.2-41.4,59.3-38.6c4.9,0.8,9.6,3.6,12.2,8.1
               c6.6,13.1,0.1,27.6-8.9,37.7c-3.5,3.3-7.8,5.9-12.8,4.3c-2-0.7-3.7-2.7-4.4-4.7c-1.9-9.2,3.5-17.7,11-22.6
               c2.1-2.1,8.5-0.6,6.8-5.4c-1.3-1.9-3.3-2.1-5.4-2.1c-12.7,5.3-20.9,18.2-28.3,29.1c-9.3,14.5-16.8,29.9-21.7,46.2
               c-1.4,5.9-3,13.5,0.4,19c2.5,3.4,6.8,4.9,11.1,3.8c12.6-5,23.6-15,33.2-25.4c22-26.3,33.6-58.9,63-80.3
               c9.1-6.3,22-11.1,33-5.3c1.8,0.7,3.2,3,5.4,2.1c1.8-1.8,3-5.5,6.6-4.6c8.1,0.1,17.4-0.3,25.7,0.5l0.6,0.8l-2.3,5.6l-45.6,92.6
               c-0.4,1-0.6,2.3-0.3,3.4c0.8,1.3,2.4,1.2,3.7,0.8c6.6-3.8,11.7-10.7,16.3-16.6c4-5.5,7.6-11.3,10.5-17.4
               c1.2-1.8,2.7-4,5.1-3.6c2.6,0.3,5.8-0.8,7.7,1c-2.9,7.8-7.5,14.8-11.5,22.2c-12.4,19-28.6,41.2-51.3,46.9
               c-3.8,0.4-8.4,0.7-11.3-2c-4.4-3.3-4.6-8.7-5.8-13.4c-0.4-0.6-1.2-0.7-1.9-0.5c-9.7,8.7-19.7,17.5-33.3,15.8
               c-4.2-0.9-8.2-4.1-10.1-8.1c-3.5-6.8-1.8-15.5-2-23.1c-0.3-0.9-1.4-0.6-1.9-0.2C323,550.8,307,564,287.4,567.7
               c-9.1,1.1-17-1.6-23.1-8.1c-14.7-19.3-3.1-44.5,4.7-63.2c0.3-0.9,0.2-2.1-0.9-2.3c-5.3,0.4-10.4,1.3-15.5,2.1l-1.8,2
               c-12,22.2-24.9,45.6-46.4,62.1c-8.9,6.4-22.1,10.8-32.5,4.9c-10.9-7.5-11.8-20.8-10.4-33.1C164,518,169.1,505,175.1,492.5z
                M209.1,491.4c-6.3,12.6-12.6,25.4-12.9,40.3c0.7,2.8,2.3,6,5.4,6.8c3.3,0.9,6.1-0.9,8.7-2.5c12.2-10.3,20.7-24.3,27.7-37.9
               c0.6-1.3,1.6-3,0.8-4.4c-7.3-2.9-14.4-7.9-20-14.3l-1.2-0.2c-1.1,0.2-1.6,1.3-2.3,2.1L209.1,491.4z M228.1,465.7
               c0.4,6.7,6.6,12.5,12.5,14.7c1.4,0.4,3.8,1.6,5-0.2c2.2-4.2,3.6-8.9,4.7-13.5c1.1-6.1,2-14.3-3.8-18.3c-2-1.1-5-1.2-7.1-0.2
               C232.7,451.4,227.9,458.2,228.1,465.7z M378.4,517.4c-1.7,5.5-4.3,11.5-2.5,17.6c0.5,1.2,1.9,2.1,3.1,2.5
               c5,0.1,8.3-4.4,11.6-8c14.6-20.3,25.8-42.1,35.8-64.2c1.7-4.7,4.4-9,4.3-14.2c-0.1-1.1-1.2-1.9-2.1-2.4
               c-2.2-1-4.3,0.5-6.1,1.4c-19.7,15.1-30.3,36.9-40.1,57.5L378.4,517.4z"/>
             <path className="st0" d="M473.3,460.5c4.4-8.6,8-17.6,13.5-25.8c2.2-2.4,5.7-2.3,8.7-2.6l21.9,0.3l0.9,0.9
               c-3.7,8.8-7.7,17.4-12.3,25.8c-1.1,2.2-3.5,4.3-6,4.6c-8.9,0.2-18.3,0.7-26.7-0.1C472.3,462.7,473.1,461.5,473.3,460.5z"/>
             <path className="st0" d="M495.2,504.8c15.2-31.5,33.5-61.8,59.5-88.6c25.2-25.1,52.4-45.4,85.4-51.6c9-1.3,19.1-0.5,25.9,5.6
               c1.3,1.1,2.9,2.2,4.8,1.6c23.7-9.5,56.5-12.8,80.2-0.9c13.7,6.7,26.8,15.3,40,23.6c1.7,0.9,0.9,2.7,0,3.7
               c-7.6,8.4-13.9,17-20.7,25.8c-0.8,0.8-2,0.4-2.8,0l-34.9-24c-16.3-11-35-18.8-56.2-15.3c-2.3,1.2-1.2,4.1-1.6,6.3
               c0.5,21.8-7.2,40.7-17.7,58c-8.4,12.1-18.1,24.7-32.3,28.7c-6.2,1.3-12.2-0.6-16-5.6c-10.4-15.8-1.2-35.1,6.4-49.1
               c8.7-15.3,22.2-29.7,36.8-40.7c0.3-0.6,1-1.1,0.6-1.8c-1.4-1.4-3.9-0.6-5.7-0.2c-23.7,7.9-42.6,28.8-60.1,48.6
               c-31.2,38.4-54.9,80-68.3,125.8c-4.2,17.2-9.8,43.6,7.7,55.6c15.4,8.3,30.2-2.3,41.8-12.3c17.6-17.9,29.4-38.6,34.3-62
               c0.8-7,2.7-16.5-3.7-21.3c-5.8-2.6-10.5,2.2-14.4,6.2c-9,10.8-12.8,23.8-14.4,37.8c-4,3.3-8.8,5.4-13,8.6
               c-8,5.5-15.9,12.9-22.3,20.3c-0.8,0.2-0.9-0.7-1.1-1.1c-0.9-25.7,8.3-47.8,22.4-67.6c11.3-13.1,25.7-24.2,43.2-20
               c7.7,2,12.7,10.1,14.1,17.4c2.8,24.2-7.4,45.4-18.3,65.1c-17.6,27.7-45.5,55.7-80.7,52.3c-13.5-0.8-26.2-10.2-31.9-22.6
               c-13.3-26.6-4.1-60.7,4.8-86.4L495.2,504.8z M615.2,459c0.3,3,1.5,6.2,4.6,7.3c6,1.7,10.8-2.7,15.2-6.2
               c16-16.9,25.8-36.5,28.3-59.1c0-3.3,1.1-7.5-0.7-10.4c-1.3-0.2-2.8,0.3-3.9,1.1c-10.8,7.2-20.9,17.7-28.3,28.3
               C622.7,431.9,615.7,444.1,615.2,459z"/>
             <path className="st0" d="M637.7,534.3c12.8-16.9,29.9-35.4,51.4-36.8c5.4,0.1,10.2,2.4,13.5,6.9c9.2,13.6,1.4,31-1.9,44.7
               c-0.3,1.2,0.6,2.1,1.4,2.4c4.4,0.7,9.5,0,13.4-1.9l1.7-2.1c15.5-44.1,38.5-85.1,65.8-124.2c17.1-22.6,38.9-45.9,64.2-56.8
               c6-2.1,14.7-4.6,20.4-0.1c6.4,5.2,4.6,14.3,2.9,21.3c-0.7,6.2-7.6,6.9-12.1,8.3c-0.2-0.1-0.4,0-0.7-0.2c0.1-4,2.2-7.5,3-11.4
               c0.2-2.1,0.6-3.9-0.3-5.9c-1.1-2-3.5-1.3-5.2-0.8c-8.6,4.2-15.5,11.8-22,19.2c-24.5,28.4-42.3,60-58.6,91.9
               c-5.4,11.1-11,22-15.3,33.6c-0.1,0.7,0.1,1.1,0.7,1.6c3.8-0.1,6-4,8.9-6c21.6-19.6,39.1-42,55.3-64.8c3.5-1.7,7.4-1.6,11.4-2
               l0.8,0.2c-0.2,3.1-2.9,5.5-4.4,8.3c-18.1,26-38.6,50.9-63.5,73.6l-18,14.8c-3.8,3.3-3.9,8.4-5.8,12.6
               c-3.5,11.4-7,23.1-7.4,35.6c0.1,2.1,0.9,4.1,2.6,5.2c4.8,2.1,8.6-2.4,11.9-5.5c24.4-28.2,35.2-62.8,65-88.1
               c9.8-7.7,22.7-14.3,35.3-8.5c2.2,0.8,3.9,3.7,6.5,2.4c1.9-1.3,2-4.3,4.7-4.2c8.8-0.1,18.1-0.4,26.5,0.3c0.8,0.7,0.2,1.8,0,2.6
               l-6,12.2l-37.3,75.3c-1.7,3.4-3.9,7.1-3.7,11c0.6,1.7,2.3,1.8,3.8,1.5c7-3.9,12.1-10.3,16.7-16.8c4.6-6.4,8.3-13.2,12.6-19.7
               c2.3-1.1,5.5-0.6,8.1-0.3c1.5,1.4-0.5,3.3-0.8,5c-11,22.7-26.2,47.5-50.1,60.1c-5.6,2.8-13.2,5.3-19.3,1.9
               c-4.9-3.3-4.4-9.4-6.6-14.1c-0.4-0.7-1.6-0.6-2.1-0.2c-9.9,8.8-20.6,18.8-34.5,15c-8.6-4-9.6-14-10.2-22.6
               c-0.4-0.3-0.2-1-0.8-1.3l-1.1,0.4c-9.7,11.6-22,26.1-38.3,24.7c-6.2-0.5-11.6-6.5-13.5-12c-5.7-18.1,0.4-38,4.4-55.4
               c0-1-1.1-2-2-2.1l-13.7,0.2l-2.2,2.5c-10.1,19.7-21.1,38.8-38.5,55.2c-9.1,8.1-20.4,14.8-32.9,11.1
               c-10.4-4.5-13.1-15.8-13.1-26.5C610.9,578.7,623,556,637.7,534.3z M641.3,594.5c0.2,3.8,2.1,7.7,6,8.9
               c2.5,0.9,5.3-0.2,7.6-1.3c12.8-9.5,20.4-24.1,27.3-37.4c0.7-1.3,1.2-3.4-0.5-4.4c-6.6-3.4-13.1-8.6-18.4-14.5
               c-0.7-0.7-1.9-0.8-2.7-0.3c-4.8,6.4-7.9,13.5-11.3,20.6C645.4,575,641.3,583.9,641.3,594.5z M673.4,532.3
               c0.4,6.8,5.8,13.1,12,15.4c1.2,0.4,3.4,1,4.3-0.5c3.8-8.6,7.4-18.5,5.4-28.5c-0.8-2.3-2.8-4.7-5.2-5.5c-2.4-0.7-5,0.1-7.1,1.1
               C676.7,518.3,673.7,525.1,673.4,532.3z M795.8,591.5c-0.2,3.2-1,7.2,1.4,9.7c1.3,1.3,3.4,1.5,5.1,0.9
               c6.6-3.4,10.8-10.4,14.8-16.2c13.4-20.8,23.2-43.1,32.4-65.7c0.3-2,0.9-4.8-1-6.1c-5.4-2.6-9.7,3.4-13.7,6.3
               c-17.7,17.6-27.1,38.9-35.9,60.2L795.8,591.5z"/>
             <path className="st0" d="M821.6,426l11.8-15.3l1.8-1.5c34.2-0.7,60.9-21,84.9-45c-0.1,3.2-1.6,6.2-2.7,9.1
               c-15.8,37.1-54.1,69.7-95.5,70.3l-9.8-0.1c-1.8-0.4-0.5-2.2-0.1-3.1L821.6,426z"/>
           </g>
         </g>
       </g>
     </g>
   </g>
   <path className="st0" d="M864.7,622c0-4.6,3.5-8.1,8-8.1c4.4,0,7.9,3.5,7.9,8.1c0,4.7-3.5,8.2-7.9,8.2
     C868.2,630.2,864.7,626.7,864.7,622z M872.7,631.8c5.3,0,9.9-4.2,9.9-9.8c0-5.6-4.6-9.8-9.9-9.8c-5.4,0-10,4.2-10,9.8
     C862.8,627.7,867.3,631.8,872.7,631.8z M870.7,622.8h2l3,4.9h1.9l-3.2-5c1.7-0.2,2.9-1.1,2.9-3.1c0-2.2-1.3-3.2-4-3.2h-4.3v11.3
     h1.7V622.8z M870.7,621.3v-3.5h2.3c1.2,0,2.5,0.3,2.5,1.7c0,1.7-1.3,1.8-2.7,1.8H870.7z"/>
 </g>
 </svg> 
  );
}

export function Amazone() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 300 1000 400"
    className='w-16 sm:w-20 md:w-32 lg:w-48 2xl:w-72 xl:w-60 h-auto'
    fill='#B3B6B7'
    >
  <defs>
  <style>{`.cls-1{fill:"#888";} .cls-1, .cls-2{fill-rule:evenodd;}`}</style>
  </defs>
  <path className="cls-1" d="M595.93,567.68C549.78,601.8,482.66,620,424.77,620c-81.11,0-153.83-29.92-209.21-79.71-4.19-3.91-.56-9.23,4.76-6.15,59.57,34.68,133.13,55.38,209.2,55.38,51.18,0,107.68-10.63,159.7-32.72,7.83-3.08,14.26,5.31,6.71,10.9Z"/>
  <path className="cls-1" d="M615.23,545.59c-5.87-7.55-39.16-3.64-54-1.68-4.47.56-5.31-3.36-1.12-6.15,26.57-18.74,69.92-13.15,75-7s-1.4,49.79-26.29,70.49c-3.92,3.07-7.55,1.39-5.88-2.8C608.52,584.46,621.1,553.42,615.23,545.59Z"/>
  <path className="cls-2" d="M562.09,406.31V388.13a4.26,4.26,0,0,1,4.47-4.48h81.11a4.67,4.67,0,0,1,4.76,4.48v15.38c0,2.52-2.24,5.87-6.16,11.47l-41.95,59.85c15.66-.28,32.17,2,46.15,9.79,3.08,1.68,3.91,4.47,4.19,7v19.3c0,2.79-2.79,5.87-5.87,4.19-24.89-13.14-58.17-14.54-85.58.28-2.8,1.4-5.88-1.4-5.88-4.19V492.73c0-2.8,0-7.83,3.08-12.31l48.67-69.64H566.84a4.66,4.66,0,0,1-4.75-4.47ZM266.46,519H241.85a5.06,5.06,0,0,1-4.47-4.2V388.41a4.66,4.66,0,0,1,4.75-4.48h22.94a4.56,4.56,0,0,1,4.47,4.2v16.5h.56c5.87-15.94,17.34-23.5,32.44-23.5,15.39,0,25.18,7.56,31.89,23.5,5.87-15.94,19.58-23.5,34.12-23.5,10.35,0,21.53,4.2,28.53,14,7.83,10.63,6.15,26,6.15,39.71v80a4.66,4.66,0,0,1-4.75,4.48H374.14a4.81,4.81,0,0,1-4.47-4.48V447.7c0-5.31.56-18.74-.56-23.77-2-8.39-7.27-10.91-14.55-10.91a16.46,16.46,0,0,0-14.82,10.35c-2.52,6.43-2.24,17.06-2.24,24.33v67.12a4.66,4.66,0,0,1-4.75,4.48H308.14a4.81,4.81,0,0,1-4.48-4.48V447.7c0-14,2.24-35-15.1-35-17.62,0-17.06,20.14-17.06,35v67.12a4.92,4.92,0,0,1-5,4.2ZM722.35,381.13c36.64,0,56.49,31.33,56.49,71.32,0,38.6-21.81,69.37-56.49,69.37-35.8,0-55.38-31.33-55.38-70.48-.28-39.44,19.58-70.21,55.38-70.21Zm0,26c-18.18,0-19.3,24.89-19.3,40.27s-.28,48.38,19,48.38c19,0,20.14-26.57,20.14-42.79,0-10.62-.56-23.49-3.64-33.56-2.8-8.95-8.39-12.3-16.22-12.3ZM826.11,519H801.5a4.81,4.81,0,0,1-4.48-4.48V387.85a4.84,4.84,0,0,1,4.76-4.2h22.93a4.79,4.79,0,0,1,4.48,3.64v19.3h.56c7-17.34,16.5-25.46,33.56-25.46,10.91,0,21.81,3.92,28.81,14.83,6.43,10.07,6.43,27.13,6.43,39.43V515.1a4.61,4.61,0,0,1-4.76,3.92H869.18a5.08,5.08,0,0,1-4.47-3.92V446.3c0-14,1.67-34.12-15.39-34.12-5.87,0-11.46,3.91-14.26,10.07-3.36,7.83-3.92,15.38-3.92,24.05v68.24a5.12,5.12,0,0,1-5,4.48ZM497.48,458.61c0,9.51.28,17.62-4.47,26.29-3.92,7-10.07,11.18-17.06,11.18-9.51,0-15.11-7.27-15.11-17.9,0-21,18.74-24.89,36.64-24.89Zm24.89,60.13a5,5,0,0,1-5.87.56c-8.11-6.71-9.79-10.07-14.26-16.5-13.43,13.7-23.22,17.9-40.56,17.9-20.69,0-36.91-12.87-36.91-38.32,0-20.14,10.9-33.56,26.29-40.27,13.42-5.88,32.16-7,46.42-8.67v-3.08c0-5.87.56-12.87-3.07-17.9C491.33,408,485.74,406,480.7,406c-9.51,0-17.9,4.75-19.86,14.82-.56,2.24-1.95,4.47-4.19,4.47l-23.77-2.51c-2-.56-4.2-2-3.64-5,5.59-29.08,31.6-37.75,55.1-37.75,12,0,27.69,3.07,37.2,12.3,12,11.19,10.9,26.29,10.9,42.51v38.32c0,11.47,4.76,16.5,9.23,22.93,1.68,2.24,2,5,0,6.44-5.31,4.19-14.26,12-19.3,16.22ZM174.45,458.61c0,9.51.28,17.62-4.48,26.29-3.91,7-10.06,11.18-17.06,11.18-9.51,0-15.1-7.27-15.1-17.9,0-21,18.74-24.89,36.64-24.89Zm24.61,60.13a5,5,0,0,1-5.87.56c-8.11-6.71-9.79-10.07-14.27-16.5-13.42,13.7-23.21,17.9-40.55,17.9-20.7,0-36.92-12.87-36.92-38.32,0-20.14,10.91-33.56,26.29-40.27,13.43-5.88,32.17-7,46.43-8.67v-3.08c0-5.87.56-12.87-3.08-17.9C168,408,162.42,406,157.39,406c-9.51,0-17.9,4.75-19.86,14.82-.56,2.24-2,4.47-4.19,4.47l-23.78-2.51c-2-.56-4.19-2-3.63-5C111.52,388.69,137.53,380,161,380c12,0,27.69,3.07,37.2,12.3,12,11.19,10.91,26.29,10.91,42.51v38.32c0,11.47,4.75,16.5,9.23,22.93,1.68,2.24,2,5,0,6.44-5.31,4.19-14.26,12-19.3,16.22Z"/>
  </svg>
  );
}

export function Abnb() {
  return (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 300 1000 400" s="enableBbackground:new 0 0 1000 1000;" xmlSpace="preserve" className='w-16 sm:w-20 md:w-32 lg:w-48 2xl:w-72 xl:w-60 h-auto' fill='#B3B6B7' >

<path className="st0" d="M526,426.2c0,10.7-8.6,19.3-19.3,19.3c-10.7,0-19.3-8.6-19.3-19.3s8.6-19.3,19.3-19.3
	c10.6,0,19.3,8.6,19.3,19.2C526,426.1,526,426.1,526,426.2z M446.3,465v4.8c-7.4-8-17.9-12.3-28.7-11.9
	c-31.4-0.3-57.2,24.9-57.5,56.3c0,0.9,0,1.7,0,2.6c-1.1,31.4,23.5,57.8,54.9,58.9c0.9,0,1.7,0,2.6,0c10.9,0.5,21.5-4,28.7-12.2v5.1
	c0,2.3,1.8,4.1,4,4.1c0,0,0.1,0,0.1,0h24.1v-112h-23.9c-2.3,0.1-4.1,1.9-4.1,4.1L446.3,465z M446.3,536.7
	c-5.6,7.7-14.6,12.3-24.1,12.2c-19,0-33.6-11.9-33.6-32.1c0-20.2,14.5-32.1,33.6-32.1c9.5,0.1,18.4,4.6,24.1,12.2V536.7L446.3,536.7
	z M492.3,460.9h28.8v111.8h-28.8v-112V460.9z M918.7,457.9c-10.9-0.4-21.4,3.9-28.7,11.9V407h-28.8v165.6h24.1
	c2.3-0.1,4.1-1.9,4.1-4.1v-5.1c7.3,8.1,17.8,12.6,28.7,12.2c31.5,0.2,57.3-25.1,57.5-56.7c0-0.7,0-1.5,0-2.2
	c1-31.5-23.7-57.8-55.2-58.9c-0.8,0-1.6,0-2.3,0L918.7,457.9z M913.9,548.6c-9.5,0.1-18.6-4.4-24.1-12.2v-39.9
	c5.9-7.4,14.7-11.9,24.1-12.2c19,0,33.6,11.9,33.6,32.1S932.9,548.5,913.9,548.6L913.9,548.6z M846.7,506.4v66.6h-28.8v-63.3
	c0-18.5-5.8-25.9-22-25.9c-8.9,0.3-17.2,4.3-23,11v77.9h-28.8v-112h22.6c2.3,0.1,4.1,1.9,4.1,4.1v4.8c8-8,19-12.3,30.3-11.9
	c11.4-0.4,22.5,3.4,31.2,10.7c10.1,8.3,14,19,14,37.8L846.7,506.4z M675.1,457.9c-10.9-0.4-21.4,3.9-28.7,11.9v-62.7h-28.8v165.6
	h24.1c2.3-0.1,4.1-1.9,4.1-4.1v-5.1c7.3,8.1,17.8,12.6,28.8,12.2c31.5,0.2,57.3-25.1,57.5-56.7c0-0.7,0-1.5,0-2.2
	c1.2-31.3-23.2-57.6-54.5-58.8c-1,0-2-0.1-3,0L675.1,457.9z M670.3,548.6c-9.5,0.1-18.6-4.4-24.1-12.2v-39.9
	c5.9-7.4,14.7-11.9,24.1-12.2c19,0,33.6,11.9,33.6,32.1S689.4,548.5,670.3,548.6L670.3,548.6z M592.9,457.9
	c4.4-0.1,8.8,0.4,13.1,1.5v26.5c0,0-23.9-7.9-38.6,8.9v78.2h-28.8V460.7h24.1c2.3,0.1,4.1,1.9,4.1,4.1v4.8
	c6.8-7.1,16.1-11.3,25.9-11.9L592.9,457.9z M296.4,562.5l-4.5-10.7l-6.8-15.2l-0.3-0.3C264,491,242.1,446.2,219.1,402l-0.9-1.7
	l-7.1-14.3c-2.9-5.8-6.5-11.3-10.7-16.3c-9.2-11.6-23.3-18.3-38.1-18.2c-14.7,0-28.6,6.6-38.1,17.8c-4.1,5.1-7.7,10.6-10.7,16.3
	l-8,15.8c-23,44.6-45.2,89.8-65.7,134.4l-0.3,0.6c-1.7,4.9-4.1,9.9-6.6,15.2c-1.5,3.3-3,6.8-4.5,10.7c-3.8,10.2-5,21.3-3.6,32.1
	c3.3,22.1,17.9,40.9,38.6,49.3c7.6,3.2,15.8,4.8,24.1,4.8c2.6,0,5.2-0.2,7.7-0.6c10.5-1.3,20.6-4.8,29.7-10.1
	c13.9-8.3,26.3-18.7,36.9-30.9c10.6,12.2,23,22.6,36.9,30.9c9.1,5.3,19.2,8.8,29.7,10.1c2.6,0.3,5.1,0.5,7.7,0.6
	c8.3,0.1,16.5-1.5,24.1-4.8c20.7-8.5,35.4-27.2,38.6-49.3c2.2-10.6,1.3-21.7-2.7-31.8L296.4,562.5z M162.3,578
	c-16-20.2-26.5-39.2-30-55.3c-1.5-5.9-1.8-12.1-0.9-18.1c0.6-4.5,2.2-8.7,4.8-12.5c6-8.4,15.8-13.3,26.2-13.1
	c10.4-0.4,20.2,4.5,26.2,13.1c2.5,3.7,4.2,8,4.8,12.5c0.9,6,0.5,12.2-0.9,18.1C188.8,538.4,178.4,557.1,162.3,578L162.3,578z
	 M281,592c-2.3,15.5-12.6,28.6-27.1,34.5c-7.1,3-14.9,4.1-22.5,3.3c-8-1-15.7-3.6-22.6-7.7c-12.8-7.7-24.2-17.4-33.9-28.7
	c19.6-24.1,31.5-46.1,36-65.7c1.9-8.3,2.4-16.8,1.5-25.3c-1.1-7.3-3.9-14.2-8-20.2c-9.6-13.7-25.3-21.7-42-21.3
	c-16.6-0.2-32.2,7.7-41.9,21.1c-4.2,6-6.9,13-8,20.2c-1.3,8.4-0.7,17.1,1.5,25.3c4.5,19.6,16.7,41.9,36,66
	c-9.6,11.4-21.1,21.1-33.9,28.7c-6.9,4.2-14.6,6.9-22.7,7.9c-7.7,0.9-15.4-0.2-22.6-3c-14.5-5.9-24.8-19-27.1-34.5
	c-0.9-7.8,0-15.7,2.7-23c0.9-3,2.4-5.8,3.8-9.5c2.1-4.8,4.5-9.8,6.8-14.9l0.3-0.6c20.5-44.4,42.5-89.5,65.5-133.5l0.9-2.1l7.1-13.7
	c2.3-4.7,5.2-9.1,8.6-13.2c11.2-13.1,30.9-14.7,44-3.5c1.3,1.1,2.5,2.3,3.5,3.5c3.2,4,5.9,8.4,8.1,13.1l7.1,13.7l0.9,1.7
	c22.6,44.3,44.7,89.5,65.2,133.8v0.3c2.4,4.8,4.5,10.1,6.8,14.9c1.5,3.6,3,6.6,3.8,9.5C281.3,576.4,282,584.3,281,592L281,592z"/>
</svg>

  );
}

export function Apple() {
  return (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 300 1000 400" enableBackground="new 0 0 1000 1000" xmlSpace="preserve" 
   className='w-16 sm:w-20 2xl:w-72 xl:w-60 md:w-32 lg:w-48 h-auto'
   fill='#B3B6B7'
   height="0%"
   >
<g>
	<path d="M244.5,510.3c-0.4-41.4,33.8-61.2,35.3-62.2c-19.2-28.1-49.1-32-59.8-32.4c-25.4-2.6-49.6,15-62.6,15s-32.8-14.6-53.9-14.2
		c-27.8,0.4-53.4,16.1-67.7,41c-28.8,49.9-7.3,124.1,20.8,164.6c13.8,19.8,30.1,42.2,51.6,41.4c20.7-0.8,28.5-13.4,53.5-13.4
		s32.1,13.4,53.9,13c22.3-0.4,36.4-20.3,50-40.2c15.7-23.1,22.2-45.3,22.6-46.5C287.9,576.1,245,559.7,244.5,510.3"/>
	<path d="M203.4,388.8c11.4-13.8,19.1-33,17-52.2c-16.4,0.7-36.4,11-48.1,24.8c-10.6,12.2-19.8,31.8-17.3,50.6
		C173.2,413.3,192,402.6,203.4,388.8 M388.7,550.9l-18.9,57.4h-24.3L407.4,426h28.4L498,608.3h-25.2l-19.5-57.4H388.7z M448.5,532.5
		L430.6,480c-4.1-11.9-6.7-22.7-9.5-33.3h-0.5c-2.7,10.8-5.7,21.9-9.2,33l-17.8,52.7L448.5,532.5z M516.4,520.1
		c0-16.8-0.5-30.3-1.1-42.7h21.4l1.1,22.5h0.5c9.7-16,25.2-25.4,46.5-25.4c31.7,0,55.4,26.8,55.4,66.6c0,47.1-28.7,70.3-59.5,70.3
		c-17.3,0-32.5-7.6-40.3-20.5H540v71.1h-23.5V520.1z M539.9,555c0,3.5,0.5,6.7,1.1,9.7c4.3,16.5,18.7,27.9,35.7,27.9
		c25.2,0,39.8-20.5,39.8-50.6c0-26.3-13.8-48.7-39-48.7c-16.2,0-31.3,11.6-36,29.5c-0.8,3-1.6,6.5-1.6,9.7L539.9,555L539.9,555z
		 M664.9,520.1c0-16.8-0.5-30.3-1.1-42.7h21.4l1.1,22.5h0.5c9.7-16,25.2-25.4,46.5-25.4c31.7,0,55.4,26.8,55.4,66.6
		c0,47.1-28.7,70.3-59.5,70.3c-17.3,0-32.5-7.6-40.3-20.5h-0.5v71.1h-23.5V520.1z M688.4,555c0,3.5,0.5,6.7,1.1,9.7
		c4.3,16.5,18.7,27.9,35.7,27.9c25.2,0,39.8-20.5,39.8-50.6c0-26.3-13.8-48.7-39-48.7c-16.2,0-31.3,11.6-36,29.5
		c-0.8,3-1.6,6.5-1.6,9.7L688.4,555L688.4,555z M813.4,416.2h23.8v192h-23.8V416.2z M885.1,547.1c0.5,32.2,21.1,45.5,44.9,45.5
		c17,0,27.3-3,36.2-6.7l4.1,17c-8.4,3.8-22.7,8.1-43.5,8.1c-40.3,0-64.4-26.5-64.4-66s23.3-70.6,61.4-70.6
		c42.7,0,54.1,37.6,54.1,61.7c0,4.9-0.5,8.6-0.8,11.1L885.1,547.1L885.1,547.1z M954.9,530.1c0.3-15.1-6.2-38.7-33-38.7
		c-24.1,0-34.6,22.2-36.5,38.7H954.9z"/>
</g>
</svg>

  );
}

export function Zanotti({fillColor, h, w, styleProp}) {
  return (
    <svg 
    version="1.0" 
    id="Layer_1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    x="0px" 
    y="0px"
    className='w-28'
    viewBox="0 0 280 300"
    xmlSpace="preserve">
    <path id="path946" display="none" fill="#FFFFFF" d="M-480.58-97.42c0-113.25,0-226.49,0-339.75c160.19,0,320.39,0,480.58,0
   C0-323.91,0-210.67,0-97.42C-160.19-97.42-320.39-97.42-480.58-97.42z"/>
  <g>
   <path fill="#231F20" d="M66.25,110.37c0,0,10.81-6.91,17.56-1.16c6.75,5.75,6,19,5,26.01c-1,7-10,78.77-10,78.77
     s-1.75,9.5,0.25,16.75c2,7.25,2,7.25,2,7.25s1.5,3.75-1.5,5s-8-12.5-6.5-22.75c1.5-10.25,11.25-92.02,11.25-92.02
     s2.8-12.96-1.75-15.75c-5.56-3.41-16,4.5-16,4.5l-13.25,9c0,0-6.5,4.5-11,1.25c-4.5-3.25,2-14.75,2-14.75s18.75-32.26,31.51-44.01
     c0,0,5.75-5.25,8.75-5.25c3,0,5,2.75,7,5.25c2,2.5-1.25,2.75-2.5,1c-1.25-1.75-4.25-0.75-7.25,1.25c-3,2-14.25,16-18.75,23
     c-4.5,7-13.24,19.79-14.75,24.01c-0.88,2.46-2.75,6,1.75,3.5C54.55,118.71,66.25,110.37,66.25,110.37z"/>
   <path fill="#231F20" d="M99.23,91.03c1.21-0.64,4.07-0.5,3.89,1.76c-0.17,2.04-3.67,2.95-4.51,2.11
     C97.77,94.06,97.2,92.11,99.23,91.03z"/>
   <path fill="#231F20" d="M101.72,106.59c0,0,0.33-4.76,2.28-2.15c1.96,2.61,3,5.48,3.13,6.98c0.13,1.5,0.13,2.41,1.04,2.35
     c0.91-0.07,1.5-0.13,1.96-2.22c0.46-2.09,0.2-5.41,1.5-5.8c1.3-0.39,1.5,2.67,2.48,3.19c0.98,0.52,2.54,2.22,3.72,2.54
     c1.17,0.33,2.48,0.65,2.48-1.56c0-2.22,1.96-8.54,2.93-10.3c0.98-1.76,1.3-2.8,1.43-3.39c0.13-0.59,0.2-1.5,1.24-1.76
     s1.83,0.85,2.41,1.43c0.59,0.59,2.87,1.11,1.83,3.65c-1.04,2.54-2.54,5.28-4.5,21.26c-0.27,2.21-3,30.91-3,30.91
     s-0.39,2.48-0.2,2.61c0.2,0.13,0.85-1.76,1.24-3.52c0.39-1.76,6-25.43,6.39-26.6c0.39-1.17,8.67-35.27,10.11-37.82
     c1.43-2.54,2.74-3.39,3.33-2.93c0.59,0.46,1.7,1.3,0.98,7.82c-0.72,6.52-3.91,32.99-3.46,33.97c0.46,0.98,0.91,2.35,2.74,0.2
     c1.83-2.15,13.8-19.05,58.41-47.81c2.7-1.74,36.35-21.59,37.03-20.66c0.67,0.93-3.54,3.12-3.54,3.12s-43.78,25.22-69.75,49.01
     c-0.97,0.89-26.91,23.11-27.16,37.62c-0.05,3.08-0.67,3.8-1.35,3.8c-0.67,0-4.22-3.8-0.76-32.47c0.21-1.76,2.02-11.72,0.67-11.81
     s-3.54,13.92-3.54,13.92s-8.6,35.09-11.47,53.64c-0.65,4.24-3.63,21.17-3.88,23.28c-0.25,2.11-0.67,5.65-1.86,5.9
     c-1.18,0.25-2.11-5.06-2.02-7.34s3.21-41.84,3.63-46.31s2.36-27.24,1.6-33.4c0,0-0.08-1.18-1.27-1.35
     c-1.18-0.17-3.21,5.65-3.8,6.75s-0.93,2.28-2.87,2.36s-2.95-3.21-2.95-3.21s-0.84-2.19-1.94-2.19s-0.76,4.72-0.76,4.72
     s0.25,3.88-2.7,3.88s-4.22-3.71-3.88-6.16S101.87,112.86,101.72,106.59z"/>
 </g>
 </svg>
    
  );
}


export function Success({fillColor, h, w, styleProp}) {
  return (
    <div>
      <svg 
      xmlns="http://www.w3.org/2000/svg" 
      id="Layer_1" 
      data-name="Layer 1" 
      viewBox="0 0 24 24" 
      width={w}
      height={h}
      fill={fillColor}
      className={styleProp}
      >
      <path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm-.091,15.419c-.387.387-.896.58-1.407.58s-1.025-.195-1.416-.585l-2.782-2.696,1.393-1.437,2.793,2.707,5.809-5.701,1.404,1.425-5.793,5.707Z"/>
      </svg>
    </div>
  );
}

export function Error({fillColor, h, w, styleProp}) {
  return (
  <svg 
  xmlns="http://www.w3.org/2000/svg" 
  id="Layer_1" 
  data-name="Layer 1" 
  viewBox="0 0 24 24" 
  width={w}
  height={h}
  fill={fillColor}
  className={styleProp}
  >
<path d="M24,12A12,12,0,1,1,12,0,12.013,12.013,0,0,1,24,12ZM13,5H11V15h2Zm0,12H11v2h2Z"/>
</svg>
  );
}

export function Envelop({fillColor, h, w, styleProp}) {
  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    id="Filled" 
    viewBox="0 0 24 24" 
    width={w} 
    height={h}
    fill={fillColor}
    className={styleProp}
    >
      <path d="M23.954,5.542,15.536,13.96a5.007,5.007,0,0,1-7.072,0L.046,5.542C.032,5.7,0,5.843,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6C24,5.843,23.968,5.7,23.954,5.542Z"/>
      <path d="M14.122,12.546l9.134-9.135A4.986,4.986,0,0,0,19,1H5A4.986,4.986,0,0,0,.744,3.411l9.134,9.135A3.007,3.007,0,0,0,14.122,12.546Z"/>
    </svg>
  );
}

export function Verified({fillColor, styleProp}) {
  return (
    <svg 
    id="Layer_1" 
    data-name="Layer 1" 
    xmlns="http://www.w3.org/2000/svg" 
    fill={fillColor}
    className={styleProp}
    viewBox="0 0 122.88 116.87">
      <path class="cls-1" d="M61.37,8.24,80.43,0,90.88,17.78l20.27,4.54-2,20.53,13.73,15.58L109.2,73.87l2,20.68L91,99,80.43,116.87l-18.92-8.25-19.06,8.25L32,99.08,11.73,94.55l2-20.54L0,58.43,13.68,43,11.73,22.32l20.15-4.45L42.45,0,61.37,8.24ZM37.44,64.55c-6.07-6.53,3.25-16.26,10-10.1,2.38,2.17,5.84,5.34,8.24,7.49L74.18,39.18C80.62,32.53,90.79,42.3,84.43,49L61.2,76.72a7.13,7.13,0,0,1-9.91.44C47.35,73.41,41.57,68,37.44,64.55Z"/>
    </svg>
  );
}




