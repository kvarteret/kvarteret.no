import { Status } from "../queries/events";

export default function isResourceAvailable(
  status: Status,
  isPreview: boolean
) {
  if (isPreview) return true;
  if (status === Status.Published) return true;

  return false;
}
