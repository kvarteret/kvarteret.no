import { Status } from "../queries/events";

export default function isResourceAvailable(
  status: Status | string,
  isPreview: boolean
) {
  if (isPreview) return true;
  if (status === Status.Published) return true;

  return false;
}
