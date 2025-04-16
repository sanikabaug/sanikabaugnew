import React from 'react'
import RITopBar from '@/app/admin/rateandinventory/managerateandinventory/RITopBar'
import RIMainCont from '@/app/admin/rateandinventory/managerateandinventory/RIMainCont'

const ManageRateAndInventorPage = () => {
  return (
    <div className='h-full w-full p-2 pt-6 space-y-2 '>
            <div className='w-full'>
            <RITopBar />
            </div>
            <div className='flex w-[100%] overflow-hidden bg-foreground-50 rounded-xl shadow-xl '>
            <RIMainCont />     
            </div>
    </div>
  )
}

export default ManageRateAndInventorPage

