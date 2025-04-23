"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button onClick={handleBack} variant="gradient">
      Go Back
    </Button>
  );
};

export default BackButton;
