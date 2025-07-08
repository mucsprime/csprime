"use client";

import React, { ReactNode } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm w-full max-w-full"
      {...props}
    >
      <div
        className={cn(
          "pt-0 pb-4 min-h-[56px] max-h-[120px] transition-all duration-200 overflow-y-auto w-full max-w-full break-words whitespace-pre-line",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

// Simple custom Accordion implementation
export function SimpleAccordion({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col w-full max-w-xl", className)}>
      {children}
    </div>
  );
}

export function SimpleAccordionItem({
  question,
  answer,
  isOpen,
  onClick,
  className,
  triggerClassName,
  contentClassName,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}) {
  return (
    <div className={cn("border-b w-full max-w-xl", className)}>
      <button
        className={cn(
          "w-full text-left py-4 px-2 font-medium flex justify-between items-center focus:outline-none",
          triggerClassName
        )}
        onClick={onClick}
        type="button"
      >
        <span>{question}</span>
        <span className="ml-2">{isOpen ? "-" : "+"}</span>
      </button>
      <div
        className={cn(
          `w-full max-w-xl transition-all duration-200 overflow-y-auto px-2 pt-0 pb-4 text-sm min-h-[56px] max-h-[120px] break-words whitespace-pre-line ${
            isOpen ? "block" : "hidden"
          }`,
          contentClassName
        )}
      >
        {answer}
      </div>
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
