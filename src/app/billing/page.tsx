"use client";

import { useState, useEffect } from "react";
import { BillSummary } from "@/components/dashboard/bill-summary";
import { useSettings } from "@/contexts/settings-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// This page would ideally get data from a shared state/context after consumption is logged
// For simplicity, it will try to read from localStorage or show a placeholder.

interface LatestBillData {
  consumption: number;
  period: string;
}

export default function ViewBillPage() {
  const { rateSettings, isSettingsLoaded } = useSettings();
  const [latestBill, setLatestBill] = useState<LatestBillData | null>(null);
  const [isLoadingBill, setIsLoadingBill] = useState(true);

  useEffect(() => {
    // Attempt to load the last calculated bill data if it was stored
    // This is a placeholder for a more robust state management solution
    const storedBillData = localStorage.getItem("latestAquaBill");
    if (storedBillData) {
      try {
        setLatestBill(JSON.parse(storedBillData));
      } catch (e) {
        console.error("Failed to parse latest bill data", e);
      }
    }
    setIsLoadingBill(false);
  }, []);

  // Effect to potentially listen to consumption submission if we used a global event bus or context update
  // For now, it's manual or requires a refresh after logging consumption if localStorage is used.
  // A better approach for real-time update without full global state:
  // LogConsumptionPage could use router.push('/billing?consumption=X&period=Y')
  // Then this page reads query params.
  // However, the prompt implies separate display. For this demo, we'll keep it simple.

  if (isLoadingBill || !isSettingsLoaded) {
     return (
      <div className="container mx-auto py-8">
        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Loading Bill...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-1">
                <Info className="w-8 h-8 mx-auto text-primary" />
                <p className="text-center text-muted-foreground">Fetching latest bill details...</p>
             </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!latestBill) {
    return (
      <div className="container mx-auto py-8">
        <Card className="max-w-md mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>No Bill to Display</CardTitle>
            <CardDescription>
              You haven't logged any consumption recently, or no bill data is available.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Info className="w-12 h-12 mx-auto mb-4 text-primary" />
            <p className="mb-4 text-muted-foreground">
              Please log your water consumption to calculate and view your bill.
            </p>
            <Button asChild>
              <Link href="/consumption">Log Consumption</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-lg mx-auto">
        <BillSummary
          consumption={latestBill.consumption}
          period={latestBill.period}
          rateSettings={rateSettings}
          isLoading={!isSettingsLoaded} 
        />
      </div>
    </div>
  );
}
