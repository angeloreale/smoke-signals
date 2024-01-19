// rm-decorator.ts
"use server";
import type { IDCharacter, INCharacter, UserSchema } from "@types";
import { getUserMeta } from "@model";

/* private */
const decorateCharacter = (
  character: INCharacter,
  uMeta: UserSchema,
): IDCharacter => {
  const decd: IDCharacter = { ...character };
  decd.favorite = undefined;
  if (uMeta?.rickmorty?.favorites?.characters?.includes(character?.id))
    decd.favorite = true;
  decd.favorite = false;
  return decd;
};

/* public */
export const decorateRMCharacters = async (
  characters: INCharacter[],
  uid: string,
): Promise<IDCharacter[]> => {
  const uMeta: UserSchema = await getUserMeta({ email: uid });
  const decd: IDCharacter[] = characters.map((char) =>
    decorateCharacter(char, uMeta),
  );
  return decd;
};