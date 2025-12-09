'use client'

interface FilterTabsProps {
  activeFilter: 'today' | 'new' | 'popular'
  onFilterChange: (filter: 'today' | 'new' | 'popular') => void
  counts?: {
    today: number
    new: number
    popular: number
  }
}

export default function FilterTabs({ activeFilter, onFilterChange, counts }: FilterTabsProps) {
  const tabs = [
    {
      id: 'today' as const,
      label: 'Today',
      description: "Today's new tools",
      count: counts?.today
    },
    {
      id: 'new' as const,
      label: 'New',
      description: 'Last 7 days',
      count: counts?.new
    },
    {
      id: 'popular' as const,
      label: 'Popular',
      description: 'Top 50 by rating',
      count: counts?.popular
    }
  ]

  return (
    <div className="border-b border-border bg-background">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onFilterChange(tab.id)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${
                activeFilter === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }
            `}
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="bg-secondary text-foreground py-0.5 px-2.5 rounded-full text-xs font-medium">
                    {tab.count}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground mt-0.5">
                {tab.description}
              </span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  )
}
