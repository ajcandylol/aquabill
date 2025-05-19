"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSettings } from "@/contexts/settings-context";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save } from "lucide-react";
import type { RateSettings } from "@/types";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";


const rateSettingsSchema = z.object({
  ratePerUnit: z.coerce.number().min(0, "Rate must be a positive number."),
  taxPercentage: z.coerce.number().min(0, "Tax percentage must be positive.").max(100, "Tax cannot exceed 100%."),
  discountPercentage: z.coerce.number().min(0, "Discount percentage must be positive.").max(100, "Discount cannot exceed 100%."),
});

type RateSettingsFormValues = z.infer<typeof rateSettingsSchema>;

export function RateSettingsForm() {
  const { rateSettings, setRateSettings, isSettingsLoaded } = useSettings();
  const { toast } = useToast();

  const form = useForm<RateSettingsFormValues>({
    resolver: zodResolver(rateSettingsSchema),
    // Default values will be set by useEffect once context is loaded
  });

  useEffect(() => {
    if (isSettingsLoaded) {
      form.reset(rateSettings);
    }
  }, [isSettingsLoaded, rateSettings, form]);


  function onSubmit(data: RateSettingsFormValues) {
    setRateSettings(data);
    toast({
      title: "Settings Saved",
      description: "Your new rate configurations have been applied.",
      variant: "default",
    });
  }

  if (!isSettingsLoaded) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
             <Settings className="w-6 h-6 text-primary" />
            Rate Configuration
          </CardTitle>
          <CardDescription>Manage water rates, tax, and discount rules.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-1/3" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          Rate Configuration
        </CardTitle>
        <CardDescription>Manage water rates, tax, and discount rules used for bill calculation.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="ratePerUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate per Unit (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 100.00" {...field} />
                  </FormControl>
                  <FormDescription>The cost for each unit of water consumed.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Percentage (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" placeholder="e.g., 5" {...field} />
                  </FormControl>
                  <FormDescription>The sales tax or VAT applied to the bill.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Percentage (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" placeholder="e.g., 0 or 10" {...field} />
                  </FormControl>
                  <FormDescription>Any applicable discount on the total bill.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
