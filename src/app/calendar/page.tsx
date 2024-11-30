import { Calendar } from "@/components/ui/calendar";

export default function CalendarPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
      <div className="rounded-lg border">
        <Calendar mode="default" className="rounded-md" />
      </div>
    </div>
  );
}
