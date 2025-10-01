import { createContext } from "react";

interface ContextoPrincipalCorpo {
    token: string | undefined
    emailProfile: string | null
    setProfile: (token : string | null, email : string | null) => void
}

const corpoVazioContextoPrincipal : ContextoPrincipalCorpo = {
    token: undefined,
    emailProfile: null,
    setProfile: (token : string | null, email : string | null) => {}
}

const ContextoPrincipal = createContext(corpoVazioContextoPrincipal);

export {ContextoPrincipal, ContextoPrincipalCorpo, corpoVazioContextoPrincipal};
