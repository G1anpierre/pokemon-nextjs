import { Suspense } from "react";

import { CharacterDetail } from "@/components/character-detail";

const CharacterPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CharacterDetail id={Number(id)} />
    </Suspense>
  );
};

export default CharacterPage;
