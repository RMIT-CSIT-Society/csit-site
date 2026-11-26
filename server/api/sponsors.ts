export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const response = await $fetch<any>(
    `${config.emdashUrl}/_emdash/api/content/sponsors`,{
      headers: {
        Authorization: `Bearer ${config.emdashToken}`,
      },
    }
  );

  const sponsors = [];
  for (const item of response.data.items) {
    sponsors.push({
      name: item.data.sponsor_name,
      tier: item.data.sponsor_tier.toLowerCase(),
      logo: `${config.emdashUrl}/_emdash/api/media/file/${item.data.logo.meta.storageKey}`, // CMS returns object instead of ready made link
      description : item.data.description,
    });
  }

  return sponsors;
});