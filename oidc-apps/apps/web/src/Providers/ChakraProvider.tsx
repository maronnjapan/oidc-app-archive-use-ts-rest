// app/providers.tsx
'use client'

import { ChakraProvider as OriChakraProvider } from '@chakra-ui/react'

export function ChakraProvider({ children }: { children: React.ReactNode }) {
    return <OriChakraProvider>{children}</OriChakraProvider>
}