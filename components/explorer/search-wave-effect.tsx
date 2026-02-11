"use client"

import { motion, AnimatePresence } from "framer-motion"

interface SearchWaveEffectProps {
  isActive: boolean
  color?: string
}

export function SearchWaveEffect({ isActive, color = "#14b8a6" }: SearchWaveEffectProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 25 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Subtle persistent border glow - the main "thinking" indicator */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              boxShadow: `
                inset 0 0 60px 15px ${color}15,
                inset 0 0 120px 30px ${color}08
              `,
            }}
          />

          {/* Very subtle breathing glow */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              boxShadow: `
                inset 0 0 80px 20px ${color}12,
                inset 0 0 160px 40px ${color}06
              `,
            }}
          />

          {/* Top edge glow - very subtle */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-32"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              background: `linear-gradient(to bottom, ${color}18, transparent)`,
            }}
          />

          {/* Bottom edge glow */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              background: `linear-gradient(to top, ${color}18, transparent)`,
            }}
          />

          {/* Left edge glow */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 w-32"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              background: `linear-gradient(to right, ${color}18, transparent)`,
            }}
          />

          {/* Right edge glow */}
          <motion.div
            className="absolute top-0 bottom-0 right-0 w-32"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              background: `linear-gradient(to left, ${color}18, transparent)`,
            }}
          />

          {/* Corner accents - very subtle glow points */}
          {[
            { top: 0, left: 0 },
            { top: 0, right: 0 },
            { bottom: 0, left: 0 },
            { bottom: 0, right: 0 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-48 h-48"
              style={{
                ...pos,
                background: `radial-gradient(circle at ${pos.left === 0 ? "0%" : "100%"} ${pos.top === 0 ? "0%" : "100%"}, ${color}20, transparent 60%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
