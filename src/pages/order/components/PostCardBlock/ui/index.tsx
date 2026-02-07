import { ChangeEvent } from "react";

import { Textarea } from "@/src/shared/ui/Textarea/ui";

import { useOrderStore } from "../../../model/order.store";

export const PostCardBlock = () => {
  const { postcard, setPostcard } = useOrderStore();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostcard(e.target.value);
  };

  return (
    <div className="desktop:gap-20 flex flex-col">
      <p className="caption text-grey-for-text">Открытка</p>
      <Textarea
        label="Дополните букет вашими искренними пожеланиями"
        rows={4}
        value={postcard}
        onChange={handleChange}
      />
    </div>
  );
};
