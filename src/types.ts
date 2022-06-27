export interface IARFileEntry {
  url: string;
  label: string;
  username: string;
  previewImg: string;
}

export type TUrlParams = "callToAction" | "checkoutTitle" | "checkoutSubtitle";
export interface IArMessage {
  callToAction: string;
  checkoutTitle: string;
  checkoutSubtitle: string;
}
