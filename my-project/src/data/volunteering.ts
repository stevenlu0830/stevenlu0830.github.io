export type Volunteering = {
  slug: string;
  title: string;
  org: string;
  meta: string;
  logo: string;
  bullets: string[];
};

export const VOLUNTEERING: Volunteering[] = [
  {
    slug: "event-captain",
    title: "Event Captain of Vancouver Hong Kong Fair",
    org: "HK House",
    meta: "Feb 2025 – May 2026 · Arts and Culture",
    logo: "/org-logo/hkhouse-vol.jpg",
    bullets: [
      "Led volunteers of the HK House organization by briefing them on their tasks during the event day",
      "Managed on-site operations for a high-attendance event with over 1000 participants to ensure events run smoothly",
      "Supported coordination between the volunteers and the event planning team to ensure effective communication",
      "Addressed volunteers' questions regarding their tasks to make them clear on their responsibilities",
    ],
  },
  {
    slug: "game-helper",
    title: "Game Helper",
    org: "HK House",
    meta: "May 2024 – Present · Arts and Culture",
    logo: "/org-logo/hkhouse-vol.jpg",
    bullets: [
      "Promoted Hong Kong culture by introducing cultural games to over 1000 participants across the world",
      "Enhanced participants' experience by playing cultural games with them",
      "Created a welcoming environment to let participants enjoy and immerse in a variety of cultural games",
      "Offered hints, tips, and strategies to help participants advance in cultural games and solve riddles",
    ],
  },
  {
    slug: "student-volunteer-science-rxn",
    title: "Volunteer of Science RXN",
    org: "Science Undergraduate Society @ UBC",
    meta: "Sep 2025 · Science and Technology",
    logo: "/org-logo/susubc-vol.png",
    bullets: [
      "Created exciting and meaningful experiences for first-year science students to foster engagement and involvement in the science community",
      "Built and promoted a respectful, inclusive, and welcoming environment for all students",
      "Assisted the station coordinator with event setup and cleanup to ensure smooth operations and an organized environment",
    ],
  },
  {
    slug: "vice-chairman-transport-logistics-club",
    title: "Vice Chairman of Transport and Logistics Club",
    org: "Chan Sui Ki (La Salle) College",
    meta: "Sep 2020 – Aug 2022 · Science and Technology",
    logo: "/org-logo/csklsc-vol.png",
    bullets: [
      "Worked with internal members to plan and organize events such as movie sharing and trivia quizzes",
      "Participated in the preparation and running of the club's weekly meetings by creating and keeping track of agendas",
      "Discussed the feasibility of organizing events based on factors such as time, budget and manpower",
    ],
  },
];
