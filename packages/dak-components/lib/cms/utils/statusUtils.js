

export default function isResourceAvailable(status, isPreview) {
    if(isPreview) return true;
    if(status === "published") return true;

    return false;
}