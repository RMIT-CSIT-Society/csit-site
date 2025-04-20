export default defineEventHandler(async (event) => {
  try {
    const data: MemberRecords = {
      "Some random cat": {
        years: {
          "1825": ["Emotional Support Intern", "Founding mother"],
          "2025": ["Super Senior Emotional Support"],
          "2024": ["Senior Emotional Support"],
          "2023": ["Junior Emotional Support"],
          "2020": ["Junior Emotional Support"],
        },
        bio: "Oiiai, oiiai, oiiai, oii—, oii— Oiiai, oiiai, oiiai, oii—, oii— Oiiai, oiiai, oiiai, oii—, oii—",
        links: [
          {
            label: "LinkedIn",
            url: "#",
          },
          {
            label: "Instagram",
            url: "#",
          },
          {
            label: "X",
            url: "#",
          },
        ],
        imageURL: "/img/cat.jpg",
      },
      "Cornelius Stratton Inglethorpe-Turner": {
        years: {
          "1825": ["President", "Alledged Founder"],
        },
        bio: "Our great alleged founding father Cornelius was an inspiring figure. From inventing the now defuct Greentooth and  ",
        links: [
          {
            label: "LinkedIn",
            url: "#",
          },
          {
            label: "Instagram",
            url: "#",
          },
          {
            label: "X",
            url: "#",
          },
        ],
        imageURL: "/img/founding-father.png",
      },
    };
    return data;
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "Some thing happened uh o.",
    });
  }
});
