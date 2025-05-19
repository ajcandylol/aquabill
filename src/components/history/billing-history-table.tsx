"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { History, FileText } from "lucide-react";
import type { BillEntry } from "@/types";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
const mockHistory: BillEntry[] = [
  { id: "1", date: "2023-12-15", period: "November 2023", consumption: 120, amount: 195.30 },
  { id: "2", date: "2024-01-15", period: "December 2023", consumption: 135, amount: 219.19 },
  { id: "3", date: "2024-02-15", period: "January 2024", consumption: 110, amount: 179.03 },
  { id: "4", date: "2024-03-15", period: "February 2024", consumption: 140, amount: 227.50 },
  { id: "5", date: "2024-04-15", period: "March 2024", consumption: 125, amount: 203.44 },
];


export function BillingHistoryTable() {
  // In a real app, this data would come from props or a data fetching hook
  const bills = mockHistory;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-6 h-6 text-primary" />
          Billing History
        </CardTitle>
        <CardDescription>View your past water bills and consumption records.</CardDescription>
      </CardHeader>
      <CardContent>
        {bills.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <FileText className="w-16 h-16 mb-4" />
            <p className="text-lg">No billing history found.</p>
            <p>Your past bills will appear here once available.</p>
          </div>
        ) : (
        <Table>
          <TableCaption>A list of your recent water bills.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead className="text-right">Consumption (units)</TableHead>
              <TableHead className="text-right">Amount Due</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell className="font-medium">{bill.period}</TableCell>
                <TableCell>{bill.date}</TableCell>
                <TableCell className="text-right">{bill.consumption.toLocaleString()}</TableCell>
                <TableCell className="text-right">${bill.amount.toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  <Button variant="outline" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
      </CardContent>
    </Card>
  );
}
