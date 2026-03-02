import React, {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2Icon, SparkleIcon } from 'lucide-react'
import axios from 'axios'
import { v4 } from 'uuid'
import { useRouter } from 'next/navigation'


function RoadmapGeneratorDialog({openDialog, setOpenDialog}:any) {

  const [userInput, setUserInput] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const GenerateRoadmap = async() =>{
    const roadmapId = v4();
    setLoading(true)
    try {
      const result = await axios.post('/api/ai-roadmap-agent', {
        roadmapId: roadmapId,
        userInput: userInput
      });
      console.log(result.data);
      router.push('/ai-tools/ai-roadmap-agent/' + roadmapId)
      setLoading(false)
    } catch (e) {
      setLoading(false);
      console.log(e)
    }
  }

  return (

    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Enter Position/Skills to Generate Your Roadmap</DialogTitle>
            <DialogDescription asChild>
                Type a target role or key skills to generate a personalized roadmap.
            </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <Input type="text" placeholder="e.g. AI/ML Engineer" 
              onChange={(event)=>setUserInput(event?.target.value)}/>
            </div>
            <DialogFooter>
              <Button variant={'outline'} onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button
                onClick={GenerateRoadmap}
                disabled={loading || !userInput}
              >
                {loading?<Loader2Icon className='animate-spin' />:<SparkleIcon />} Generate Roadmap
              </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

  )

}

export default RoadmapGeneratorDialog