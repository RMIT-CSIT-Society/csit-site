declare global {
  interface ClubEvent {
    name: string;
    url: string;
    startDate: string;
    endDate: string;
    featureImage: { url: string };
    location: string;
  }

  interface OSChildAction {
    label: string;
    onPress: () => void;
  }

  interface OSAction {
    label: string;
    childActions: OSChildAction[];
  }
}

export { ClubEvent };
