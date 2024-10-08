import React from 'react'
import AllEvents from '../../components/Shop/AllEvents'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'

const ShopAllEvents = () => {
  return (
    <div><DashboardHeader/>
    <div className="flex justify-between w-full">
        <div className=" w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={5}/>
        </div>
        <div className="w-full justify-center flex">
            <AllEvents/>
        </div>
    </div></div>
  )
}

export default ShopAllEvents