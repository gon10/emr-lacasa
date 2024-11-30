import { Patients } from "@/components/patients/patients"

export default function PatientsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
      <Patients />
    </div>
  )
}

