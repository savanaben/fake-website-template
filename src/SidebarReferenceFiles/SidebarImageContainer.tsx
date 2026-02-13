import React, { CSSProperties, ReactNode } from 'react';

interface SidebarImageContainerProps {
  /**
   * When true, applies position: sticky so the container stays in view while scrolling
   * @default false
   */
  sticky?: boolean;
  /**
   * Width of the sidebar container
   * @default '200px'
   */
  width?: string;
  /**
   * Solid background color
   */
  backgroundColor?: string;
  /**
   * CSS gradient string (e.g., 'linear-gradient(to bottom, #fff, #000)')
   */
  backgroundGradient?: string;
  /**
   * Vertical alignment of children (corresponds to flex justify-content in column direction)
   * @default 'flex-start'
   */
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
  /**
   * Child SidebarImage components
   */
  children?: ReactNode;
}

const SidebarImageContainer: React.FC<SidebarImageContainerProps> = ({
  sticky = false,
  width = '200px',
  backgroundColor,
  backgroundGradient,
  justifyContent = 'flex-start',
  children,
}) => {
  const style: CSSProperties = {
    width,
    backgroundColor,
    backgroundImage: backgroundGradient,
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? 0 : undefined,
    // Ensure height is managed correctly for flex children
    display: 'flex',
    flexDirection: 'column',
    justifyContent,
    // Prevent the sidebar from shrinking below its defined width
    flexShrink: 0,
    // Align self to stretch ensures the container matches height of the flex row (passage)
    // unless sticky is active, where it behaves differently.
    alignSelf: sticky ? 'flex-start' : 'stretch',
  };

  return (
    <div style={style} className="sidebar-image-container overflow-hidden">
      {children}
    </div>
  );
};

export default SidebarImageContainer;