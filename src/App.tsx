// src/App.tsx
import React, { useState } from 'react';
import { questions, Question } from './questions';
import './App.css';

interface Answer {
  question: string;
  answer: string | number;
}

const App: React.FC = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState<number | 'end'>(1);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAnswer = (answer: string | number) => {
    const currentQuestion = questions.find(q => q.id === currentQuestionId) as Question;
    const nextQuestionId = typeof currentQuestion.next === 'function' 
      ? currentQuestion.next(answer) 
      : currentQuestion.next[answer.toString().toLowerCase()];

    setAnswers([...answers, { question: currentQuestion.question, answer }]);
    setCurrentQuestionId(nextQuestionId);
  };

  const handleBack = () => {
    const lastAnswer = answers.pop();
    const lastQuestion = questions.find(q => q.question === lastAnswer?.question) as Question;
    setCurrentQuestionId(lastQuestion.id);
    setAnswers([...answers]);
  };

  const restart = () => {
    setCurrentQuestionId(1);
    setAnswers([]);
  };

  const currentQuestion = questions.find(q => q.id === currentQuestionId);

  if (currentQuestionId === 'end') {
    return (
      <div className="container text-center mt-5">
        <h2>Thank You</h2>
        <ul className="list-group mb-4">
          {answers.map((a, index) => (
            <li key={index} className="list-group-item">{a.question} - {a.answer}</li>
          ))}
        </ul>
        <button className="btn btn-primary" onClick={restart}>Home</button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>{currentQuestion?.question}</h2>
      <div className="answers my-4">
        {currentQuestion?.type === 'yesno' && (
          <div>
            <button className="btn btn-primary me-2" onClick={() => handleAnswer('Yes')}>Yes</button>
            <button className="btn btn-secondary" onClick={() => handleAnswer('No')}>No</button>
          </div>
        )}
        {currentQuestion?.type === 'number' && (
          <input 
            type="number" 
            className="form-control mt-2"
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleAnswer((e.target as HTMLInputElement).value);
            }} 
          />
        )}
      </div>
      {answers.length > 0 && (
        <button className="btn btn-warning mb-4" onClick={handleBack}>Back</button>
      )}
      <div className="history">
        <h3>Answers</h3>
        <ul className="list-group mb-4">
          {answers.map((a, index) => (
            <li key={index} className="list-group-item">{a.question} - {a.answer}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
