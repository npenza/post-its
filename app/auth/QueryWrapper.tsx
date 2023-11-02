"use client"

import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import { QueryClient , QueryClientProvider} from "react-query"

interface Props {
    children? : ReactNode
}

const queryClient = new QueryClient()

const QueryWrapper = ({children}: Props) => {
    return(<QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
        </QueryClientProvider>)
}

export default QueryWrapper