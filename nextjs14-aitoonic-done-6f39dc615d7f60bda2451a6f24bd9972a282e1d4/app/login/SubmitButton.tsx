'use client'

import { useFormStatus } from 'react-dom'
import { type ComponentProps } from 'react'
import { Loader2 } from 'lucide-react'

type Props = ComponentProps<'button'> & {
    pendingText?: string
}

export function SubmitButton({ children, pendingText, ...props }: Props) {
    const { pending } = useFormStatus()

    return (
        <button {...props} type="submit" aria-disabled={pending} disabled={pending} className={`flex items-center justify-center ${props.className}`}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {pendingText}
                </>
            ) : children}
        </button>
    )
}
