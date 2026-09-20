export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    let data = await $fetch<MemberRecords>(
      `${config.apiEndpoint}/configs/values/team-members`,
      {
        method: "GET",

        onResponse() {},

        onResponseError({ response }) {
          console.log(`Unable to GET config ` + response);
        },
      }
    );

    // Normalize years to always be arrays of string roles for compatibility
    if (data && typeof data === "object") {
      for (const member of Object.values(data)) {
        if (member && member.years && typeof member.years === "object") {
          for (const [year, roles] of Object.entries(member.years)) {
            if (typeof roles === "string") {
              member.years[year] = (roles as string)
                .split(",")
                .map((r) => r.trim())
                .filter(Boolean);
            }
          }
        }
      }
    }

    return data;
  } catch (err) {
    console.error("Error fetching team members:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Some thing happened uh o.",
    });
  }
});
