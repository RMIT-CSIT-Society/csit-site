export default function (members: Ref<MemberRecords | null>) {
  const execRoles = [
    "President",
    "VP (Administration)",
    "VP (Operations)",
    "Treasurer",
    "Events Manager",
  ];

  const containsAny = (arr: string[], values: string[]): boolean => {
    return arr.some((item) => values.includes(item));
  };

  const yearToMembersMap = computed(() => {
    const yearMap: Record<string, YearToMembers> = {};

    Object.entries(members.value ?? {}).forEach(([name, data]) => {
      Object.entries(data.years).forEach(([year, roles]) => {
        if (!yearMap[year]) {
          yearMap[year] = {
            execs: [],
            committee: [],
          };
        }

        console.log(roles);

        if (containsAny(roles, execRoles)) {
          yearMap[year].execs.push(name);
        } else {
          yearMap[year].committee.push(name);
        }
      });
    });

    return yearMap;
  });

  const theTeamTabs = computed(() => {
    return Object.keys(yearToMembersMap.value).reverse();
  });

  return { yearToMembersMap, theTeamTabs };
}
