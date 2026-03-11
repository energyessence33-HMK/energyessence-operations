import { useMemo, useCallback, useRef } from 'react';

/**
 * Performance optimization utilities to eliminate lag
 */

/**
 * Debounce hook - prevents function from running too frequently
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

/**
 * Throttle hook - limits function execution frequency
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const lastRunRef = useRef<number>(Date.now());

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastRunRef.current >= delay) {
        lastRunRef.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );
}

/**
 * Memoize expensive computations
 */
export function useMemoizedValue<T>(value: T, dependencies: any[]): T {
  return useMemo(() => value, dependencies);
}

/**
 * Performance monitoring
 */
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map();
  private measures: Map<string, number[]> = new Map();

  /**
   * Mark start of operation
   */
  mark(name: string): void {
    this.marks.set(name, performance.now());
  }

  /**
   * Measure time since mark
   */
  measure(name: string, markName: string): number {
    const markTime = this.marks.get(markName);

    if (!markTime) {
      console.warn(`Mark ${markName} not found`);
      return 0;
    }

    const duration = performance.now() - markTime;

    if (!this.measures.has(name)) {
      this.measures.set(name, []);
    }

    this.measures.get(name)!.push(duration);
    return duration;
  }

  /**
   * Get average time for operation
   */
  getAverageTime(name: string): number {
    const times = this.measures.get(name) || [];

    if (times.length === 0) {
      return 0;
    }

    const sum = times.reduce((a, b) => a + b, 0);
    return sum / times.length;
  }

  /**
   * Get all measurements
   */
  getAllMeasurements(): Record<string, { average: number; count: number; min: number; max: number }> {
    const result: Record<string, any> = {};

    for (const [name, times] of this.measures) {
      if (times.length > 0) {
        result[name] = {
          average: times.reduce((a, b) => a + b, 0) / times.length,
          count: times.length,
          min: Math.min(...times),
          max: Math.max(...times),
        };
      }
    }

    return result;
  }

  /**
   * Clear measurements
   */
  clear(): void {
    this.marks.clear();
    this.measures.clear();
  }

  /**
   * Log all measurements
   */
  logMeasurements(): void {
    const measurements = this.getAllMeasurements();
    console.table(measurements);
  }
}

/**
 * Image optimization utilities
 */
export const ImageOptimization = {
  /**
   * Get optimized image size for device
   */
  getOptimalSize(width: number, height: number, maxWidth: number = 800): { width: number; height: number } {
    if (width <= maxWidth) {
      return { width, height };
    }

    const ratio = height / width;
    return {
      width: maxWidth,
      height: Math.round(maxWidth * ratio),
    };
  },

  /**
   * Generate responsive image URLs
   */
  getResponsiveImageURLs(baseURL: string): Record<string, string> {
    return {
      small: `${baseURL}?w=200&h=200&fit=crop`,
      medium: `${baseURL}?w=400&h=400&fit=crop`,
      large: `${baseURL}?w=800&h=800&fit=crop`,
      xlarge: `${baseURL}?w=1200&h=1200&fit=crop`,
    };
  },
};

/**
 * List optimization utilities
 */
export const ListOptimization = {
  /**
   * Get initial number of items to render
   */
  getInitialNumToRender(): number {
    return 10; // Render first 10 items
  },

  /**
   * Get number of items to render on scroll
   */
  getMaxToRenderPerBatch(): number {
    return 10; // Render 10 more items per scroll
  },

  /**
   * Get update interval for visibility
   */
  getUpdateCellsBatchingPeriod(): number {
    return 50; // Update every 50ms
  },
};

/**
 * Memory optimization utilities
 */
export const MemoryOptimization = {
  /**
   * Clear unused cache
   */
  clearCache(): void {
    // Clear image cache
    if (global.gc) {
      global.gc();
    }
  },

  /**
   * Monitor memory usage
   */
  getMemoryUsage(): { used: number; total: number; percentage: number } | null {
    if (typeof window !== 'undefined' && (window as any).performance?.memory) {
      const memory = (window as any).performance.memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100,
      };
    }
    return null;
  },
};

/**
 * Global performance monitor instance
 */
export const performanceMonitor = new PerformanceMonitor();

/**
 * Performance optimization guidelines
 */
export const PerformanceGuidelines = {
  // Target metrics
  targets: {
    appLoadTime: 3000, // 3 seconds
    screenTransition: 300, // 300ms
    apiResponseTime: 1000, // 1 second
    animationFPS: 60, // 60 FPS
    memoryUsage: 150, // 150MB
  },

  // Best practices
  bestPractices: [
    'Use FlatList instead of ScrollView with .map()',
    'Implement image lazy loading',
    'Use React.memo for expensive components',
    'Debounce search and filter inputs',
    'Implement pagination for large lists',
    'Cache API responses',
    'Use native driver for animations',
    'Minimize re-renders with useMemo/useCallback',
    'Split large components into smaller ones',
    'Use code splitting for large bundles',
  ],
};
