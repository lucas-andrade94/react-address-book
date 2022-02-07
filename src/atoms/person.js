import { atom } from "recoil";

export const editPersonState = atom({
  key: "editPerson",
  default: [],
});

export const refreshState = atom({
  key: "refresh",
  default: false,
});
