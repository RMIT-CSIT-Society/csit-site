import { SocialLink } from "~/server/api/types/mache";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const socials = await $fetch<SocialLink[]>(
      `${config.apiEndpoint}/configs/values/socials`
    );

    return socials;
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Socials config doesn't exist",
    });
  }
});
