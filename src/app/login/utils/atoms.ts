import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage("user", null);
export const jwtAtom = atomWithStorage("jwt", null);
