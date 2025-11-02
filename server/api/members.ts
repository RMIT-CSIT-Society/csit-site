export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    let data = await $fetch<MemberRecords>(
      `${config.apiEndpoint}/configs/values/team-members`,
      {
        method: "GET",

        onResponse() {},

        onResponseError({ response }) {
          console.log(`Unable to PUT config ` + response);
        },
      }
    );
    return data;
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "Some thing happened uh o.",
    });
  }
});
