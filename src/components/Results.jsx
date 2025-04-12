const Results = ({ userAnswers, questions, score, onReset }) => {
  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>
      
      <div className="mb-8 text-center">
        <div className="text-4xl font-bold text-primary mb-2">{score}/10</div>
        <div className="text-gray-600">Final Score</div>
      </div>

      <div className="space-y-6">
        {userAnswers.map((answer, index) => {
          const question = questions.find((q) => q.id === answer.questionId);
          return (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                answer.isCorrect ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="font-medium mb-2">
                Question {index + 1}: {question.sentence}
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Your answer: </span>
                  <span className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                    {answer.userAnswers.join(', ')}
                  </span>
                </div>
                
                {!answer.isCorrect && (
                  <div>
                    <span className="text-gray-600">Correct answer: </span>
                    <span className="text-green-600">
                      {question.correctAnswers.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onReset}
        className="btn btn-primary w-full mt-8"
      >
        Try Again
      </button>
    </div>
  );
};

export default Results; 