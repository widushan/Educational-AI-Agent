"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { aiToolsList } from './AiTools';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

function History() {

  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetHistory();
  }, [])

  const GetHistory = async() => {
    setLoading(true)
    const result = await axios.get('/api/history')
    console.log(result.data)
    setUserHistory(result.data);
    setLoading(false)
  }

  const GetAgentName = (path: string) => {
    const agent = aiToolsList.find(item => item.path === path);
    return agent;
  }

  return (

    <div className='mt-5 p-5 border rounded-xl'>

      <h2 className='font-bold text-lg'>Prvious History</h2>
      <p>What your previously work on, You can find here</p>

      {loading &&
        <div>
          {[1, 2, 3, 4, 5].map((item, index) => (
              <div key={index}>
                <Skeleton className="h-[50px] mt-4 w-full rounded-md" />
              </div>
          ))}
        </div>
      }

      {userHistory?.length == 0 && !loading ? 
        <div className='flex items-center justify-center mt-5 flex-col mt-6'>
          <Image src={'/bulb.png'} alt='idea' width={50} height={50} />
          <h2>You do not have any history.</h2>
          <Button className='mt-5'>Explore AI Tools</Button>
        </div>
      :
        <div>
          {userHistory?.map((history: any, index: number) => {
            const agent = GetAgentName(history?.aiAgentType);
            const iconSrc = agent?.icon || "/bulb.png";

            return (
              <Link
                key={history?.recordId ?? index}
                href={history?.aiAgentType + "/" + history?.recordId}
                className="flex justify-between items-center my-3 border p-3 rounded-lg"
              >
                <div className="flex gap-5">
                  {agent ? (
                    <Image
                      src={iconSrc}
                      alt={agent.name}
                      width={20}
                      height={20}
                    />
                  ) : null}
                  <h2>{agent?.name ?? "Unknown Tool"}</h2>
                </div>
                <h2>{history.createdAt}</h2>
              </Link>
            );
          })}
        </div>
      }

    </div>

  )
}

export default History