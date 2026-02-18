"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react'

function History() {

  const [userHistory, setUserHistory] = useState([]);

  return (

    <div className='mt-5 p-5 border rounded-xl'>

      <h2 className='font-bold text-lg'>Prvious History</h2>
      <p>What your previously work on, You can find here</p>

      {userHistory?.length == 0 && 
      <div className='flex items-center justify-center mt-5 flex-col mt-6'>
        <Image src={'/bulb.png'} alt='idea' width={50} height={50} />
        <h2>You do not have any history.</h2>
        <Button className='mt-5'>Explore AI Tools</Button>
      </div>
      }

    </div>

  )
}

export default History