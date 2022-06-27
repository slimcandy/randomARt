import { IARFileEntry, IArMessage, TUrlParams } from "./types";

export const getNextObject = (library: IARFileEntry[]) => {
  const length = library.length - 1;
  const randomIndex = Math.floor(Math.random() * length);
  const randomObject: IARFileEntry = library[randomIndex];

  return randomObject;
};

export const stringifyMessage = function stringifyMessage(
  message?: IArMessage
) {
  if (!message) {
    return "";
  }
  return Object.keys(message)
    .map((key) => {
      if (message[key as TUrlParams].length > 0) {
        return `${key}=${encodeURI(message[key as TUrlParams])}`;
      }
      return "";
    })
    .join("&");
};
