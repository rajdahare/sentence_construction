import { useState, useEffect } from 'react';
import * as Progress from '@radix-ui/react-progress';

const Question = ({ question, onAnswer, timeRemaining, onTimeUp }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([]);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswers([]);
    setAvailableOptions([...question.options]);
  }, [question]);

  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  const handleOptionClick = (option) => {
    if (selectedAnswers.length < question.blanks) {
      setSelectedAnswers([...selectedAnswers, option]);
      setAvailableOptions(availableOptions.filter((opt) => opt !== option));
    }
  };

  const handleBlankClick = (index) => {
    const removedAnswer = selectedAnswers[index];
    if (removedAnswer) {
      setSelectedAnswers(selectedAnswers.filter((_, i) => i !== index));
      setAvailableOptions([...availableOptions, removedAnswer]);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswers.length === question.blanks) {
      onAnswer(selectedAnswers);
    }
  };

  const renderSentence = () => {
    const parts = question.sentence.split('___');
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <span
            onClick={() => handleBlankClick(index)}
            className={`inline-block min-w-[100px] mx-1 px-2 py-1 border-2 ${
              selectedAnswers[index]
                ? 'border-primary bg-primary/10 cursor-pointer hover:bg-primary/20'
                : 'border-gray-300'
            } rounded text-center`}
          >
            {selectedAnswers[index] || '___'}
          </span>
        )}
      </span>
    ));
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="mb-4">
        <Progress.Root
          className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200"
          value={(timeRemaining / 10) * 100}
        >
          <Progress.Indicator
            className="h-full w-full bg-primary transition-transform duration-300"
            style={{ transform: `translateX(-${100 - (timeRemaining / 30) * 100}%)` }}
          />
        </Progress.Root>
        <div className="text-right text-sm text-gray-500 mt-1">
          Time remaining: {timeRemaining}s
        </div>
      </div>

      <div className="mb-6 text-lg leading-relaxed">{renderSentence()}</div>

      <div className="flex flex-wrap gap-2 mb-6">
        {availableOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="btn btn-secondary"
            disabled={selectedAnswers.length >= question.blanks}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={selectedAnswers.length !== question.blanks}
        className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Answer
      </button>
    </div>
  );
};

export default Question; 