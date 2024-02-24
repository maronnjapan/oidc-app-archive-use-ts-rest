"use client"
import { Button, Flex, Heading, Input, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { tsRestClient } from "../../ts-rest-client";
import { KeyboardEvent, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Page(): JSX.Element {
  const { mutateAsync, error, isPending } = tsRestClient.login.useMutation()
  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const { toggleColorMode } = useColorMode();
  const formBackGround = useColorModeValue("gray.100", "gray.700");

  const login = async () => {
    await mutateAsync({ body: { email, password } })
    router.push('https://google.com/')
  }

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await login()
    }
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackGround} p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <Input placeholder="sample@sample.com" variant="filled" mb={3} type="email" border={"1px #000 solid"} value={email} onChange={(e) => setEmail(() => e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
        <Input placeholder="password" variant="filled" mb={6} type="password" border={"1px #000 solid"} value={password} onChange={(e) => setPassword(() => e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
        <Button mb={6} colorScheme="teal" onClick={login} isLoading={isPending}>Log in</Button>
        <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
      </Flex>
    </Flex>
  );
}
