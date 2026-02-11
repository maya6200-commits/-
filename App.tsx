import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { SlideType, SlideConfig } from './types';
import { CALENDAR_DATA } from './constants';
import IntroSlide from './components/IntroSlide';
import OutroSlide from './components/OutroSlide';
import CalendarSlide from './components/CalendarSlide';
import DetailSlide from './components/DetailSlide';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Flatten the data into a linear array of slides
  const slides: SlideConfig[] = useMemo(() => {
    const list: SlideConfig[] = [];
    
    // 1. Intro
    list.push({ id: 0, type: SlideType.INTRO });

    let idCounter = 1;
    
    // 2. Loop through months
    CALENDAR_DATA.forEach((month) => {
      // Month Calendar Slide
      list.push({
        id: idCounter++,
        type: SlideType.CALENDAR,
        monthData: month
      });

      // Detail Slides for "Most Important" events in that month
      const importantEvents = month.events.filter(e => e.isMostImportant);
      importantEvents.forEach(event => {
        list.push({
          id: idCounter++,
          type: SlideType.DETAIL,
          detailEvent: event,
          monthData: month
        });
      });
    });

    // 3. Outro
    list.push({ id: idCounter++, type: SlideType.OUTRO });

    return list;
  }, []);

  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  }, [currentSlideIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  }, [currentSlideIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const renderContent = () => {
    switch (currentSlide.type) {
      case SlideType.INTRO:
        return <IntroSlide />;
      case SlideType.CALENDAR:
        return currentSlide.monthData ? <CalendarSlide data={currentSlide.monthData} /> : null;
      case SlideType.DETAIL:
        return (currentSlide.detailEvent && currentSlide.monthData) ? (
          <DetailSlide event={currentSlide.detailEvent} monthData={currentSlide.monthData} />
        ) : null;
      case SlideType.OUTRO:
        return <OutroSlide />;
      default:
        return <div>Error loading slide</div>;
    }
  };

  const progressPercentage = ((currentSlideIndex + 1) / totalSlides) * 100;

  return (
    <div className="w-full h-screen bg-slate-100 flex flex-col overflow-hidden selection:bg-green-200">
      
      {/* Top Bar: Progress and Title */}
      <div className="bg-white shadow-sm p-2 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 px-4">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
            Eco
          </div>
          <span className="font-bold text-slate-700 hidden sm:inline">환경 달력 수업</span>
        </div>
        
        <div className="flex-1 mx-4 sm:mx-10">
          <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-green-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-center text-xs text-slate-400 mt-1">
            {currentSlideIndex + 1} / {totalSlides}
          </p>
        </div>

        <div className="px-4 text-slate-500 font-medium">
          {currentSlideIndex === 0 ? '시작' : 
           currentSlideIndex === totalSlides - 1 ? '종료' : 
           currentSlide.monthData?.monthName}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
      </main>

      {/* Navigation Controls (Fixed Bottom) */}
      <div className="absolute bottom-0 left-0 w-full p-4 pointer-events-none flex justify-between items-end pb-8 px-8">
        <button
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
          className={`
            pointer-events-auto flex items-center gap-2 bg-white text-slate-800 px-6 py-4 rounded-full shadow-xl 
            font-bold text-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed
            border-2 border-slate-200 hover:border-green-400
          `}
        >
          <ChevronLeft size={32} />
          이전
        </button>

        <button
          onClick={nextSlide}
          disabled={currentSlideIndex === totalSlides - 1}
          className={`
            pointer-events-auto flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full shadow-xl 
            font-bold text-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-0 disabled:cursor-not-allowed
            hover:bg-green-600 ring-4 ring-green-100
          `}
        >
          다음
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default App;
