import React from 'react';

export interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
