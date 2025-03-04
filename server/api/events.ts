export default defineEventHandler(async (event) => {
    try {
      const data: ClubEvent[] = [
        {
          name: "Let’s Code with C Hash 🤓",
          url: "https://csharpcodeevent.com",
          startDate: "2025-06-10",
          endDate: "2025-06-12",
          featureImage: { url: "https://picsum.photos/1920/1080?computer" },
          location: "San Francisco, CA",
        },
        {
          name: "Debugging Marathon: The Never-ending Story",
          url: "https://debugfest2025.com",
          startDate: "2025-07-15",
          endDate: "2025-07-18",
          featureImage: { url: "https://picsum.photos/1920/1080?code" },
          location: "Austin, TX",
        },
        {
          name: "🌿 GRASS WITH RAS: Touching Grass Training Webinar",
          url: "https://gitgood2025.com",
          startDate: "2025-08-20",
          endDate: "2025-08-22",
          featureImage: { url: "https://picsum.photos/1920/1080?grass" },
          location: "Los Angeles, CA",
        },
        {
          name: "Hackathon: Ctrl + Alt + Compete!",
          url: "https://hackathon2025.com",
          startDate: "2025-10-12",
          endDate: "2025-10-14",
          featureImage: { url: "https://picsum.photos/1920/1080?hackathon" },
          location: "Seattle, WA",
        },
        {
          name: "Free Deodorant Giveaway!",
          url: "https://touchgrasswebinar.com",
          startDate: "2025-11-01",
          endDate: "2025-11-01",
          featureImage: { url: "https://picsum.photos/1920/1080?boardgames" },
          location: "Online",
        },
      ]
      return data;
    } catch (err) {
      throw createError({
        statusCode: 500,
        statusMessage: "Some thing happened uh o.",
      });
    }
  });
  