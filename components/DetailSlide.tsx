import React, { useState } from 'react';
import { EnvironmentalDate, MonthData } from '../types';
import { generateTeachingTip, generateQuiz } from '../services/geminiService';

interface DetailSlideProps {
  event: EnvironmentalDate;
  monthData: MonthData;
}

const DetailSlide: React.FC<DetailSlideProps> = ({ event, monthData }) => {
  const [aiTip, setAiTip] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<{ question: string; answer: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // Generate a consistent placeholder based on keyword or random
  const imageUrl = `https://picsum.photos/seed/${event.imageKeyword || event.title}/800/600`;

  const handleAskAI = async () => {
    setLoading(true);
    setAiTip(null);
    setQuiz(null);
    const tip = await generateTeachingTip(event.title, monthData.monthName);
    setAiTip(tip);
    setLoading(false);
  };

  const handleQuizAI = async () => {
    setLoading(true);
    setAiTip(null);
    setQuiz(null);
    setShowAnswer(false);
    const quizData = await generateQuiz(event.title);
    setQuiz(quizData);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col p-6 bg-emerald-50">
      <div className="flex-1 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border-4 border-emerald-200">
        
        {/* Image Section */}
        <div className="md:w-1/2 bg-slate-200 relative">
          <img 
            src={imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 font-bold px-6 py-2 rounded-full text-xl shadow-lg">
            {monthData.month}월 {event.day}일
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center relative">
          <h2 className="text-5xl font-black text-emerald-800 mb-6 leading-tight break-keep">
            {event.title}
          </h2>
          
          <div className="bg-emerald-50 p-6 rounded-2xl mb-6 border-l-8 border-emerald-500">
            <p className="text-3xl font-bold text-slate-700 leading-relaxed mb-4">
              "{event.description}"
            </p>
            <div className="flex items-center gap-4 text-emerald-700 bg-white p-4 rounded-xl shadow-sm">
              <span className="text-4xl">💪</span>
              <p className="text-2xl font-bold">실천해요: {event.actionItem}</p>
            </div>
          </div>

          {/* AI Teacher Assistant Area */}
          <div className="mt-auto border-t-2 border-slate-100 pt-6">
            <div className="flex gap-4 mb-4">
              <button 
                onClick={handleAskAI}
                disabled={loading}
                className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 py-3 px-4 rounded-xl font-bold text-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>🤖</span> AI 선생님 설명
              </button>
              <button 
                onClick={handleQuizAI}
                disabled={loading}
                className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-800 py-3 px-4 rounded-xl font-bold text-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>❓</span> AI 퀴즈
              </button>
            </div>

            {loading && <p className="text-center text-xl text-slate-500 animate-pulse">AI 선생님이 생각하고 있어요...</p>}

            {aiTip && (
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 animate-fade-in">
                <p className="text-xl text-indigo-900 leading-relaxed whitespace-pre-wrap">{aiTip}</p>
              </div>
            )}

            {quiz && (
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 animate-fade-in text-center">
                <p className="text-2xl font-bold text-orange-900 mb-4">Q. {quiz.question}</p>
                {!showAnswer ? (
                  <button 
                    onClick={() => setShowAnswer(true)}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600"
                  >
                    정답 확인하기
                  </button>
                ) : (
                  <p className="text-2xl font-bold text-red-600 animate-bounce">{quiz.answer}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSlide;
