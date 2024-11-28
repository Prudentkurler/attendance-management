"use client"

import ViewUsers from '@/components/user-registration/viewUsers'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Page = ()=>{

    const navigate = useRouter()
    const handleNavigation = () =>{
        navigate.back()
    }
    return(
            <div className='p-3 flex flex-col gap-6 w-full'>
                <Button className='w-[120px] font-semibold bg-ds-primary text-ds-foreground hover:bg-ds-primary-dark' onClick={handleNavigation}>Back</Button>
                <h2>Archives</h2>
                <ViewUsers/>

                
                </div>
    )
}

export default Page;