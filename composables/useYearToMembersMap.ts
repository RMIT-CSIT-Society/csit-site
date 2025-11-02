// Here are the exec roles, these are listed in order of hierarchy
export const execRoles = [
  "President",
  "Vice President of Administration",
  "Vice President of Operations",
  "Vice President",
  "Operations Manager",
  "Treasurer",
  "Secretary",
  "Events Manager",
];

const containsAny = (arr: string[], values: string[]): boolean => {
  return arr.some((item) => values.includes(item));
};

export default function (members: Ref<MemberRecords | null>) {
  const yearToMembersMap = computed(() => {
    const yearMap: Record<string, YearToMembers> = {};

    // Build the year to members map
    Object.entries(members.value ?? {}).forEach(([name, data]) => {
      Object.entries(data.years).forEach(([year, roles]) => {
        if (!yearMap[year]) {
          yearMap[year] = {
            execs: [],
            committee: [],
          };
        }

        if (containsAny(roles, execRoles)) {
          yearMap[year].execs.push(name);
        } else {
          yearMap[year].committee.push(name);
        }
      });
    });

    // Sort execs based on execRoles order
    Object.keys(yearMap).forEach((year) => {
      yearMap[year].execs.sort((a, b) => {
        // Find the main exec role for each member in this year
        const getExecRoleIndex = (memberName: string) => {
          const memberData = members.value?.[memberName];

          // The reason we return MAX_SAFE_INTEGER here is that if the member data
          // is not found, we want to push them to the end of the list.
          if (!memberData) return Number.MAX_SAFE_INTEGER;

          const roles = memberData.years[year] || [];
          const execRole = roles.find((role) => execRoles.includes(role));

          return execRole
            ? execRoles.indexOf(execRole)
            : Number.MAX_SAFE_INTEGER;
        };
        return getExecRoleIndex(a) - getExecRoleIndex(b);
      });
    });

    return yearMap;
  });

  const theTeamTabs = computed(() => {
    return Object.keys(yearToMembersMap.value).reverse();
  });

  return { yearToMembersMap, theTeamTabs };
}
