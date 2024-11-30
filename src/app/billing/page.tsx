import { Billing } from "@/components/billing/billing"

export default function BillingPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Billing and Payments</h2>
      <Billing />
    </div>
  )
}

