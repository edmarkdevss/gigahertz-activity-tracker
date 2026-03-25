import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

interface TimerProps {
  durationInSeconds: number;
  label: string;
}

export function Timer({ durationInSeconds, label }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    if (isFinished) {
      reset();
    } else {
      setIsRunning(!isRunning);
    }
  };

  const reset = () => {
    setTimeLeft(durationInSeconds);
    setIsRunning(false);
    setIsFinished(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((durationInSeconds - timeLeft) / durationInSeconds) * 100;

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all ${
        isFinished
          ? "bg-green-50 border-green-500"
          : isRunning
          ? "bg-blue-50 border-blue-500"
          : "bg-gray-50 border-gray-300"
      }`}
    >
      <Clock
        className={`w-5 h-5 ${
          isFinished ? "text-green-600" : isRunning ? "text-blue-600" : "text-gray-600"
        }`}
      />
      <div className="flex flex-col">
        <span className="text-xs text-gray-600">{label}</span>
        <span
          className={`text-lg font-mono font-semibold ${
            isFinished ? "text-green-700" : isRunning ? "text-blue-700" : "text-gray-800"
          }`}
        >
          {isFinished ? "Done!" : formatTime(timeLeft)}
        </span>
      </div>
      <div className="flex gap-2 ml-2">
        <button
          onClick={toggleTimer}
          className={`p-2 rounded-full transition-colors ${
            isFinished
              ? "bg-green-500 hover:bg-green-600"
              : isRunning
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-700 hover:bg-gray-800"
          } text-white`}
          aria-label={isFinished ? "Reset" : isRunning ? "Pause" : "Start"}
        >
          {isFinished ? (
            <RotateCcw className="w-4 h-4" />
          ) : isRunning ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>
        {(isRunning || timeLeft !== durationInSeconds) && !isFinished && (
          <button
            onClick={reset}
            className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 transition-colors"
            aria-label="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
      {/* Progress bar */}
      {!isFinished && timeLeft !== durationInSeconds && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden">
          <div
            className={`h-full transition-all ${isRunning ? "bg-blue-500" : "bg-gray-400"}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
