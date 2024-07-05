function blockIndex() {
  const devDeploy = import.meta.env.VITE_DEV_DEPLOY;
  if (devDeploy) {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.getElementsByTagName("head")[0].appendChild(meta);
  }
}

export default blockIndex;
