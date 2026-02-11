import React from 'react';
import { MonthData } from '../types';

interface CalendarSlideProps {
  data: MonthData;
}

const CalendarSlide: React.FC<CalendarSlideProps> = ({ data }) => {
  const days = Array.from({ length: data.daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: data.startDayOffset }, (_, i) => i);

  const getEvent = (day: number) => data.events.find(e => e.day === day);

  return (
    <div className="h-full flex flex-col p-6 bg-amber-50">
      <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-md border-l-8 border-amber-400">
        <h2 className="text-6xl font-black text-amber-600 tracking-widest">{data.month}월</h2>
        <h3 className="text-4xl font-bold text-slate-600">{data.monthName}</h3>
      </header>

      <div className="flex-1 bg-white rounded-3xl shadow-lg p-6 grid grid-cols-7 grid-rows-6 gap-2 border-4 border-amber-200">
        {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
          <div key={d} className={`text-center font-bold text-2xl py-2 ${i === 0 ? 'text-red-500' : 'text-slate-700'}`}>
            {d}
          </div>
        ))}

        {blanks.map((b) => (
          <div key={`blank-${b}`} className="bg-slate-50 rounded-lg" />
        ))}

        {days.map((day) => {
          const event = getEvent(day);
          return (
            <div
              key={day}
              className={`relative rounded-xl p-2 flex flex-col justify-between transition-all duration-300
                ${event ? 'bg-green-100 border-2 border-green-400 shadow-md transform scale-105 z-10' : 'bg-slate-50 border border-slate-100 text-slate-400'}
              `}
            >
              <span className={`text-2xl font-bold ${event ? 'text-green-800' : ''}`}>{day}</span>
              {event && (
                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-1 animate-pulse">
                    {event.isMostImportant ? '⭐' : '🌿'}
                  </span>
                  <span className="text-sm font-bold text-green-900 text-center leading-tight break-keep">
                    {event.title}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-2xl font-bold text-slate-600 bg-white inline-block px-8 py-3 rounded-full shadow-sm">
          이번 달에는 <span className="text-green-600">{data.events.length}개</span>의 환경 기념일이 있어요!
        </p>
      </div>
    </div>
  );
};

export default CalendarSlide;
