export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const response = await $fetch<any>(
    `${config.emdashUrl}/_emdash/api/content/home_carousel_images`,{
      headers: {
        Authorization: `Bearer ${config.emdashToken}`,
      },
    }
  );

  const images = [];
  for (const item of response.data.items) {
    images.push(`${config.emdashUrl}/_emdash/api/media/file/${item.data.image.meta.storageKey}`);
  }
  
  return images;
});