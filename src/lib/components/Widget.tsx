import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Flex, 
  Heading, 
  Text
} from '@chakra-ui/react';
import { WidgetProps } from '../types/components/Widget.types';
import ChakraProvider from './ChakraProvider';

const Widget: React.FC<WidgetProps> = ({ 
  deploymentId, 
  apiUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const WidgetContent = () => {
    return (
      <Box 
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex={9999}
      >
        {!isOpen ? (
          <Button
            width="60px"
            height="60px"
            borderRadius="full"
            color="white"
            boxShadow="0 2px 10px rgba(0, 0, 0, 0.2)"
            _hover={{ transform: 'scale(1.05)', boxShadow: '0 3px 12px rgba(0, 0, 0, 0.3)' }}
            onClick={() => setIsOpen(true)}
          >
            Open
          </Button>
        ) : (
          <Box
            width="300px"
            height="400px"
            bg={'#222'}
            borderRadius="10px"
            boxShadow="0 5px 15px rgba(0, 0, 0, 0.2)"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <Flex
              justify="space-between"
              align="center"
              p={3}
              bg="#0073e6"
              color="white"
            >
              <Heading size="sm">My Widget</Heading>
              <Button
                aria-label="Close widget"
                size="sm"
                variant="ghost"
                color="white"
                fontWeight="bold"
                fontSize="20px"
                lineHeight="1"
                height="auto"
                minWidth="auto"
                padding="0"
                onClick={() => setIsOpen(false)}
              >
                ×
              </Button>
            </Flex>
            <Box p={4} flex="1" overflowY="auto" backgroundColor={'white'}>
              <Text mb={2}>Hello from your embedded widget!</Text>
              <Text fontSize="sm" mb={1}>Deployment ID: {deploymentId}</Text>
              <Text fontSize="sm">API URL: {apiUrl}</Text>
            </Box>
          </Box>
        )}
      </Box>
    );
  };
  
  return (
    <ChakraProvider>
      <WidgetContent />
    </ChakraProvider>
  );
};

export default Widget;
