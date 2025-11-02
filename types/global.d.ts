declare global {
  interface OSChildAction {
    label: string;
    onPress: () => void;
  }

  interface OSAction {
    label: string;
    childActions: OSChildAction[];
  }

  interface Member {
    years: Record<string, string[]>;
    bio: string;
    links: { label: string; url: string }[];
    imageURL?: string;
  }

  interface YearToMembers {
    execs: string[];
    committee: string[];
  }

  type MemberRecords = Record<string, Member>;
}
