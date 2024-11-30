export default function CalendarLoading() {
  return (
    <div className="p-6 space-y-4">
      <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      <div className="grid grid-cols-7 gap-4">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-muted animate-pulse rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
