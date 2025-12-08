"use client";

import React from "react";

import { Calendar } from "@/src/shared/components/ui/calendar";

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="px-90 pb-160 gap-30 flex min-h-screen flex-col items-center overflow-hidden pt-28">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm"
        captionLayout="dropdown"
      />
    </div>
  );
}
