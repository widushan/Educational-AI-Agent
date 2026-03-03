"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { aiToolsList } from './AiTools';

function History() {

  const [userHistory, setUserHistory] = useState([]);

  useEffect(() => {
    GetHistory();
  }, [])

  const GetHistory = async() => {
    const result = await axios.get('/api/history')
    console.log(result.data)
    setUserHistory(result.data);
  }

  const GetAgentName = (path: string) => {
    const agent = aiToolsList.find(item => item.path === path);
    return agent;
  }

  return (

    <div className='mt-5 p-5 border rounded-xl'>

      <h2 className='font-bold text-lg'>Prvious History</h2>
      <p>What your previously work on, You can find here</p>

      {userHistory?.length == 0 ? 
        <div className='flex items-center justify-center mt-5 flex-col mt-6'>
          <Image src={'/bulb.png'} alt='idea' width={50} height={50} />
          <h2>You do not have any history.</h2>
          <Button className='mt-5'>Explore AI Tools</Button>
        </div>
      :
        <div>
          {userHistory?.map((history:any, index:number) => (
            <div className='flex justify-between items-center my-3 border p-3 rounded-lg'>
              <div key={index} className='flex gap-5'>
                <Image src={GetAgentName(history?.aiAgentType)?.icon} alt='image'
                  width={20} height={20} />
                <h2>{GetAgentName(history?.aiAgentType)?.name}</h2>
              </div>
              <h2>{history.createdAt}</h2>
            </div>
          ))}
        </div>
      }

    </div>

  )
}

export default History