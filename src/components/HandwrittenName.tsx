import { motion, useReducedMotion } from "framer-motion";

interface HandwrittenNameProps {
  text: string;
  /** Seconds the pen takes to write the full name. */
  duration?: number;
  onDone?: () => void;
}

/**
 * HandwrittenName — a one-shot pen-writing reveal.
 * Script lettering is progressively unmasked left to right while a small
 * nib travels along the baseline. Never loops.
 */
export function HandwrittenName({ text, duration = 2.4, onDone }: HandwrittenNameProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className="block font-script text-[clamp(3.4rem,11vw,7rem)] leading-[0.95] text-foreground">
        {text}
      </span>
    );
  }

  return (
    <span className="relative block">
      <motion.span
        className="block font-script text-[clamp(3.4rem,11vw,7rem)] leading-[0.95] text-foreground"
        initial={{ clipPath: "inset(0 100% -20% 0)" }}
        animate={{ clipPath: "inset(0 0% -20% 0)" }}
        transition={{ duration, ease: [0.65, 0.02, 0.35, 1], delay: 0.35 }}
        onAnimationComplete={onDone}
      >
        {text}
      </motion.span>

      {/* Pen nib travelling with the stroke */}
      <motion.span
        aria-hidden="true"
        className="absolute bottom-[18%] left-0 h-[0.5em] w-[2px] rounded-full bg-accent"
        initial={{ left: "0%", opacity: 0 }}
        animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{
          duration,
          ease: [0.65, 0.02, 0.35, 1],
          delay: 0.35,
          times: [0, 0.05, 0.9, 1],
        }}
      />
    </span>
  );
}
