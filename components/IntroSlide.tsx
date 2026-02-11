import React from 'react';

const IntroSlide: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-emerald-50 to-emerald-200 text-center p-8">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-emerald-400 max-w-3xl w-full">
        <h1 className="text-6xl font-black text-emerald-800 mb-8 leading-tight">
          지구를 지키는<br />
          <span className="text-emerald-600">초록 달력</span>
        </h1>
        <div className="text-9xl mb-8 animate-bounce">🌍</div>
        <p className="text-3xl font-bold text-slate-700 mb-4">
          우리가 함께 만드는 아름다운 지구
        </p>
        <p className="text-xl text-slate-500">
          화살표를 눌러서 시작해볼까요?
        </p>
      </div>
    </div>
  );
};

export default IntroSlide;
