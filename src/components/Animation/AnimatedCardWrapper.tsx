// components/animations/AnimatedCardWrapper.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedCardWrapperProps
  extends React.ComponentPropsWithoutRef<typeof motion.div> {
  children: React.ReactNode;
}
export const AnimatedCardWrapper = ({
  children,
  ...props
}: AnimatedCardWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
