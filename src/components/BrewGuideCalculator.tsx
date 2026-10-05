import React, { useState, useEffect } from 'react';
import { BREW_GUIDES } from '../data/cafeData';
import { BrewGuide } from '../types/cafe';
import { Play, Pause, RotateCcw, Droplets, Thermometer, Clock, Scale } from 'lucide-react';

export const BrewGuideCalculator: React.FC = () => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>('v60');
  const [coffeeGrams, setCoffeeGrams] = useState<number>(18);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const guide = BREW_GUIDES.find((g) => g.id === selectedGuideId) || BREW_GUIDES[0];

  // Update default dose when apparatus changes
  const handleSelectGuide = (newGuide: BrewGuide) => {
    setSelectedGuideId(newGuide.id);
    setCoffeeGrams(newGuide.recommendedCoffee);
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  // Timer effect
  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculated values
  const waterGrams = Math.round(coffeeGrams * guide.ratio);
  const bloomGrams = Math.round(coffeeGrams * 2.8);
  const estimatedCups = (waterGrams / 220).toFixed(1);

  return (
    <section id="brew-guide" className="py-16 lg:py-24 bg-[#F4EFEB] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#A06D3B]">
            Barista Masterclass
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 [text-wrap:balance]">
            Interactive Brew Ratio Calculator
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Dial in single-origin beans at home with barista precision. Select your brewer, customize your coffee dose, and calculate exact water volume and timing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Equipment & Dosage Controls */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-6">
            
            {/* Apparatus Selector Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                1. Select Brewing Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BREW_GUIDES.map((b) => {
                  const isActive = b.id === selectedGuideId;
                  return (
                    <button
                      key={b.id}
                      onClick={() => handleSelectGuide(b)}
                      className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                        isActive
                          ? 'border-stone-900 bg-stone-900 text-white font-medium shadow-xs'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      <div className="text-xs font-semibold leading-snug">
                        {b.name.split('/')[0]}
                      </div>
                      <div className={`text-[11px] font-mono mt-1 ${isActive ? 'text-amber-200' : 'text-stone-500'}`}>
                        1:{b.ratio} ratio
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Coffee Dose Slider */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-stone-500" />
                  2. Coffee Dose
                </label>
                <div className="font-mono tabular-nums text-lg font-bold text-stone-900 bg-stone-100 px-3 py-1 rounded border border-stone-200">
                  {coffeeGrams}g
                </div>
              </div>

              <input
                type="range"
                min={12}
                max={50}
                step={1}
                value={coffeeGrams}
                onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                className="w-full accent-stone-900 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-stone-500 font-mono">
                <span>12g (Solo cup)</span>
                <span>24g (Pour for two)</span>
                <span>50g (Large pot)</span>
              </div>
            </div>

            {/* Calculated Output Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-stone-100">
              
              <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-stone-200">
                <span className="text-[11px] font-medium text-stone-500 flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-sky-700" />
                  Total Water
                </span>
                <p className="font-mono text-xl font-bold text-stone-900 mt-1 tabular-nums">
                  {waterGrams}g
                </p>
                <span className="text-[11px] text-stone-500 font-mono">
                  ~{estimatedCups} standard cups
                </span>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-stone-200">
                <span className="text-[11px] font-medium text-stone-500 flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-[#A06D3B]" />
                  Bloom Water
                </span>
                <p className="font-mono text-xl font-bold text-stone-900 mt-1 tabular-nums">
                  {bloomGrams}g
                </p>
                <span className="text-[11px] text-stone-500">
                  45 sec degas
                </span>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-stone-200 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-medium text-stone-500 flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-rose-700" />
                  Target Temp
                </span>
                <p className="font-mono text-base font-bold text-stone-900 mt-1">
                  {guide.tempCelsius}
                </p>
                <span className="text-[11px] text-stone-500">
                  Grind: {guide.grindSize.split('(')[0]}
                </span>
              </div>

            </div>

            {/* Built-in Barista Stop Watch */}
            <div className="bg-stone-900 text-white p-5 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-amber-200 font-medium block">
                  Brew Extraction Clock
                </span>
                <div className="font-mono text-3xl font-bold tracking-tight mt-0.5 tabular-nums">
                  {formatTimer(timerSeconds)}
                </div>
                <span className="text-[11px] text-stone-400">
                  Recommended target: {guide.timeEstimate}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`p-3 rounded-full transition-colors cursor-pointer ${
                    isTimerRunning
                      ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                      : 'bg-white text-stone-900 hover:bg-stone-200'
                  }`}
                  aria-label={isTimerRunning ? 'Pause timer' : 'Start brew timer'}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(0);
                  }}
                  className="p-3 bg-stone-800 text-stone-400 hover:text-white rounded-full transition-colors cursor-pointer"
                  aria-label="Reset timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Step-by-Step Instructions */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs space-y-6">
            
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#A06D3B]">
                Extraction Technique
              </span>
              <h3 className="font-serif text-2xl font-semibold text-stone-900 mt-1">
                {guide.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                {guide.description}
              </p>
            </div>

            {/* Steps list */}
            <div className="space-y-4 pt-2">
              {guide.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-stone-100 border border-stone-300 text-stone-900 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed flex-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Grind consistency: {guide.grindSize}</span>
              <a
                href="#menu"
                className="font-medium text-stone-900 hover:underline hover:text-[#A06D3B]"
              >
                Order Fresh Whole Beans &rarr;
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
