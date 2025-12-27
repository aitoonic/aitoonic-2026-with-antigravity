'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import { Camera, Loader2, Upload } from 'lucide-react'
import { toast } from 'sonner'

interface AvatarUploadProps {
    uid: string
    url: string | null
    onUpload: (url: string) => void
}

export default function AvatarUpload({ uid, url, onUpload }: AvatarUploadProps) {
    const supabase = createClient()
    const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (url) setAvatarUrl(url)
    }, [url])

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]

            // Check file size (2MB limit)
            if (file.size > 2 * 1024 * 1024) {
                throw new Error('Image size must be less than 2MB.')
            }

            const fileExt = file.name.split('.').pop()
            const fileName = `${uid}-${Math.random()}.${fileExt}`
            const filePath = `${uid}/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)

            onUpload(data.publicUrl)
            setAvatarUrl(data.publicUrl)
            toast.success('Avatar updated successfully!')

        } catch (error: any) {
            toast.error(error.message || 'Error uploading avatar')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 mb-6">
            <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border bg-muted relative">
                    {avatarUrl ? (
                        <Image
                            src={avatarUrl}
                            alt="Avatar"
                            width={96}
                            height={96}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground">
                            <span className="text-2xl font-bold uppercase">{uid.slice(0, 1)}</span>
                        </div>
                    )}

                    {/* Overlay for uploading */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Camera className="text-white w-8 h-8" />
                    </div>

                    {uploading && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
            </div>
            <div>
                <label htmlFor="single" className="text-sm font-medium text-primary hover:text-primary/80 cursor-pointer flex items-center gap-2">
                    <Upload size={14} /> Upload New Picture
                </label>
                <p className="text-xs text-muted-foreground text-center mt-1">Max 2MB</p>
            </div>
        </div>
    )
}
