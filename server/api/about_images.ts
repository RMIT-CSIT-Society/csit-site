export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const response = await $fetch<any>(
    `${config.emdashUrl}/_emdash/api/content/about_page_images`,{
      headers: {
        Authorization: `Bearer ${config.emdashToken}`,
      },
    }
  );

  const images = [];
  for (const item of response.data.items) {
    images.push(`/api/media/${item.data.image.meta.storageKey}`);
  }
  return images;
});