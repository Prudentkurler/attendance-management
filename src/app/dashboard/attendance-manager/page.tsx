"use client"

import { CgSearch } from "react-icons/cg";
import { LuFilter } from "react-icons/lu";
import { BiSort } from "react-icons/bi";
import { FiSun } from "react-icons/fi";
import { PiUsersFill } from "react-icons/pi";
import { HiPlusCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { ImStopwatch } from "react-icons/im";
import { IoTrendingDown } from "react-icons/io5";
import { IoTrendingUp } from "react-icons/io5";
import { BsMoon } from "react-icons/bs";
import { TiCloudStorageOutline } from "react-icons/ti";
import LineChart from "@/components/attendance/LineChart";
import BarChart from "@/components/attendance/BarChart";
import StatsTable from "@/components/attendance/StatsTable";
import { Card, CardContent } from "@/components/ui/card";









const Page = ()=>{

    
  
    const [currentDate, setCurrentDate] = useState('');
    const updateCurrentDate = () => {
        const date = new Date();
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const day = date.getDate();
        const month = monthNames[date.getUTCMonth()];
        const year = date.getFullYear();

        if(day === 1){
            setCurrentDate(`${day}st ${month} ${year}`);
        }
        else if(day === 2){
            setCurrentDate(`${day}nd ${month} ${year}`);
        }
        else if(day === 3){
            setCurrentDate(`${day}rd ${month} ${year}`);
        }
        else{
            setCurrentDate(`${day}th ${month} ${year}`);
        }
        
      };
      

    useEffect(() => {
        updateCurrentDate(); 
        const intervalId = setInterval(updateCurrentDate, 3600); 

        return () => clearInterval(intervalId); 
    }, []);

 

      const REFERENCE_START_TIME = new Date();
REFERENCE_START_TIME.setHours(7, 0, 0, 0); // 9:00 AM





    return(

        <div className="py-4 md:px-8 px-4 flex flex-col gap-8">
            {/*Attendance Manager title and search bar*/}

            <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
                <h3 className="font-semibold">Atendance Manager</h3>
                <div className="flex relative">
                    <CgSearch className="absolute top-3 left-2"/>
                    <input type="text" placeholder="Search Database " className="py-1 px-4 border-2 pl-8 rounded-md placeholder:text-grey-300" />
                </div>
            </div>

            {/*Attendance Manager filters*/}
            <div className="flex gap-4 ">
                <Card className="flex gap-2 items-center rounded-md   p-2 hover:cursor-pointer">
                    <LuFilter className="text-gray-500 text-sm"/>
                    <p className="text-sm text-gray-900">Filter</p>
                </Card>
                <Card className="flex gap-2  items-center  rounded-md p-2">
                    <BiSort className="text-gray-500 text-sm"/>
                    <p className="text-gray-900 text-sm">Sort</p>
                </Card>
            </div>

            {/*stats section*/}

            <div className="flex flex-col md:flex-row gap-3 w-full  items-center">

                {/*one*/}
                <Card className="w-full md:w-1/3  h-[240px] flex gap-3 items-center justify-center rounded-lg ">
                  <FiSun className="text-6xl text-gray-400"/>
                  <div className="flex flex-col gap-1">
                    <p className="text-4xl text-gray-400 mt-8 font-semibold">8:02:09 AM</p>
                    <p className="text-md text-indigo-950 font-semibold">{currentDate}</p>
                  </div>
                </Card>
                
                {/*two*/}
                <div className=" w-full md:w-1/4 flex gap-4 flex-col ">
                <Card className="w-full  h-[50%] rounded-lg  p-5">
                        <div className="flex justify-between items-center w-full">
                            <p className="text-3xl text-indigo-950 ">425</p>
                            <div className="p-3 rounded-full flex items-center justify-center bg-blue-100">

                                <PiUsersFill className="text-orange-400" />
                            </div>
                        </div>
                        <p className="text-indigo-950 font-semibold text-md">Total Employees</p>
                        <div className="flex gap-1 items-center">
                            
                                <HiPlusCircle className="text-black-100 bg-teal-100 rounded-full"/>
                           
                            <p className="text-gray-800 text-sm opacity-80">2 new Employees added</p>
                        </div>
                    </Card>
                    <Card className="w-full  h-[50%] rounded-lg  p-5">
                        <div className="flex justify-between items-center w-full">
                            <p className="text-3xl text-indigo-950 ">62</p>
                            <div className="p-3 rounded-full flex items-center justify-center bg-blue-100">

                                <MdOutlineWatchLater className="text-orange-400" />
                            </div>
                        </div>
                        <p className="text-indigo-950 font-semibold text-md">Late Arrival</p>
                        <div className="flex gap-1 items-center">
                            
                                <IoTrendingDown className="text-black-100 p-1 bg-red-200 rounded-full"/>
                           
                            <p className="text-gray-800 text-sm opacity-80">3% increase than yesterday</p>
                        </div>
                    </Card>

                 
                </div>

                {/*three*/}

                <div className=" w-full md:w-1/4 flex gap-4 flex-col ">
                <Card className="w-full  h-[50%] rounded-lg  p-5">
                        <div className="flex justify-between items-center w-full">
                            <p className="text-3xl text-indigo-950 ">360</p>
                            <div className="p-3 rounded-full flex items-center justify-center bg-blue-100">

                                <ImStopwatch className="text-orange-400" />
                            </div>
                        </div>
                        <p className="text-indigo-950 font-semibold text-md">On Time</p>
                        <div className="flex gap-1 items-center">
                            
                                <IoTrendingUp className="text-black-100 bg-teal-100 rounded-full"/>
                           
                            <p className="text-gray-800 text-sm opacity-80">10% less yesterday</p>
                        </div>
                    </Card>
                    <Card className="w-full  h-[50%] rounded-lg  p-5">
                        <div className="flex justify-between items-center w-full">
                            <p className="text-3xl text-indigo-950 ">6</p>
                            <div className="p-3 rounded-full flex items-center justify-center bg-blue-100">

                                <BsMoon className="text-orange-400" />
                            </div>
                        </div>
                        <p className="text-indigo-950 font-semibold text-md">Early Departures</p>
                        <div className="flex gap-1 items-center">
                            
                                <HiPlusCircle className="text-black-100 bg-teal-100 rounded-full"/>
                           
                            <p className="text-gray-800 text-sm opacity-80">3% increase than yesterday</p>
                        </div>
                    </Card>

                 
                </div>

                
                {/*four*/}

                <div className="w-full md:w-1/4 flex gap-4 flex-col ">
                <Card className="w-full  h-[50%] rounded-lg  p-5">
                        <div className="flex justify-between items-center w-full">
                            <p className="text-3xl text-indigo-950 ">30</p>
                            <div className="p-3 rounded-full flex items-center justify-center bg-blue-100">

                                <TiCloudStorageOutline className="text-orange-400" />
                            </div>
                        </div>
                        <p className="text-indigo-950 font-semibold text-md">Absent</p>
                        <div className="flex gap-1 items-center">
                            
                        <IoTrendingDown className="text-black-100 p-1 bg-red-200 rounded-full"/>
                           
                            <p className="text-gray-800 text-sm opacity-80">3% increase than yesterday</p>
                        </div>
                    </Card>
                    <Card className="w-full  h-[50%] rounded-lg  p-5">

                  
                        <div className="flex justify-between items-center w-full">
                            <p className="text-3xl text-indigo-950 ">42</p>
                            <div className="p-3 rounded-full flex items-center justify-center bg-blue-100">

                                <ImStopwatch className="text-orange-400" />
                            </div>
                        </div>
                        <p className="text-indigo-950 font-semibold text-md">Time-Off</p>
                        <div className="flex gap-1 items-center">
                            
                                <HiPlusCircle className="text-black-100 bg-blue-100 rounded-full"/>
                           
                            <p className="text-gray-800 text-sm opacity-80">2% increase than yesterday</p>
                        </div>
                        </Card>

                 
                </div>

            </div>

            {/*Attendance Chart*/}

            <div className="w-full h-[400px] flex  flex-col md:flex-row gap-4 mt-8 ">
               
                <Card className="md:w-[60%] w-full shadow-lg rounded-lg p-2">
                    <CardContent className="w-full h-full">

                    <LineChart/>
                    </CardContent>
                </Card>
                <Card className="md:w-[40%] w-full h-[320px] md:h-full  p-4">
                    <CardContent className="w-full h-full">

                    <BarChart/>
                    </CardContent>
                </Card>
                
            </div>

            {/*Table section*/}

            <div>
             <StatsTable />  
            </div>

          
           
        </div>
    )
}

export default Page;