import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from 'react-router-dom';

const TriviaQuizSec = () => {
  const [num, setNum] = useState(5);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [type, setType] = useState("multiple");

  const categories = [
    { value: "9", label: "General Knowledge" },
    { value: "10", label: "Books" },
    { value: "11", label: "Film" },
    { value: "12", label: "Music" },
    { value: "13", label: "Musicals & Theatres" },
    { value: "14", label: "Television" },
    { value: "15", label: "Video Games" },
    { value: "16", label: "Board Games" },
    { value: "17", label: "Science & Nature" },
    { value: "18", label: "Computers" },
    { value: "19", label: "Mathematics" },
    { value: "20", label: "Mythology" },
    { value: "21", label: "Sports" },
    { value: "22", label: "Geography" },
    { value: "23", label: "History" },
    { value: "24", label: "Politics" },
    { value: "25", label: "Art" },
    { value: "26", label: "Celebrities" },
    { value: "27", label: "Animals" },
    { value: "28", label: "Vehicles" },
    { value: "29", label: "Comics" },
    { value: "30", label: "Gadgets" },
    { value: "31", label: "Anime & Manga" },
    { value: "32", label: "Cartoons" },
  ];

  return (
    <div className="flex justify-center px-4 py-10">
      <Card className="w-full max-w-sm bg-white mt-[-29px] dark:bg-[#0d0d0d] text-black dark:text-white shadow-md">
        <CardHeader>
          <CardTitle>🧠 Trivia Quiz</CardTitle>
          <p className="text-sm mt-1">Pick your options and test your knowledge!</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Questions</Label>
            <Input type="range" min="5" max="50" value={num} onChange={(e) => setNum(Number(e.target.value))} />
            <Input type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} className="mt-1" />
          </div>

          <div>
            <Label>Category</Label>
            <Select onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Difficulty</Label>
            <RadioGroup value={difficulty} onValueChange={setDifficulty} className="flex justify-between">
              {["easy", "medium", "hard"].map((level) => (
                <div key={level} className="flex items-center space-x-1">
                  <RadioGroupItem value={level} id={level} />
                  <Label htmlFor={level}>{level}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label>Type</Label>
            <RadioGroup value={type} onValueChange={setType} className="flex justify-between">
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="multiple" id="multiple" />
                <Label htmlFor="multiple">MCQ</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="boolean" id="boolean" />
                <Label htmlFor="boolean">T/F</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>

        <CardFooter>
          <Link
            to={`/quiz/trivia?num=${num}&category=${category}&difficulty=${difficulty}&type=${type}`}
            className="w-full"
          >
            <Button className="w-full">Start Quiz</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TriviaQuizSec;
