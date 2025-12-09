import { Calendar } from "@/src/shared/components/ui/calendar";

export default function Home() {
  const today = new Date();

  return (
    <div className="px-90 pb-160 gap-30 flex min-h-screen flex-col items-center overflow-hidden pt-28">
      <Calendar mode="single" captionLayout="dropdown" selected={today} />
    </div>
  );
}
