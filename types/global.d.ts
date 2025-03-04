declare global {
  interface ClubEvent {
    name: string;
    url: string;
    startDate: string;
    endDate: string;
    featureImage: { url: string };
    location: string;
  }
}

export { ClubEvent };
