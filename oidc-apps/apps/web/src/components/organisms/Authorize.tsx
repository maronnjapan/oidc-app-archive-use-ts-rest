"use client"
import { Box } from "@chakra-ui/react";
import { tsRestClient } from "../../ts-rest-client";
import { useRouter as navUseRouter, useSearchParams } from 'next/navigation'
import { contract } from "@repo/ts-rest";
import { useEffect } from "react";

type CodeChallengeMethod = typeof contract.saveClientAuthorize.body._input.code_challenge_method

export default function Authorize() {
    const navRouter = navUseRouter()
    const router = useSearchParams();

    const { mutateAsync } = tsRestClient.saveClientAuthorize.useMutation()

    const audience = router.get('audience');
    const prompt = router.get('prompt');

    const clientId = router.get('client_id');
    const state = router.get('state')
    const isResponseType = !!router.get('response_type')
    const redirectUri = router.get('redirect_uri');
    const codeChallenge = router.get('code_challenge');
    const scope = router.get('scope')
    const codeChallengeMethodQuery = router.get('code_challenge_method');

    if (!clientId || !state || !scope || !isResponseType || !redirectUri || !codeChallenge || !codeChallengeMethodQuery) {
        return <Box>Invalid URL</Box>
    }

    const codeChallengeHashMethod: CodeChallengeMethod = 'S256';

    const codeChallengeMethod: CodeChallengeMethod = codeChallengeMethodQuery === codeChallengeHashMethod ? 'S256' : 'plain';

    useEffect(() => {
        mutateAsync({ body: { audience, client_id: clientId, scope, prompt, state, response_type: 'code', redirect_uri: redirectUri, code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod } }).then(() => {
            navRouter.push('http://localhost:8001')
            return Promise.resolve()
        }).catch(() => {
            return Promise.reject()
        })
    }, [])
}
