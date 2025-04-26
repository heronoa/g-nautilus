"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface AnimatedCardWrapperProps
  extends React.ComponentPropsWithoutRef<typeof motion.div> {
  children: React.ReactNode;
}

export const AnimatedCardWrapper = ({
  children,
  ...props
}: AnimatedCardWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
