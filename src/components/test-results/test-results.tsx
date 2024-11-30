"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

const testResults = [
  { id: 1, patientName: "John Doe", testName: "Blood Test", date: "2023-05-15", result: "Normal" },
  { id: 2, patientName: "Jane Smith", testName: "X-Ray", date: "2023-05-16", result: "Abnormal" },
  { id: 3, patientName: "Bob Johnson", testName: "MRI", date: "2023-05-17", result: "Normal" },
  { id: 4, patientName: "Alice Brown", testName: "CT Scan", date: "2023-05-18", result: "Pending" },
  { id: 5, patientName: "Charlie Davis", testName: "Ultrasound", date: "2023-05-19", result: "Normal" },
]

export function TestResults() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredResults = testResults.filter(
    (result) =>
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.testName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by patient name or test name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableCaption>A list of recent test results.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Test Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredResults.map((result) => (
            <TableRow key={result.id}>
              <TableCell>{result.patientName}</TableCell>
              <TableCell>{result.testName}</TableCell>
              <TableCell>{result.date}</TableCell>
              <TableCell>{result.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

