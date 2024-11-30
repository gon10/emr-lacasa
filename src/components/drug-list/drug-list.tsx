"use client"

import * as React from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

const drugs = [
  { id: 1, name: "Aspirin", dosage: "325mg", frequency: "As needed", sideEffects: "Stomach upset, bleeding" },
  { id: 2, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", sideEffects: "Dizziness, cough" },
  { id: 3, name: "Metformin", dosage: "500mg", frequency: "Twice daily", sideEffects: "Nausea, diarrhea" },
  { id: 4, name: "Levothyroxine", dosage: "50mcg", frequency: "Once daily", sideEffects: "Weight changes, nervousness" },
  { id: 5, name: "Amlodipine", dosage: "5mg", frequency: "Once daily", sideEffects: "Swelling, headache" },
]

export function DrugList() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredDrugs = drugs.filter((drug) =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search drugs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableCaption>A list of commonly prescribed drugs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Side Effects</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDrugs.map((drug) => (
            <TableRow key={drug.id}>
              <TableCell className="font-medium">{drug.name}</TableCell>
              <TableCell>{drug.dosage}</TableCell>
              <TableCell>{drug.frequency}</TableCell>
              <TableCell>{drug.sideEffects}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

