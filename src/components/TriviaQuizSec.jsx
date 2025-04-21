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
import { PulsatingButton } from './magicui/pulsating-button'
import { Link } from 'react-router-dom'
const TriviaQuizSec = () => {
    const [num, setNum] = useState(5);
    const [category, setCategory] = useState("")
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
        <CardTitle>Create a Basic Quiz🤔</CardTitle>
        <CardDescription>Choose the Number of Questions , a listed Category and get Started🚀</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Number">Number of Questions</Label>
                <Input
                        type="range"
                        min="5"
                        max="50"
                        value={num}
                        onChange={(e) => handleCreditChange(e.target.value)}
                        className="w-full accent-blue"
                    />
                    <Input
                        type="number"
                        min="5"
                        max="50"
                        value={num}
                        onChange={(e) => handleCreditChange(e.target.value)}
                        className="w-full p-2 border rounded-md mt-2"
                    />
            <Label htmlFor="category">Category</Label>
<Select onValueChange={setCategory}>
  <SelectTrigger id="category">
    <SelectValue placeholder="Select a Category" />
  </SelectTrigger>
  <SelectContent position="popper">
    <SelectItem value="9">General Knowledge</SelectItem>
    <SelectItem value="10">Entertainment: Books</SelectItem>
    <SelectItem value="11">Entertainment: Film</SelectItem>
    <SelectItem value="12">Entertainment: Music</SelectItem>
    <SelectItem value="13">Entertainment: Musicals & Theatres</SelectItem>
    <SelectItem value="14">Entertainment: Television</SelectItem>
    <SelectItem value="15">Entertainment: Video Games</SelectItem>
    <SelectItem value="16">Entertainment: Board Games</SelectItem>
    <SelectItem value="17">Science & Nature</SelectItem>
    <SelectItem value="18">Science: Computers</SelectItem>
    <SelectItem value="19">Science: Mathematics</SelectItem>
    <SelectItem value="20">Mythology</SelectItem>
    <SelectItem value="21">Sports</SelectItem>
    <SelectItem value="22">Geography</SelectItem>
    <SelectItem value="23">History</SelectItem>
    <SelectItem value="24">Politics</SelectItem>
    <SelectItem value="25">Art</SelectItem>
    <SelectItem value="26">Celebrities</SelectItem>
    <SelectItem value="27">Animals</SelectItem>
    <SelectItem value="28">Vehicles</SelectItem>
    <SelectItem value="29">Entertainment: Comics</SelectItem>
    <SelectItem value="30">Science: Gadgets</SelectItem>
    <SelectItem value="31">Entertainment: Japanese Anime & Manga</SelectItem>
    <SelectItem value="32">Entertainment: Cartoon & Animations</SelectItem>
  </SelectContent>
</Select>

            </div>
            <div>
                <Label className="mb-2">Choose Difficulty</Label>
                <RadioGroup defaultValue="easy" className="flex flex-row items-center justify-between" onValueChange={setDifficulty}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="easy" id="easy" />
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
                <RadioGroup defaultValue="multiple" className="flex flex-row items-center justify-evenly" onValueChange={setType}>
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
      <CardFooter className="flex justify-center">
      <Link
  to={`/quiz/trivia?num=${num}&category=${category}&difficulty=${difficulty}&type=${type}`}
  className="w-full"
>
  <Button className="w-full hover:cursor-pointer">Start Quiz</Button>
</Link>      </CardFooter>
    </Card>

    </div>
  )
}

export default TriviaQuizSec
