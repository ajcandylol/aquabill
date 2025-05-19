"use client";

import { useState, useEffect } from "react";
import { ConsumptionForm } from "@/components/dashboard/consumption-form";
import { BillSummary } from "@/components/dashboard/bill-summary";
import { useSettings } from "@/contexts/settings-context";
import { format } from 'date-fns';

interface CalculatedBill {
  consumption: number;
  period: string;
}

export default function DashboardPage() {
  const { rateSettings, isSettingsLoaded } = useSettings();
  const [calculatedBill, setCalculatedBill] = useState<CalculatedBill | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<string>("");

  useEffect(() => {
    setCurrentPeriod(format(new Date(), "MMMM yyyy"));
  }, []);


  const handleConsumptionSubmit = (data: { consumption: number; period: string }) => {
    setCalculatedBill(data);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          {currentPeriod && (
             <ConsumptionForm onSubmit={handleConsumptionSubmit} defaultPeriod={currentPeriod} />
          )}
        </div>
        <div>
          <BillSummary
            consumption={calculatedBill?.consumption}
            period={calculatedBill?.period}
            rateSettings={rateSettings}
            isLoading={!isSettingsLoaded}
          />
        </div>
      </div>
    </div>
  );
}
