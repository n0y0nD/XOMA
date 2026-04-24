"use client";

import { useState } from "react";
import { Review } from "@/types";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  reviews: Review[];
}

export default function ReviewSlider({ reviews }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-7 text-center">
        <h2 className="font-syne text-base font-semibold mb-2">Client Reviews</h2>
        <p className="text-sm text-[#6b6b72] font-light">No reviews yet.</p>
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-7 overflow-hidden relative group">
      <h2 className="font-syne text-base font-semibold mb-5 flex items-center justify-between">
        Client Reviews
        <span className="text-xs font-normal text-[#6b6b72] bg-white/[0.04] px-2 py-0.5 rounded-full">
          {currentIndex + 1} / {reviews.length}
        </span>
      </h2>

      <div className="relative min-h-[160px]">
        <Quote size={40} className="absolute -top-3 -left-2 text-white/[0.03] z-0 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex flex-col h-full"
          >
            <p className="text-[15px] leading-relaxed text-[#f0ede8] font-light italic mb-4">
              "{currentReview.comment}"
            </p>

            <div className="mt-auto flex items-end justify-between">
              <div>
                <p className="font-syne text-sm font-bold text-[#e8431a]">{currentReview.author}</p>
                <p className="text-[11px] text-[#6b6b72] uppercase tracking-wider mt-0.5">
                  {new Date(currentReview.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill={i < currentReview.rating ? "#c9a96e" : "transparent"}
                    className={i < currentReview.rating ? "text-[#c9a96e]" : "text-white/[0.1]"}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {reviews.length > 1 && (
        <div className="absolute top-6 right-7 flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#6b6b72] hover:text-[#f0ede8] hover:bg-white/[0.08] transition-all"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={handleNext}
            className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#6b6b72] hover:text-[#f0ede8] hover:bg-white/[0.08] transition-all"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
