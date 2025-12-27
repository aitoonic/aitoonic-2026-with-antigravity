'use client'

import { X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface AuthPopupProps {
    isOpen: boolean
    onClose: () => void
    message?: string
}

export default function AuthPopup({ isOpen, onClose, message = "Sign in to continue" }: AuthPopupProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            document.body.style.overflow = 'hidden'
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300)
            document.body.style.overflow = 'unset'
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    if (!isVisible && !isOpen) return null

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className={`relative w-full max-w-sm bg-card border border-border rounded-xl shadow-lg p-6 transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🔐</span>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-bold tracking-tight">Login Required</h3>
                        <p className="text-muted-foreground text-sm">
                            {message}
                        </p>
                    </div>

                    <div className="grid gap-3 pt-2">
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            Log in / Sign up
                        </Link>
                        <button
                            onClick={onClose}
                            className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                            Continue as Guest
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
