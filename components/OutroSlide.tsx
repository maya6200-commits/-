import React from 'react';

const OutroSlide: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-t from-sky-100 to-sky-300 text-center p-8">
      <div className="bg-white p-12 rounded-full shadow-2xl border-8 border-sky-400 aspect-square flex flex-col items-center justify-center max-w-2xl w-full">
        <h2 className="text-5xl font-black text-sky-800 mb-6">참 잘했어요!</h2>
        <div className="text-8xl mb-6">👏</div>
        <p className="text-3xl font-bold text-slate-700 leading-relaxed">
          오늘 배운 내용을<br />
          꼭 기억하고 실천해요!
        </p>
      </div>
    </div>
  );
};

export default OutroSlide;
