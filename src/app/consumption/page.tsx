"use client";

import { useState, useEffect } from "react";
import { ConsumptionForm } from "@/components/dashboard/consumption-form";
import { BillSummary } from "@/components/dashboard/bill-summary";
import { useSettings } from "@/contexts/settings-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter }_next_dynamic_client_module_chunks from "next/navigation";
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface CalculatedBill {
  consumption: number;
  period: string;
}

export default function LogConsumptionPage() {
  const { rateSettings, isSettingsLoaded } = useSettings();
  const [calculatedBill, setCalculatedBill] = useState<CalculatedBill | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [currentPeriod, setCurrentPeriod] = useState<string>("");

 useEffect(() => {
    setCurrentPeriod(format(new Date(), "MMMM yyyy"));
  }, []);


  const handleConsumptionSubmit = (data: { consumption: number; period: string }) => {
    setCalculatedBill(data);
    toast({
      title: "Consumption Logged",
      description: `Bill for ${data.period} calculated. Consumption: ${data.consumption} units.`,
      action: (
        <Button variant="outline" size="sm" onClick={() => router.push("/billing")}>
          View Bill
        </Button>
      ),
    });
    // Optionally redirect or show summary here itself.
    // For now, we show the summary on this page.
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          {currentPeriod && <ConsumptionForm onSubmit={handleConsumptionSubmit} defaultPeriod={currentPeriod}/>}
        </div>
        <div>
          {calculatedBill ? (
            <BillSummary
              consumption={calculatedBill.consumption}
              period={calculatedBill.period}
              rateSettings={rateSettings}
              isLoading={!isSettingsLoaded}
            />
          ) : (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Awaiting Input</CardTitle>
                <CardDescription>Your bill summary will appear here after you log consumption.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground">Enter consumption details to see the bill.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
