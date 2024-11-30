"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Billing() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Add a new payment method to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name on card</Label>
              <Input id="name" placeholder="Enter name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="number">Card number</Label>
              <Input id="number" placeholder="xxxx xxxx xxxx xxxx" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="month">Expiry month</Label>
                <Select>
                  <SelectTrigger id="month">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="1">January</SelectItem>
                    <SelectItem value="2">February</SelectItem>
                    <SelectItem value="3">March</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">May</SelectItem>
                    <SelectItem value="6">June</SelectItem>
                    <SelectItem value="7">July</SelectItem>
                    <SelectItem value="8">August</SelectItem>
                    <SelectItem value="9">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="year">Expiry year</Label>
                <Select>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                        {new Date().getFullYear() + i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="CVC" />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  )
}

