export const websites = [
  {
    title: "American Addiction Centers",
    link: "https://americanaddictioncenters.org/",
  },
  { title: "Treatment Solutions", link: "https://treatmentsolutions.com/" },
  { title: "Veteran Addiction", link: "https://veteranaddiction.org/" },
  { title: "Solutions Recovery", link: "https://solutions-recovery.com/" },
  { title: "Withdrawal", link: "https://withdrawal.net/" },
  { title: "Drug Abuse", link: "https://drugabuse.com/" },
  {
    title: "Project Know",
    link: "https://projectknow.com/",
    note: "Sold to a competitor company",
  },
  {
    title: "Detox",
    link: "https://detox.net/",
    note: "Sold to a competitor company",
  },
  {
    title: "Rehabs",
    link: "https://rehabs.com/",
    note: "Sold to a competitor company",
  },
  {
    title: "Fentanyl Addiction",
    link: "https://fentanylsupport.org/",
    note: "Sold to a competitor company",
  },
  { title: "Laguna Treatment", link: "https://lagunatreatment.com/" },
  { title: "Recovery First", link: "https://recoveryfirst.org/" },
  { title: "River Oaks Treatment", link: "https://riveroakstreatment.com/" },
  { title: "AdCare", link: "https://adcare.com/" },
  { title: "Oxford Treatment", link: "https://oxfordtreatment.com/" },
  { title: "Desert Hope Treatment", link: "https://deserthopetreatment.com/" },
  { title: "Greenhouse Treatment", link: "https://greenhousetreatment.com/" },
  {
    title: "ClientReach",
    link: "https://clientreachapp.recoverybrands.com/login",
    note: "Leading advertising platform in the addiction recovery space",
  },
];

export const projectsData = [
  {
    title: "CTAs",
    content: `Designed and implemented visually compelling, high-performance call-to-actions (CTAs) that drove measurable increases in user engagement and conversion rates. Developed reusable React components with flexible styling options, enabling marketing teams to test variations without developer involvement. Built logic to adapt CTAs based on device type, viewport, and user flow, ensuring they felt natural and unobtrusive. These enhancements contributed to significant improvements in lead generation and user retention.`,
    link: "https://americanaddictioncenters.org/",
    imageLink: `${
      process.env.NEXT_PUBLIC_BASE_PATH || ""
    }/images/projects/veteran-cta.png`,
  },
  {
    title: "Storybook Application",
    content: `Storybook application to house all of AAC's internal components, which were shared across a portfolio of Next.js applications. Testing was primarily done with React Testing Library, and code coverage was monitored through GitHub Actions. I personally created the AlumniStoriesForm seen in the screenshot and touched countless others components.`,
    imageLink: `${
      process.env.NEXT_PUBLIC_BASE_PATH || ""
    }/images/projects/aac-cl.webp`,
  },
  {
    title: "AAC Advertising Application - ClientReach",
    content: `ClientReach is the leading advertising platform in the addiction recovery space. It allows users to purchase ad space and access detailed analytics. I worked on revamping the entire site, utilizing style components, fixing various bugs, updating react hook forms, etc.`,
    link: "https://clientreachapp.recoverybrands.com/",
    imageLink: `${
      process.env.NEXT_PUBLIC_BASE_PATH || ""
    }/images/projects/aac-client-reach.webp`,
  },
  {
    title: "AAC Internal Tooling",
    content: `This site consolidated multiple internal tools, including: a GUI for adding Nginx redirects, a CRUD app for creating and monitoring dynamic QR codes, a facility features editor with its own API (consumed by the web portfolio), and dashboards showing version status of shared repos across sites. I worked on adding, creating QR codes and listing them out.`,
    imageLink: `${
      process.env.NEXT_PUBLIC_BASE_PATH || ""
    }/images/projects/aac-internal-tool.webp`,
  },
  {
    title: "AAC Native App for Alumni",
    content: `A React Native/Expo app built during a developer week initiative. It served as a proof of concept for future mobile projects and introduced the frontend team to native app development. I created the sobriety date calculator, the learn section which pulls in blog pages from AAC's WordPress endpoint.`,
    videoLink: `${
      process.env.NEXT_PUBLIC_BASE_PATH || ""
    }/videos/aac-alumni-app.mp4`,
  },
];
