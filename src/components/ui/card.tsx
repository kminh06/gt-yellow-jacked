import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "border shadow-sm",
  {
    variants: {
      variant: {
        other: "bg-card text-card-foreground rounded-3xl overflow-hidden p-0 p-4 ",
        exercise: "bg-secondary text-secondary-foreground rounded-full p-6",
      },
    },
    defaultVariants: {
      variant: "exercise",
    },
  }
)

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Card }