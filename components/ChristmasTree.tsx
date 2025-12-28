"use client";
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../public/logo.png";

interface Bauble {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

interface Wish {
  id: number;
  text: string;
  x: string; 
  y: string; 
}

export const ChristmasTree = () => {
  const [baubles, setBaubles] = useState<Bauble[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);

  const seoWishes: string[] = [
  "Happy New Year 2026", "Top 1", "High DR", "Organic Growth", "Index Fast", "Quality Links", 
  "No Spam", "Trust Flow", "Happy New Year 2026", "Max Traffic", "DA 90+", "Happy New Year 2026",
  "SERP Stability", "Strong E-E-A-T", "High CTR", "AI Visibility", "LLM Mentions", "Brand Citations",
];

  const spiralPath = useMemo<string>(() => {
    const points: string[] = [];
    const loops = 6; 
    const pointsPerLoop = 50;
    const totalPoints = loops * pointsPerLoop;
    const maxHeight = 240;
    const maxWidth = 70;

    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      const angle = t * Math.PI * 2 * loops;
      const x = 100 + Math.sin(angle) * (t * maxWidth);
      const y = 40 + t * maxHeight;
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    return points.join(' ');
  }, []);

  const addAction = () => {
    const t = Math.random(); 
    const maxHeight = 240;
    const maxWidth = 70;
    const yBauble = 40 + t * maxHeight;
    const currentWidth = t * maxWidth;
    const xBauble = 100 + (Math.random() - 0.5) * 2 * currentWidth;
    const colors = ['#FFD700', '#FF3131', '#00D4FF', '#FFFFFF', '#FF69B4', '#ADFF2F'];
    
    const newBauble = {
      id: Date.now(),
      x: xBauble,
      y: yBauble,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 4 + 3,
    };
    setBaubles((prev) => [...prev, newBauble]);

    const isLeft = Math.random() > 0.5;
    const xPos = isLeft 
      ? (Math.random() * 25 + 5) + "%" 
      : (Math.random() * 25 + 70) + "%";

    const newWish = {
      id: Date.now() + Math.random(),
      text: seoWishes[Math.floor(Math.random() * seoWishes.length)],
      x: xPos,
      y: (Math.random() * 60 + 20) + "%", 
    };
    setWishes((prev) => [...prev, newWish]);

    setTimeout(() => {
      setWishes((prev) => prev.filter(w => w.id !== newWish.id));
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative font-sans">
      <Image
        src={logo}
        alt="logo"
        width={180}
        className="mb-6 z-20"
      />
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence>
     {wishes.map((wish) => {
      const isNewYear = wish.text === "Happy New Year 2026";
      return (
        <motion.span
          key={wish.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 0.6, y: -60 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`absolute font-light text-xs md:text-xs whitespace-nowrap tracking-wider 
         ${isNewYear ? "text-cyan-400" : "text-white"}`} 
          style={{ 
          left: wish.x, 
          top: wish.y,
          textShadow: isNewYear 
          ? '0 0 10px rgba(165, 243, 252, 0.7), 0 0 20px rgba(165, 243, 252, 0.3)' 
          : '0 0 5px rgba(255, 255, 255, 0.2)'
        }}
        >
          {wish.text}
        </motion.span>
      );
    })}
  </AnimatePresence>
      </div>
      <div className="relative w-80 h-100 flex items-center justify-center z-10">
        <motion.svg
          viewBox="0 0 200 320"
          className="w-full h-full"
          animate={{ rotateY: [-5, 5, -5] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="treeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" />
              <stop offset="50%" stopColor="#00D4FF" />
              <stop offset="100%" stopColor="#00D4FF" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d="M100 10 L104 18 L113 18 L106 24 L109 33 L100 28 L91 33 L94 24 L87 18 L96 18 Z"
            fill="none"
            stroke="white"
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 8px white)' }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <path
            d={spiralPath}
            fill="none"
            stroke="url(#treeGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ filter: 'url(#glow)' }}
          />
          <AnimatePresence>
            {baubles.map((bauble) => (
              <motion.circle
                key={bauble.id}
                cx={bauble.x}
                cy={bauble.y}
                r={bauble.size}
                fill={bauble.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ filter: `drop-shadow(0 0 10px ${bauble.color})` }}
              />
            ))}
          </AnimatePresence>
        </motion.svg>
      </div>
      <div className="flex flex-col items-center z-20 mt-6">
        <button
          onClick={addAction}
          className="cursor-pointer px-10 py-3 text-white font-medium hover:text-cyan-400 transition-all tracking-widest active:scale-95"
          style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}
        >
          Start the Magic
        </button>

        {baubles.length > 0 && (
          <button
            onClick={() => { setBaubles([]); setWishes([]); }}
            className="cursor-pointer text-white/30 text-xs hover:text-white/60 transition-colors tracking-widest"
          >
            Start Over
          </button>
        )}
      </div>
    </div>
  );
}