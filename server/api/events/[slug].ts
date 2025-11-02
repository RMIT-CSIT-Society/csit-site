import { Post } from "~/server/api/types/mache";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const config = useRuntimeConfig(event);

  try {
    const project = await $fetch<Post>(
      `${config.apiEndpoint}/projects/${slug}`
    );

    return project;
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Post doesn't exist",
    });
  }
});
