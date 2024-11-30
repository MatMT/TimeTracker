import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useWorkSession from "@/hooks/useWorkSession.ts";

export default function WorkTimeTracker() {
    const [currentTask, setCurrentTask] = useState('')
    const { register, handleSubmit, reset } = useForm();
    const [todos, setTodos] = useLocalStorage('todos', []);
    const {
        startSession,
        pauseSession,
        resumeSession,
        endSession,
        totalHoursWorked,
        isSessionActive
    } = useWorkSession();

    const addTodo = () => {
        if (currentTask.trim()) {
            const newTodo = {
                task: currentTask,
                timestamp: new Date().toISOString(),
                id: Date.now()
            };
            setTodos([...todos, newTodo]);
            setCurrentTask(''); // Clear the input after adding
        }
    };

    const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));
    const clearTodos = () => setTodos([]);

    const handleEndSession = () => {
        endSession(todos);  // Pass todos when ending the session
        clearTodos();
    };

    return (
        <div className="work-time-tracker w-[40rem] p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User profile"/>
                    <AvatarFallback>MT</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-xl font-semibold">Mateo Elías</h2>
                    <p className="text-sm text-muted-text-color">Developer</p>
                </div>
            </div>
            <div className="mb-4 flex space-x-2">
                <Input
                    placeholder="What are you working on?"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                    className="w-full"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            addTodo();
                        }
                    }}
                />
                <Button onClick={addTodo} variant="secondary">Add Task</Button>
            </div>
            <div className="grid sm:grid-cols-4 grid-cols-1 gap-2">
                <Button
                    onClick={startSession}
                    className="bg-mint hover:bg-mint-hover border-primary-color text-white uppercase"
                    disabled={isSessionActive}
                >
                    Start
                </Button>
                <Button
                    onClick={pauseSession}
                    className="bg-pinia hover:bg-pinia-hover border-primary-color text-white uppercase"
                    disabled={!isSessionActive}
                >
                    Pause
                </Button>
                <Button
                    onClick={resumeSession}
                    className="bg-blackberry hover:bg-blackberry-hover border-primary-color text-white uppercase"
                    disabled={isSessionActive}
                >
                    Resume
                </Button>
                <Button
                    onClick={handleEndSession}
                    className="bg-strawberry hover:bg-strawberry-hover border-primary-color text-white uppercase"
                    disabled={!isSessionActive}
                >
                    End
                </Button>
            </div>
            {todos.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Today's Tasks</h3>
                    <ul className="space-y-2">
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="flex justify-between items-center bg-gray-100 p-2 rounded"
                            >
                                <span>{todo.task}</span>
                                <Button
                                    onClick={() => deleteTodo(todo.id)}
                                    variant="destructive"
                                    size="sm"
                                >
                                    Delete
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {isSessionActive && (
                <div className="mt-4 text-sm text-gray-600">
                    Total Hours Worked: {totalHoursWorked.toFixed(2)}
                </div>
            )}
        </div>
    )
}