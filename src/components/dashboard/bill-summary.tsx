"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Info } from "lucide-react";
import { RateSettings } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

interface BillSummaryProps {
  consumption?: number;
  period?: string;
  rateSettings: RateSettings;
  isLoading: boolean;
}

export function BillSummary({ consumption, period, rateSettings, isLoading }: BillSummaryProps) {
  
  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-primary" />
            Bill Summary
          </CardTitle>
           <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-1/2" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-1/3" />
          </div>
          <div className="border-t pt-4 mt-4 space-y-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (typeof consumption !== 'number' || !period) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-primary" />
            Bill Summary
          </CardTitle>
          <CardDescription>Enter consumption data to see your bill.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <Info className="w-8 h-8 mr-2" />
            <p>No data to display bill.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const baseAmount = consumption * rateSettings.ratePerUnit;
  const taxAmount = baseAmount * (rateSettings.taxPercentage / 100);
  const subtotal = baseAmount + taxAmount;
  const discountAmount = subtotal * (rateSettings.discountPercentage / 100);
  const totalAmount = subtotal - discountAmount;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-primary" />
          Bill Summary
        </CardTitle>
        <CardDescription>Your calculated water bill for {period}.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Consumption</p>
          <p className="text-lg font-semibold">{consumption.toLocaleString()} units</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Rate per Unit</p>
          <p className="text-md">${rateSettings.ratePerUnit.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Base Amount</p>
          <p className="text-md">${baseAmount.toFixed(2)}</p>
        </div>
         <div>
          <p className="text-sm text-muted-foreground">Tax ({rateSettings.taxPercentage}%)</p>
          <p className="text-md">${taxAmount.toFixed(2)}</p>
        </div>
        {rateSettings.discountPercentage > 0 && (
           <div>
            <p className="text-sm text-muted-foreground">Discount ({rateSettings.discountPercentage}%)</p>
            <p className="text-md text-green-600">-${discountAmount.toFixed(2)}</p>
          </div>
        )}
        <div className="border-t pt-4 mt-4">
          <p className="text-sm font-medium text-muted-foreground">Total Amount Due</p>
          <p className="text-3xl font-bold text-primary">${totalAmount.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
