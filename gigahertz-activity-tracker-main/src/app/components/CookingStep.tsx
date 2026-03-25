import { Timer } from "./Timer";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface CookingStepProps {
  stepNumber: number;
  instruction: string;
  timerDuration?: number;
  timerLabel?: string;
}

export function CookingStep({
  stepNumber,
  instruction,
  timerDuration,
  timerLabel,
}: CookingStepProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div
      className={`relative p-6 rounded-lg border-2 transition-all ${
        isCompleted ? "bg-green-50 border-green-300" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <button
            onClick={() => setIsCompleted(!isCompleted)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg transition-all ${
              isCompleted
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
          >
            {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : stepNumber}
          </button>
        </div>
        <div className="flex-1 space-y-3">
          <p
            className={`text-gray-800 leading-relaxed ${
              isCompleted ? "line-through text-gray-500" : ""
            }`}
          >
            {instruction}
          </p>
          {timerDuration && timerLabel && (
            <div className="relative">
              <Timer durationInSeconds={timerDuration} label={timerLabel} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
