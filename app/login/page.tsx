'use client'

import Link from 'next/link'
import { useState, Suspense } from 'react'
import { SubmitButton } from './SubmitButton'
import { signInWithGoogle, signInWithPassword, signUp } from './actions'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Login() {
    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-[calc(100vh-200px)] py-10">
            <Suspense fallback={<div className="text-center p-4">Loading login form...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    )
}

function LoginForm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const message = searchParams.get('message')
    const [action, setAction] = useState<'signin' | 'signup'>('signin')
    const [localMessage, setLocalMessage] = useState<string | null>(null)

    const handleAction = async (formData: FormData) => {
        console.log('handleAction trigger:', { action })
        setLocalMessage(null)
        let result: any;

        try {
            if (action === 'signin') {
                result = await signInWithPassword(formData)
                // Handle client-side redirect for success
                if (result?.success === true) {
                    router.push('/profile')
                    return
                }
            } else {
                result = await signUp(formData)
            }
            console.log('Action result:', result)
        } catch (err) {
            console.error('Action threw error:', err)
            setLocalMessage('An unexpected error occurred')
            return
        }

        if (result?.error) {
            setLocalMessage(result.error)
        } else if (result?.success && typeof result.success === 'string') {
            setLocalMessage(result.success)
        }
    }

    return (
        <>
            <Link
                href="/"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
            </Link>

            <div className="flex flex-col w-full justify-center gap-2 text-foreground">
                <h1 className="text-2xl font-bold text-center mb-6">
                    {action === 'signin' ? 'Sign In' : 'Sign Up'}
                </h1>

                {/* Google Login Button */}
                <button
                    onClick={() => signInWithGoogle()}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-md mb-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.59z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>

                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-zinc-300 dark:border-zinc-700"></div>
                    <span className="flex-shrink mx-4 text-zinc-500 dark:text-zinc-400">Or continue with email</span>
                    <div className="flex-grow border-t border-zinc-300 dark:border-zinc-700"></div>
                </div>

                <form action={handleAction} className="flex flex-col gap-4">
                    <div>
                        <label className="text-md" htmlFor="email">Email</label>
                        <input
                            className="w-full rounded-md px-4 py-2 bg-inherit border mt-1"
                            name="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-md" htmlFor="password">Password</label>
                        <input
                            className="w-full rounded-md px-4 py-2 bg-inherit border mt-1"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {/* Extra fields for signup */}
                    {action === 'signup' && (
                        <>
                            <div>
                                <label className="text-md" htmlFor="full_name">Full Name</label>
                                <input
                                    className="w-full rounded-md px-4 py-2 bg-inherit border mt-1"
                                    name="full_name"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-md" htmlFor="phone">Phone Number</label>
                                <input
                                    className="w-full rounded-md px-4 py-2 bg-inherit border mt-1"
                                    name="phone"
                                    placeholder="+1 234 567 8900"
                                />
                            </div>
                        </>
                    )}

                    <SubmitButton
                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 mb-2 w-full mt-4"
                        pendingText={action === 'signin' ? "Signing In..." : "Signing Up..."}
                    >
                        {action === 'signin' ? 'Sign In' : 'Sign Up'}
                    </SubmitButton>
                </form>

                <div className="text-center mt-2">
                    <button
                        type="button"
                        onClick={() => setAction(action === 'signin' ? 'signup' : 'signin')}
                        className="text-sm text-primary hover:underline"
                    >
                        {action === 'signin' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </button>
                </div>

                {(message || localMessage) && (
                    <p className={`mt-4 p-4 text-center rounded-md ${(message || localMessage)?.includes('Could not') || (message || localMessage)?.includes('Error')
                        ? 'bg-destructive/10 text-destructive'
                        : 'bg-green-500/10 text-green-600'
                        }`}>
                        {message || localMessage}
                    </p>
                )}
            </div>
        </>
    )
}
