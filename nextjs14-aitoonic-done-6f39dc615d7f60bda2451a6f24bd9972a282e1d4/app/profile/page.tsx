import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/profile/profile-form'
import SavedToolsList from '@/components/profile/saved-tools-list'
import UpvotedToolsList from '@/components/profile/upvoted-tools-list'
import Link from 'next/link'

export default async function ProfilePage() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold">My Profile</h1>
                <form action="/auth/signout" method="post">
                    <button className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50" type="submit">
                        Sign out
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: User Details */}
                <div className="lg:col-span-4 xl:col-span-3">
                    <div className="sticky top-24">
                        <ProfileForm user={user} />
                    </div>
                </div>

                {/* Right Column: Lists */}
                <div className="lg:col-span-8 xl:col-span-9 space-y-10">
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold tracking-tight">Saved Tools</h2>
                            <span className="text-sm text-muted-foreground">Your personal collection</span>
                        </div>
                        <div className="bg-card rounded-xl border shadow-sm p-6 min-h-[200px]">
                            <SavedToolsList userId={user.id} />
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold tracking-tight">Upvoted Tools</h2>
                            <span className="text-sm text-muted-foreground">Tools you've supported</span>
                        </div>
                        <div className="bg-card rounded-xl border shadow-sm p-6 min-h-[200px]">
                            <UpvotedToolsList userId={user.id} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
