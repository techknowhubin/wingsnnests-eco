import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

// ============ Page Transition Wrapper ============
// Container morph: the outer container stays, inner content cross-fades

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 6,
    filter: 'blur(4px)',
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.28,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -4,
    filter: 'blur(2px)',
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 1, 1],
    },
  },
};

interface DashboardPageTransitionProps {
  children: ReactNode;
  routeKey: string;
}

export function DashboardPageTransition({ children, routeKey }: DashboardPageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ============ Staggered Container ============
// For staggering child elements within a module

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export function StaggerContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// ============ Module Skeleton ============
// Staggered entrance skeleton that matches common dashboard patterns

interface ModuleSkeletonProps {
  variant?: 'cards' | 'list' | 'grid' | 'detail';
  count?: number;
}

export function ModuleSkeleton({ variant = 'cards', count = 4 }: ModuleSkeletonProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Tiny delay so skeleton doesn't flash for instant loads
    const timer = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Header skeleton */}
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-xl" />
          <Skeleton className="h-4 w-72 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>

      {variant === 'cards' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <Skeleton className="h-32 rounded-2xl" />
            </motion.div>
          ))}
        </div>
      )}

      {variant === 'list' && (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-xl" />
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <Skeleton className="h-16 w-full rounded-xl" />
            </motion.div>
          ))}
        </div>
      )}

      {variant === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
              <Skeleton className="h-48 rounded-2xl" />
            </motion.div>
          ))}
        </div>
      )}

      {variant === 'detail' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.25 }}
          >
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
          </motion.div>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.25 }}
          >
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

// ============ Layout Card with animation ============
// Wraps cards with layout animation for smooth repositioning (FLIP)

export function LayoutCard({ children, layoutId, className = '' }: {
  children: ReactNode;
  layoutId?: string;
  className?: string;
}) {
  return (
    <motion.div
      layout
      layoutId={layoutId}
      transition={{
        layout: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============ Reduced Motion Hook ============

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
