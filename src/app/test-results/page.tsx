import { TestResults } from "@/components/test-results/test-results"

export default function TestResultsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Test Results</h2>
      <TestResults />
    </div>
  )
}

