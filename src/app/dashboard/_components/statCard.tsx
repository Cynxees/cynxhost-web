import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const CircularProgress = ({ percent }: { percent: number }) => {
  const [size, setSize] = useState(100);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setSize(entry.contentRect.width);
        }
      });

      resizeObserver.observe(parentRef.current);

      return () => resizeObserver.disconnect();
    }
  }, []);

  const radius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  const progress = useSpring(percent, { damping: 10, stiffness: 100 });

  const strokeDashoffset = useTransform(progress, (p) => circumference - (p / 100) * circumference);

  useEffect(() => {
    progress.set(percent);
  }, [percent, progress]);

  return (
    <div ref={parentRef} className="h-[80%] flex items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#ffc4c4" strokeWidth={strokeWidth} />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#D30000"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <text x="50" y="55" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#374151">
          {Math.round(percent)}%
        </text>
      </svg>
    </div>
  );
};

const StatCard: React.FC<{ percent: number; label: string; value: string; limit: string }> = ({ percent, label, value, limit }) => {
  return (
    <div className="relative max-h-24 w-full flex flex-col items-center gap-4 p-2">
      <CircularProgress percent={percent} />
      <p className="absolute bottom-0">{label}</p>
    </div>
  );
};

export default StatCard;
