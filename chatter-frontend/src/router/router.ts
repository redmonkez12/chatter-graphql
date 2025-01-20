import { NavigateFunction } from "react-router";

let navigateFn: NavigateFunction | null = null;

export const setNavigate = (navigate: NavigateFunction) => {
  navigateFn = navigate;
};

export const navigateTo = (path: string) => {
  if (navigateFn) {
    navigateFn(path);
  } else {
    console.error("Navigate function is not set.");
  }
};
