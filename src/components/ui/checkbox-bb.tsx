"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-full border border-gray-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-600 data-[state=checked]:text-white data-[state=checked]:border-green-600 data-[state=checked]:h-5 data-[state=checked]:w-5",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      asChild
      className={cn("flex items-center justify-center text-current")}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        exit={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
<motion.svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2 }} d="M1.94999 6.16443L4.21799 9.45015L10.05 2.55015" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</motion.svg>


      </motion.div>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }



