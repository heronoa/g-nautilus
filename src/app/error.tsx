"use client";

import { ErrorFrame } from "@/components/Frames/ErrorFrame";
import { C } from "@/utils";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <ErrorFrame
      code={500}
      title={
        C.nodeEnv !== "production" ? error.name : "Erro Interno Inesperado"
      }
      description={
        C.nodeEnv !== "production"
          ? error.message
          : "Procure um desenvolvedor e relate o erro"
      }
      stackTrace={C.nodeEnv !== "production" ? error.stack : undefined}
    />
  );
}
