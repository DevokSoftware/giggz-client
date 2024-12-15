import moment from "moment";
import { Location } from "../services/openapi";

export function displayLocationAddress(location?: Location): string {
  if (!location) {
    return "";
  }
  const streetAndNumber = location.street
    ? location.street + (location.number ? ` ${location.number}` : "")
    : "";

  return streetAndNumber + (streetAndNumber ? ", " : "") + location.city;
}

export function isPastDate(date?: string): boolean {
  return moment(date).isBefore(moment.now());
}

export function openTabWithExternUrl(linkUrl?: string) {
  if (!linkUrl) {
    return;
  }
  window.open(linkUrl, "_blank", "noopener,noreferrer");
}
