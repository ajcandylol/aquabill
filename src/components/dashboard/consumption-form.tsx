"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, Droplets } from "lucide-react";

const consumptionFormSchema = z.object({
  consumption: z.coerce.number().min(0, "Consumption must be a positive number."),
  period: z.string().min(1, "Billing period is required (e.g., Jan 2024).")
});

type ConsumptionFormValues = z.infer<typeof consumptionFormSchema>;

interface ConsumptionFormProps {
  onSubmit: (data: ConsumptionFormValues) => void;
  defaultPeriod?: string;
}

export function ConsumptionForm({ onSubmit, defaultPeriod }: ConsumptionFormProps) {
  const form = useForm<ConsumptionFormValues>({
    resolver: zodResolver(consumptionFormSchema),
    defaultValues: {
      consumption: 0,
      period: defaultPeriod || "",
    },
  });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="w-6 h-6 text-primary" />
          Log Water Consumption
        </CardTitle>
        <CardDescription>Enter your water usage for the billing period.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="consumption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Water Consumption (units)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 150" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Period</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="e.g., January 2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Bill
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
