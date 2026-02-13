import React, { CSSProperties, ReactNode } from 'react';

interface SidebarImageProps {
  /**
   * URL for the image. Optional if used as a placeholder/text block.
   */
  src?: string;
  /**
   * CSS object-fit value (image mode only)
   * @default 'cover'
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /**
   * CSS object-position value (image mode only)
   * @default 'center'
   */
  objectPosition?: string;
  /**
   * When true, applies flex: 1 to fill available space
   * @default false
   */
  grow?: boolean;
  /**
   * Background color behind the image or placeholder
   */
  backgroundColor?: string;
  /**
   * Background gradient behind the image or placeholder
   */
  backgroundGradient?: string;
  /**
   * When true, switches to pattern mode using CSS background-image
   * @default false
   */
  pattern?: boolean;
  /**
   * CSS background-size value (pattern mode only)
   * @default 'auto'
   */
  backgroundSize?: string;
  /**
   * CSS background-position value (pattern mode only)
   * @default 'center'
   */
  backgroundPosition?: string;
  /**
   * CSS background-repeat value (pattern mode only)
   * @default 'repeat'
   */
  backgroundRepeat?: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y';
  /**
   * Explicit height for placeholder mode (when no src is provided).
   * Ignored if grow is true.
   */
  height?: string | number;
  /**
   * Content to render inside the component (useful for placeholders or overlays)
   */
  children?: ReactNode;
}

const SidebarImage: React.FC<SidebarImageProps> = ({
  src,
  objectFit = 'cover',
  objectPosition = 'center',
  grow = false,
  backgroundColor,
  backgroundGradient,
  pattern = false,
  backgroundSize = 'auto',
  backgroundPosition = 'center',
  backgroundRepeat = 'repeat',
  height,
  children,
}) => {
  const commonStyle: CSSProperties = {
    backgroundColor,
    backgroundImage: backgroundGradient,
    // Flex grow controls filling space
    flexGrow: grow ? 1 : 0,
    // Ensure image mode doesn't shrink below intrinsic height unless forced
    // For pattern mode, it's just a div, so it shrinks if empty and no grow.
    flexShrink: 0,
    position: 'relative', // For potential absolute children if needed
    width: '100%',
  };

  // Pattern Mode
  if (pattern) {
    const patternStyle: CSSProperties = {
      ...commonStyle,
      // If grow is true, flex takes over height. If false, it has no intrinsic height (height: 0).
      // If height prop is provided, use it.
      height: grow ? 'auto' : (height || 'auto'), 
      backgroundImage: src ? `url('${src}')` : undefined,
      backgroundSize,
      backgroundPosition,
      backgroundRepeat,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    return <div style={patternStyle} aria-hidden={!children}>{children}</div>;
  }

  // Placeholder Mode (No Image)
  if (!src) {
    const placeholderStyle: CSSProperties = {
      ...commonStyle,
      height: grow ? 'auto' : (height || '150px'), // Default to 150px if no src and no grow
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    };
    return <div style={placeholderStyle}>{children}</div>;
  }

  // Image Mode
  const imageStyle: CSSProperties = {
    ...commonStyle,
    display: 'block', // Removes bottom whitespace typical with inline images
    // If grow is true, we force height to 100% to fill the flex item's allocated space
    // If grow is false, height is auto (intrinsic)
    height: grow ? '100%' : 'auto',
    objectFit,
    objectPosition,
  };

  return <img src={src} alt="" style={imageStyle} />;
};

export default SidebarImage;