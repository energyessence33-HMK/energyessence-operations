import { AccessibilityInfo, Platform } from 'react-native';

/**
 * Accessibility utilities for WCAG 2.1 AA compliance
 */
export class AccessibilityUtils {
  /**
   * Announce message to screen readers
   */
  static async announce(message: string): Promise<void> {
    if (Platform.OS !== 'web') {
      try {
        await AccessibilityInfo.announceForAccessibility(message);
      } catch (error) {
        console.error('Accessibility announcement error:', error);
      }
    }
  }

  /**
   * Check if screen reader is enabled
   */
  static async isScreenReaderEnabled(): Promise<boolean> {
    if (Platform.OS === 'web') {
      return false;
    }

    try {
      return await AccessibilityInfo.isScreenReaderEnabled();
    } catch (error) {
      console.error('Screen reader check error:', error);
      return false;
    }
  }

  /**
   * Set accessibility label for element
   */
  static getAccessibilityLabel(label: string, hint?: string): {
    accessible: boolean;
    accessibilityLabel: string;
    accessibilityHint?: string;
  } {
    return {
      accessible: true,
      accessibilityLabel: label,
      accessibilityHint: hint,
    };
  }

  /**
   * Set accessibility role
   */
  static getAccessibilityRole(role: 'button' | 'link' | 'header' | 'image' | 'text' | 'none') {
    return {
      accessible: true,
      accessibilityRole: role,
    };
  }

  /**
   * Announce loading state
   */
  static async announceLoading(itemName: string): Promise<void> {
    await this.announce(`Loading ${itemName}, please wait`);
  }

  /**
   * Announce completion
   */
  static async announceComplete(message: string): Promise<void> {
    await this.announce(`${message}, completed`);
  }

  /**
   * Announce error
   */
  static async announceError(errorMessage: string): Promise<void> {
    await this.announce(`Error: ${errorMessage}`);
  }

  /**
   * Get color contrast ratio
   */
  static getContrastRatio(foreground: string, background: string): number {
    const fgRGB = this.hexToRGB(foreground);
    const bgRGB = this.hexToRGB(background);

    const fgLuminance = this.getLuminance(fgRGB);
    const bgLuminance = this.getLuminance(bgRGB);

    const lighter = Math.max(fgLuminance, bgLuminance);
    const darker = Math.min(fgLuminance, bgLuminance);

    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Check if colors meet WCAG AA standard (4.5:1 for text)
   */
  static meetsWCAGAA(foreground: string, background: string, isLargeText = false): boolean {
    const ratio = this.getContrastRatio(foreground, background);
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  }

  /**
   * Check if colors meet WCAG AAA standard (7:1 for text)
   */
  static meetsWCAGAAA(foreground: string, background: string, isLargeText = false): boolean {
    const ratio = this.getContrastRatio(foreground, background);
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }

  // Helper methods
  private static hexToRGB(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }

  private static getLuminance(rgb: { r: number; g: number; b: number }): number {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((x) => {
      x = x / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
}

/**
 * Accessibility-friendly color palette
 */
export const AccessibleColors = {
  // High contrast combinations (WCAG AAA compliant)
  highContrast: {
    text: '#000000',
    background: '#FFFFFF',
    accent: '#0066CC',
    success: '#008000',
    warning: '#FF8C00',
    error: '#CC0000',
  },

  // Dark mode accessible
  darkMode: {
    text: '#FFFFFF',
    background: '#000000',
    accent: '#66B2FF',
    success: '#00FF00',
    warning: '#FFB366',
    error: '#FF6666',
  },

  // Kingdom Executor accessible palette
  kingdom: {
    text: '#ECEDEE', // Light text
    background: '#0a1a2e', // Dark background
    accent: '#00d4ff', // High contrast cyan
    success: '#00FF00', // Bright green
    warning: '#FFB366', // Bright orange
    error: '#FF6666', // Bright red
    gold: '#FFD700', // Bright gold
  },
};
