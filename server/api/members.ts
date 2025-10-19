export default defineEventHandler(async (event) => {
  try {
    let data = await $fetch<MemberRecords>(
      "https://csit.mache.mechetle.com/api/configs/values/team-members",
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
