import React, { useState } from 'react'
 
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from 'react-router-dom'
const CustomQuizSec = () => {
    const [num, setNum] = useState(5);
    const [category, setCategory] = useState("any")
    const [difficulty, setDifficulty] = useState("easy")
    const [type, setType] = useState("multiple")
    const handleCreditChange = (value) => {
        const numericValue = Number(value);
            setNum(numericValue);
        
    };
  return (
    <div>
<Card className="w-[380px] bg-white dark:bg-[#0d0d0d] text-black dark:text-white sm:w-[400px]">
      <CardHeader>
        <CardTitle>Any Category of Your Choice🤗</CardTitle>
        <CardDescription>Just Describe us about the Category we will create for you🤖</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Number">Number of Questions</Label>
                <Input
                        type="range"
                        min="5"
                        max="100"
                        value={num}
                        onChange={(e) => handleCreditChange(e.target.value)}
                        className="w-full accent-blue"
                    />
                    <Input
                        type="number"
                        min="5"
                        max="100"
                        value={num}
                        onChange={(e) => handleCreditChange(e.target.value)}
                        className="w-full p-2 border rounded-md mt-2"
                    />
            <Label htmlFor="category">Category</Label>
<Input placeholder="Describe about your Category😎" onChange={(e) => setCategory(e.target.value)}/>
            </div>
            <div>
                <Label className="mb-2">Choose Difficulty</Label>
                <RadioGroup defaultValue="easy" className="flex flex-row items-center justify-between">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="easy" id="easy" onChange={setDifficulty} />
    <Label htmlFor="easy">Easy</Label>

  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="medium" id="medium" />
    <Label htmlFor="medium">Medium</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="hard" id="hard" />
    <Label htmlFor="hard">Hard</Label>
  </div>
</RadioGroup>

            </div>
            <div>
            <Label className="mb-2">Type</Label>
                <RadioGroup defaultValue="multiple" className="flex flex-row items-center justify-evenly" onChange={setType}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="multiple" id="multiple" />
    <Label htmlFor="multiple">MCQ</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="boolean" id="boolean" />
    <Label htmlFor="boolean">True/False</Label>
  </div>
</RadioGroup>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
      <Link
          to={`/quiz/custom?num=${num}&category=${category}&difficulty=${difficulty}&type=${type}`}
  className='w-full'
        >
        <Button className="w-full hover:cursor-pointer"> Start Quiz</Button></Link>
      </CardFooter>
    </Card>

    </div>
  )
}

export default CustomQuizSec
