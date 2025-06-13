import * as React from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface IconConfig {
  icon: LucideIcon;
  color: string;
  size?: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'center-right' | 'center-left';
  delay?: number;
  fillCurrent?: boolean;
}

interface FloatingIconsAnimationProps {
  width?: number | string;
  height?: number | string;
  centerIcon?: LucideIcon;
  centerIconSize?: number;
  centerIconColor?: string;
  centerIconFill?: boolean;
  centerIconRotate?: boolean;
  showCenterIcon?: boolean;
  icons: IconConfig[];
  showConnectingLines?: boolean;
  className?: string;
}

export function FloatingIconsAnimation({
  width = 500,
  height = 500,
  centerIcon,
  centerIconSize = 20,
  centerIconColor = 'primary',
  centerIconFill = false,
  centerIconRotate = true,
  showCenterIcon = true,
  icons = [],
  showConnectingLines = true,
  className = '',
}: FloatingIconsAnimationProps) {
  // Get position classes based on the position prop
  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'top-10 left-10';
      case 'top-right':
        return 'top-10 right-10';
      case 'bottom-left':
        return 'bottom-10 left-16';
      case 'bottom-right':
        return 'bottom-10 right-16';
      case 'center':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      default:
        return 'top-10 left-10';
    }
  };

  // Get animation parameters based on position
  const getAnimationParams = (position: string, delay: number = 0) => {
    switch (position) {
      case 'top-left':
        return {
          animate: { y: [-10, 10, -10] },
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay }
        };
      case 'top-right':
        return {
          animate: { y: [10, -10, 10] },
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay }
        };
      case 'bottom-left':
        return {
          animate: { y: [-5, 15, -5] },
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay }
        };
      case 'bottom-right':
        return {
          animate: { y: [15, -5, 15] },
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay }
        };
      default:
        return {
          animate: { y: [-10, 10, -10] },
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay }
        };
    }
  };

  // Get SVG path definitions based on animation size
  const getSvgPaths = () => {
    const w = typeof width === 'number' ? width : 500;
    const h = typeof height === 'number' ? height : 500;
    
    const quarterW = w / 4;
    const halfW = w / 2;
    const threeQuarterW = (w / 4) * 3;
    
    const quarterH = h / 4;
    const halfH = h / 2;
    const threeQuarterH = (h / 4) * 3;
    
    return [
      // Horizontal top path
      `M ${quarterW} ${quarterH} Q ${halfW} ${quarterH - 50} ${threeQuarterW} ${quarterH}`,
      // Horizontal bottom path
      `M ${quarterW} ${threeQuarterH} Q ${halfW} ${threeQuarterH + 50} ${threeQuarterW} ${threeQuarterH}`,
      // Vertical left path
      `M ${quarterW} ${quarterH} Q ${quarterW - 50} ${halfH} ${quarterW} ${threeQuarterH}`,
      // Vertical right path
      `M ${threeQuarterW} ${quarterH} Q ${threeQuarterW + 50} ${halfH} ${threeQuarterW} ${threeQuarterH}`,
    ];
  };

  return (
    <div 
      className={`relative ${className}`} 
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width, 
        height: typeof height === 'number' ? `${height}px` : height 
      }}
    >
      {/* Center Icon */}
      {centerIcon && showCenterIcon && (
        <motion.div
          animate={centerIconRotate ? { rotate: 360 } : {}}
          transition={centerIconRotate ? { duration: 20, repeat: Infinity, ease: "linear" } : {}}
          className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {React.createElement(
            centerIcon, 
            { 
              className: `w-${centerIconSize} h-${centerIconSize} text-${centerIconColor} ${centerIconFill ? 'fill-current' : ''}` 
            }
          )}
        </motion.div>
      )}

      {/* Floating Icons */}
      {icons.map((iconConfig, index) => {
        const { icon: Icon, color, size = 8, position, delay = 0, fillCurrent = false } = iconConfig;
        const positionClasses = getPositionClasses(position);
        const animation = getAnimationParams(position, delay);

        return (
          <motion.div
            key={`floating-icon-${index}`}
            animate={animation.animate}
            transition={animation.transition}
            className={`absolute ${positionClasses} bg-white p-4 rounded-full shadow-soft`}
          >
            <Icon className={`w-${size} h-${size} text-${color} ${fillCurrent ? 'fill-current' : ''}`} />
          </motion.div>
        );
      })}

      {/* Connecting Lines */}
      {showConnectingLines && (
        <svg className="absolute inset-0 w-full h-full">
          {getSvgPaths().map((path, index) => (
            <motion.path
              key={`path-${index}`}
              d={path}
              stroke="rgba(75, 190, 182, 0.3)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: index * 0.5 
              }}
            />
          ))}
        </svg>
      )}
    </div>
  );
}
