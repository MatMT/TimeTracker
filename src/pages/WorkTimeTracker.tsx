import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import '../styles/work-time-tracker.css'

export default function WorkTimeTracker() {
    const [currentTask, setCurrentTask] = useState('')

    return (
        <div className="work-time-tracker w-80 p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User profile" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-xl font-semibold">John Doe</h2>
                    <p className="text-sm text-muted-text-color">Age: 28</p>
                </div>
            </div>
            <div className="mb-4">
                <Input
                    placeholder="What are you working on?"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                    className="w-full"
                />
            </div>
            <div className="mb-4 h-20 overflow-y-auto bg-white p-2 rounded border">
                <ReactMarkdown>{currentTask}</ReactMarkdown>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Button className="bg-primary-color hover:bg-secondary-color text-white">Start</Button>
                <Button variant="outline" className="text-primary-color border-primary-color hover:bg-primary-color hover:text-white">Pause</Button>
                <Button variant="outline" className="text-primary-color border-primary-color hover:bg-primary-color hover:text-white">Resume</Button>
                <Button variant="destructive">End Journey</Button>
            </div>
        </div>
    )
}

