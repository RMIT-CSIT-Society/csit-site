import { PostSummary } from "~/server/api/types/mache";
import dayjs from "dayjs";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const config = useRuntimeConfig(event);
  const category = query["category"];
  const inActive = query["inactive"];
  const active = query["active"];

  try {
    const projects = await $fetch<PostSummary[]>(
      `${config.apiEndpoint}/projects`,
      {
        params: {
          category,
          drafts: 0,
        },
      }
    );

    console.log("inactive:", inActive, "active:", active);

    const projectsFiltered = projects.filter((project) => {
      const finishDate = dayjs(project.finishDate);
      const currentDate = dayjs();

      if (inActive) {
        return currentDate.isAfter(finishDate);
      }

      if (active) {
        console.log("filtering active events");
        return currentDate.isBefore(finishDate);
      }
    });

    return projectsFiltered;
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Post doesn't exist",
    });
  }
});
