import { Button } from "@/src/shared/ui";

export default function Home() {
  return (
    <div className="px-90 pb-160 gap-30 flex min-h-screen flex-col items-center overflow-hidden pt-28">
      <h1 className="h1">Витрина</h1>
      <Button disabled>Добавить в корзину</Button>
    </div>
  );
}
