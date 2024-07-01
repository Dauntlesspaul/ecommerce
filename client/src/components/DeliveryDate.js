
export const date = () =>{
const currentDate = new Date()
const deliveryDate = new Date();
deliveryDate.setDate(currentDate.getDate() );
const year = deliveryDate.getFullYear();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const month = monthNames[deliveryDate.getMonth()];
const day = deliveryDate.getDate();
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayOfWeek = dayNames[deliveryDate.getDay()];
const formattedDay = day < 10 ? `0${day}` : day;
const date = `${dayOfWeek}, ${month}, ${formattedDay}, ${year}`;
return date;
}
export const dateFree = () =>{
    const currentDate = new Date()
    const deliveryDate = new Date();
    deliveryDate.setDate(currentDate.getDate() + 7);
    const year = deliveryDate.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[deliveryDate.getMonth()];
    const day = deliveryDate.getDate();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = dayNames[deliveryDate.getDay()];
    const formattedDay = day < 10 ? `0${day}` : day;
    const date = `${dayOfWeek}, ${month}, ${formattedDay}, ${year}`;
    return date;
    }
    export const dateTwo = () =>{
        const currentDate = new Date()
        const deliveryDate = new Date();
        deliveryDate.setDate(currentDate.getDate() + 2);
        const year = deliveryDate.getFullYear();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[deliveryDate.getMonth()];
        const day = deliveryDate.getDate();
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayOfWeek = dayNames[deliveryDate.getDay()];
        const formattedDay = day < 10 ? `0${day}` : day;
        const date = `${dayOfWeek}, ${month}, ${formattedDay}, ${year}`;
        return date;
        }
        export const deliveryDate1 = (dateString) => {
            const inputDate = new Date(dateString);
            const deliveryDate = new Date(inputDate);
            deliveryDate.setDate(inputDate.getDate());
            
            const year = deliveryDate.getFullYear();
            
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[deliveryDate.getMonth()];
            
            const day = deliveryDate.getDate();
            
            const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const dayOfWeek = dayNames[deliveryDate.getDay()];
            
            const formattedDay = day < 10 ? `0${day}` : day;
            
            const date = `${dayOfWeek}, ${month} ${formattedDay}, ${year}`;
            return date;
          }

          export const deliveryDate2 = (dateString) => {
            const inputDate = new Date(dateString);
            const deliveryDate = new Date(inputDate);
            deliveryDate.setDate(inputDate.getDate() + 2);
            
            const year = deliveryDate.getFullYear();
            
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[deliveryDate.getMonth()];
            
            const day = deliveryDate.getDate();
            
            const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const dayOfWeek = dayNames[deliveryDate.getDay()];
            
            const formattedDay = day < 10 ? `0${day}` : day;
            
            const date = `${dayOfWeek}, ${month} ${formattedDay}, ${year}`;
            return date;
          }
          export const deliveryDate5 = (dateString) => {
            const inputDate = new Date(dateString);
            const deliveryDate = new Date(inputDate);
            deliveryDate.setDate(inputDate.getDate() + 5);
            
            const year = deliveryDate.getFullYear();
            
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[deliveryDate.getMonth()];
            
            const day = deliveryDate.getDate();
            
            const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const dayOfWeek = dayNames[deliveryDate.getDay()];
            
            const formattedDay = day < 10 ? `0${day}` : day;
            
            const date = `${dayOfWeek}, ${month} ${formattedDay}, ${year}`;
            return date;
          }
          export const deliveryDate7 = (dateString) => {
            const inputDate = new Date(dateString);
            const deliveryDate = new Date(inputDate);
            deliveryDate.setDate(inputDate.getDate() + 7);
            
            const year = deliveryDate.getFullYear();
            
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[deliveryDate.getMonth()];
            
            const day = deliveryDate.getDate();
            
            const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const dayOfWeek = dayNames[deliveryDate.getDay()];
            
            const formattedDay = day < 10 ? `0${day}` : day;
            
            const date = `${dayOfWeek}, ${month} ${formattedDay}, ${year}`;
            return date;
          }