export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const key = getRouterParam(event, "key");

  const file = await $fetch.raw(
    `${config.emdashUrl}/_emdash/api/media/file/${key}`,
    { responseType: "arrayBuffer" }
  );

  setHeader(event, "Content-Type", file.headers.get("content-type") || "image/webp");
  setHeader(event, "Cache-Control", "public, max-age=86400");

  return Buffer.from(file._data as ArrayBuffer);
});