"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

type STC = {
  id: number
  code: string
  description: string
  category: string
}

const stcs: STC[] = [
  { id: 1, code: "STC001", description: "Routine check-up", category: "General" },
  { id: 2, code: "STC002", description: "Blood pressure measurement", category: "Cardiovascular" },
  { id: 3, code: "STC003", description: "Blood glucose test", category: "Endocrine" },
  { id: 4, code: "STC004", description: "Chest X-ray", category: "Respiratory" },
  { id: 5, code: "STC005", description: "Electrocardiogram (ECG)", category: "Cardiovascular" },
  { id: 6, code: "STC006", description: "Urinalysis", category: "Urinary" },
  { id: 7, code: "STC007", description: "Complete blood count (CBC)", category: "Hematology" },
  { id: 8, code: "STC008", description: "Lipid panel", category: "Cardiovascular" },
  { id: 9, code: "STC009", description: "Thyroid function test", category: "Endocrine" },
  { id: 10, code: "STC010", description: "Prostate-specific antigen (PSA) test", category: "Urology" },
]

export function STCs() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Standard Treatment Codes (STCs)</CardTitle>
        <CardDescription>List of common medical procedures and tests</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {stcs.map((stc) => (
            <div key={stc.id} className="mb-4 last:mb-0">
              <h3 className="text-sm font-medium">{stc.code}</h3>
              <p className="text-sm text-muted-foreground">{stc.description}</p>
              <Badge variant="secondary" className="mt-1">
                {stc.category}
              </Badge>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

