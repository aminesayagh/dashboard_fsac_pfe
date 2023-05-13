import { AnimationProps } from 'framer-motion'

const visibleAnimation = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const y = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

export const animations = {
    visible: {
        variants: visibleAnimation,
        initial: 'hidden',
        animate: 'visible'
    },
    y: {
        variants: y,
        initial: 'hidden',
        animate: 'visible'
    }
} as const;