const isServer = typeof window === "undefined";
const isPreview = () => {
  let isPreviewValue = "yes";

  return isPreviewValue === "yes";
};

export { isPreview };
