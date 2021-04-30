import { motion } from 'framer-motion'

const animations = {
  header: {
    exit: { opacity: 0 },
    hidden: {
      transition: {
        staggerChildren: 0.05,
      },
    },
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
  letter: {
    exit: ({ index, length }: { index: number; length: number }) => {
      const xScale = 30
      const yScale = 15
      return {
        opacity: 0,
        x: scaleValue(index, [0, length], [-xScale, xScale]),
        y: Math.floor(Math.random() * yScale * 2) - yScale,
      }
    },
    hidden: {
      opacity: 0,
      y: -20,
    },
    show: { opacity: 1, x: 0, y: 0 },
  },
}

function scaleValue(value, from, to) {
  const scale = (to[1] - to[0]) / (from[1] - from[0])
  const capped = Math.min(from[1], Math.max(from[0], value)) - from[0]
  return ~~(capped * scale + to[0])
}

export default function PageTitle({ title }: { title: string }) {
  return (
    <motion.h1
      variants={animations.header}
      initial="hidden"
      animate="show"
      exit="exit"
      aria-label={title}
      className="text-4xl"
    >
      {title.split(``).map((letter, i) => (
        <motion.span
          className="inline-block whitespace-pre-wrap"
          key={i}
          variants={animations.letter}
          custom={{ index: i, length: title.length }}
        >
          {letter ?? ` `}
        </motion.span>
      ))}
    </motion.h1>
  )
}
