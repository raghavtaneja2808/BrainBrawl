import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';

const CustomQuizSec = () => {
  const [num, setNum] = useState(5);
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("easy");
  const [type, setType] = useState("multiple");

  return (
    <div className="flex justify-center px-4 py-6">
     <Card className="mt-[-10px] w-xl bg-white dark:bg-[#0d0d0d] text-black dark:text-white shadow-md">

        <CardHeader>
          <CardTitle>🎯 Custom Quiz</CardTitle>
          <p className="text-sm mt-1">Pick your preferences below!</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Questions</Label>
            <Input type="range" min="5" max="100" value={num} onChange={(e) => setNum(Number(e.target.value))} />
            <Input type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} className="mt-1" />
          </div>

          <div>
            <Label>Category</Label>
            <Input placeholder="Your Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>

          <div>
            <Label>Difficulty</Label>
            <br className="md:hidden" /> {/* Adds break only in mobile view */}
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
          <Link to={`/quiz/custom?num=${num}&category=${category}&difficulty=${difficulty}&type=${type}`} className="w-full">
            <Button className="w-full">Start Quiz</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomQuizSec;
 