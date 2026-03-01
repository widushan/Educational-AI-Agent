import React from 'react'
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



function RoadmapGeneratorDialog({openDialog, setOpenDialog}:any) {

  return (

    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Enter Position/Skills to Generate Your Roadmap</DialogTitle>
            <DialogDescription>
                Type a target role or key skills to generate a personalized roadmap.
            </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <Input type="text" placeholder="e.g. AI/ML Engineer" />
            </div>
        </DialogContent>
    </Dialog>

  )

}

export default RoadmapGeneratorDialog