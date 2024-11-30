import { DrugList } from "@/components/drug-list/drug-list"

export default function DrugListPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Drug List</h2>
      <DrugList />
    </div>
  )
}

