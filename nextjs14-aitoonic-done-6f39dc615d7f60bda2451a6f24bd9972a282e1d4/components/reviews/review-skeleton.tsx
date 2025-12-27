import { Skeleton } from "@/components/ui/skeleton"

export default function ReviewSkeleton() {
    return (
        <section className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form Skeleton */}
                <div className="lg:col-span-4 xl:col-span-5 order-2 lg:order-1">
                    <div className="border rounded-xl p-6 bg-card space-y-4">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <div className="flex gap-1 py-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Skeleton key={i} className="h-8 w-8 rounded-full" />
                            ))}
                        </div>
                        <Skeleton className="h-32 w-full rounded-md" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                </div>

                {/* List Skeleton */}
                <div className="lg:col-span-8 xl:col-span-7 order-1 lg:order-2 space-y-6">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex gap-4 p-5 rounded-xl border bg-card">
                            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                            <div className="space-y-2 flex-1">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-16 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
