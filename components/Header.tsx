'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { User, LogIn, Menu, X, ChevronDown } from 'lucide-react'


interface HeaderProps {
  user?: SupabaseUser | null
}

export default function Header({ user: initialUser }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(initialUser ?? null)
  const [loading, setLoading] = useState(!initialUser)

  useEffect(() => {
    const supabase = createClient()
    let mounted = true

    // Safety timeout - if auth hangs, show guest state
    const timeoutId = setTimeout(() => {
      if (mounted && loading) {
        console.warn('Auth check timed out')
        setLoading(false)
      }
    }, 5000)

    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (mounted) setUser(user)
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoading(false)
        clearTimeout(timeoutId)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null)
        setLoading(false)
        clearTimeout(timeoutId)
      }
    })

    return () => {
      mounted = false
      clearTimeout(timeoutId)
      subscription.unsubscribe()
    }
  }, [])

  return (
    <header className="bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="https://i.ibb.co/FbvWV1M7/aitoonic-logo-white-ss.webp"
                alt="Aitoonic"
                width={240}
                height={60}
                priority
                sizes="(min-width: 1024px) 240px, (min-width: 640px) 200px, 160px"
                className="h-8 sm:h-10 md:h-12 w-auto"
                onError={(e) => {
                  try {
                    // @ts-ignore
                    e.currentTarget.src = 'https://i.ibb.co/KjStWPgL/aitoonic-fevicon-2.webp'
                    // @ts-ignore
                    e.currentTarget.classList.add('blink-slow')
                  } catch { }
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/categories"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/ai-tools-directory"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                AI Tools
              </Link>
              <Link
                href="/ai-agent"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                AI Agents
              </Link>
              <Link
                href="/compare"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Compare
              </Link>

              {/* Submit Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none">
                  Submit & Grow <ChevronDown size={14} />
                </button>
                <div className="absolute left-0 w-56 mt-0 origin-top-right bg-card border border-border rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link href="/submit-ai" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary">
                      Submit AI Tool (Hub)
                    </Link>
                    <Link href="/submit-ai-tool" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary">
                      Free Submission
                    </Link>
                    <Link href="/featured-ai-tools" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary">
                      Get Featured
                    </Link>
                    <Link href="/submit-gpt" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary">
                      Submit GPT
                    </Link>
                    <Link href="/ai-tool-launch" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary">
                      Launch Service
                    </Link>
                    <Link href="/advertise" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary">
                      Advertise
                    </Link>
                    <Link href="/guest-post" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary">
                      Guest Post
                    </Link>
                  </div>
                </div>
              </div>

              {/* Auth Button */}
              {!loading && (
                user ? (
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 pl-1 pr-3 py-1 bg-secondary/50 hover:bg-secondary rounded-full border border-border transition-all duration-200"
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-muted ring-1 ring-border">
                      {user.user_metadata?.avatar_url ? (
                        <Image
                          src={user.user_metadata.avatar_url}
                          alt={user.user_metadata?.full_name || 'User'}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full grid place-items-center bg-primary/10 text-primary font-bold text-xs">
                          {(user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium max-w-[100px] truncate">
                      {user.user_metadata?.full_name
                        ? (user.user_metadata.full_name.length > 6
                          ? user.user_metadata.full_name.substring(0, 6) + '...'
                          : user.user_metadata.full_name)
                        : (user.email?.split('@')[0].substring(0, 6) + '...' || 'User')}
                    </span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    <LogIn size={16} />
                    Sign In
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {!loading && (
              user ? (
                <Link href="/profile" className="p-2 text-primary">
                  <User size={24} />
                </Link>
              ) : (
                <Link href="/login" className="p-2 text-foreground">
                  <LogIn size={24} />
                </Link>
              )
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <Menu className="block h-6 w-6" />
              ) : (
                <X className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border rounded-b-md shadow-sm h-[80vh] overflow-y-auto">
              <Link
                href="/"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/categories"
                className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/ai-tools-directory"
                className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Tools
              </Link>
              <Link
                href="/ai-agent"
                className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Agents
              </Link>
              <Link
                href="/compare"
                className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Compare
              </Link>

              <div className="my-2 border-t border-border pt-2 pb-2">
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Submit & Grow</p>
                <Link
                  href="/submit-ai"
                  className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium pl-6"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hub Page
                </Link>
                <Link
                  href="/submit-ai-tool"
                  className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium pl-6"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Free Submission
                </Link>
                <Link
                  href="/featured-ai-tools"
                  className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium pl-6"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Featured
                </Link>
                <Link
                  href="/submit-gpt"
                  className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium pl-6"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Submit GPT
                </Link>
                <Link
                  href="/ai-tool-launch"
                  className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium pl-6"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Launch Service
                </Link>
                <Link
                  href="/advertise"
                  className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium pl-6"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Advertise
                </Link>
                <Link
                  href="/guest-post"
                  className="text-muted-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium pl-6"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Guest Post
                </Link>
              </div>


              <div className="border-t border-border my-2 pt-2">
                {user ? (
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} />
                    My Profile
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={18} />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
