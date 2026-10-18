import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-foreground">
      <h1 className="text-center text-3xl font-bold">
        Team Halakh Family
      </h1>

      <p className="text-center text-muted-foreground">
        Next.js + Tailwind CSS + shadcn/ui
      </p>

      <Button type="button">
        Project setup complete
      </Button>
    </main>
  );
}
