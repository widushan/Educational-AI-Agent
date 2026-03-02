"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from '@/components/ui/button';
import RoadmapCanvas from '../_components/RoadmapCanvas';


function RoadmapGeneratorAgent() {

    const { roadmapid } = useParams();
    const [roadMapDetail, setRoadMapDetail] = useState<any>();

    useEffect(() => {
      roadmapid && GetRoadmapDetails();
    }, [roadmapid])

    const GetRoadmapDetails = async() => {
      const result = await axios.get('/api/history?recordId=' + roadmapid);
      console.log(result.data);
      setRoadMapDetail(result.data?.content);
    }

    return (

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className='border rounded-xl p-5'>
            <h2 className='font-bold text-2xl'>{roadMapDetail?.roadmapTitle}</h2>
            <p className='mt-3 text-gray-500'> <strong>Description</strong> : <br /> {roadMapDetail?.description}</p>
            <h2 className='mt-5 font-medium text-blue-600'>Duration : {roadMapDetail?.duration}</h2>

            <Button className='mt-5 w-full'>+ Create Another Roadmap</Button>
        </div>
        <div className="md:grid-cols-2">
          <RoadmapCanvas />
        </div>
      </div>

    )
}

export default RoadmapGeneratorAgent