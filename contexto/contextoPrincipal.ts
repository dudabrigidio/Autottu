import { createContext } from "react";

interface ContextoPrincipalCorpo {
    token: string | undefined
    emailProfile: string | null
    setProfile: (token : string | null, email : string | null) => void
    clearProfile: () => void
    tema: 'light' | 'dark'
    defineTema: () => void 
}

const corpoVazioContextoPrincipal : ContextoPrincipalCorpo = {
    token: undefined,
    emailProfile: null,
    setProfile: (token : string | null, email : string | null) => {},
    clearProfile: () => {},
    tema: 'light',
    defineTema: () => {}
}

const ContextoPrincipal = createContext(corpoVazioContextoPrincipal);

export {ContextoPrincipal, ContextoPrincipalCorpo, corpoVazioContextoPrincipal};
