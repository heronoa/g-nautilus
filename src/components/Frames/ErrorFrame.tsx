import { HomeHeadingSection } from "@/components";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorFrameProps {
  code?: number;
  title: string;
  description: string;
  stackTrace?: string;
}

export const ErrorFrame: React.FC<ErrorFrameProps> = ({
  code,
  title,
  description,
  stackTrace,
}: ErrorFrameProps) => {
  return (
    <main className="flex flex-col justify-center items-center mx-auto px-4 py-8 w-full lg:max-w-5xl">
      <HomeHeadingSection headTitle={false} back />
      <div className="w-full h-full space-y-4 flex flex-col items-center justify-center mt-12">
        <h1 className="text-5xl text-left font-bold">
          {code && `${code} -`} {title}
        </h1>
        <p>{description}</p>
        <Link href="/">
          <Button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
            variant="gradient"
          >
            Go to Homepage
          </Button>
        </Link>
        {stackTrace && (
          <details className="w-full h-full mt-4 p-4 bg-red-100 rounded-md">
            <summary className="cursor-pointer">Trace Track</summary>
            <pre className="whitespace-pre-wrap">{stackTrace}</pre>
          </details>
        )}
      </div>
    </main>
  );
};
