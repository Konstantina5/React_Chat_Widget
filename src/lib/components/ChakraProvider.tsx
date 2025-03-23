import React from 'react';
import { ChakraProvider as ChakraUIProvider, defaultSystem } from '@chakra-ui/react';

interface CustomChakraProviderProps {
  children: React.ReactNode;
}

const ChakraProvider: React.FC<CustomChakraProviderProps> = ({ children }) => {
  return (
    <ChakraUIProvider value={defaultSystem}>
      {children}
    </ChakraUIProvider>
  );
};

export default ChakraProvider;
