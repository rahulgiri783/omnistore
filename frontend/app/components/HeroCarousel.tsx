'use client';

import { useEffect, useState } from 'react';
import { heroSlides } from '../data/store';

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((index) => (index + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mt-[32px] overflow-hidden rounded-[24px] bg-surface-container-high shadow-card">
      <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {heroSlides.map((slide) => (
          <div key={slide.title} className="min-w-full relative h-[320px] md:h-[420px]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-center px-[24px] md:px-[48px] text-white">
              <p className="text-label-md uppercase tracking-[0.2em] text-secondary">{slide.tagline}</p>
              <h1 className="mt-4 max-w-2xl text-[32px] md:text-[48px] font-black leading-[1.05]">{slide.title}</h1>
              <p className="mt-4 max-w-xl text-[16px] leading-7 text-white/90">{slide.description}</p>
              <div><button className="mt-6 inline-flex items-center rounded-[16px] bg-secondary px-6 py-3 text-sm font-semibold text-on-secondary shadow-sm transition hover:bg-secondary/90 uppercase">
                {slide.cta}
              </button></div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-8 rounded-full transition ${index === activeIndex ? 'bg-secondary' : 'bg-white/60'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
