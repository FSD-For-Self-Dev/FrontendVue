export async function readUrlFile(url: string): Promise<File> {
  const blob = await (await fetch(url)).blob();
  const file = new File([blob], url.replace(/^.*\//g, ''), {type: blob.type});
  return file;
}