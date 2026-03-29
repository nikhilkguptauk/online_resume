export const contactToEmail = 'contact@nikhilkgupta.uk'
export const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? ''

export const heroData = {
  name: 'Nikhil K Gupta',
  title: 'Senior Automation Engineer',
  phone: '+44-7979 965 209',
  email: contactToEmail,
  linkedInDisplay: 'www.linkedin.com/in/nikhilkgupta84',
  linkedInUrl: 'https://www.linkedin.com/in/nikhilkgupta84',
  websiteDisplay: 'NikhilKGupta.uk',
  websiteUrl: 'https://NikhilKGupta.uk',
  location: 'London, UK',
}

export const typography = {
  bodyFontFamily: "'Calibri', 'Trebuchet MS', system-ui, -apple-system, 'Segoe UI', sans-serif",
  bodyFontSize: '11pt',
  bodyFontSizeCompact: '11pt',
  bodyLineHeight: '1.2',
  listPadding: '6px 20px 6px 36px',
  listItemSpacing: '3px',
  listStyleType: 'disc',
}

const downloadButtonStyles = {
  option1: {
    backgroundColor: '#111827',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '13px',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  option2: {
    backgroundColor: '#ffffff',
    color: '#0d1b2a',
    border: '1px solid #dbffcf',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '13px',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  option3: {
    backgroundColor: '#dbffcf',
    color: '#0d1b2a',
    border: '1px solid #c9f2be',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '13px',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  option4: {
    backgroundColor: 'transparent',
    color: '#1e40af',
    border: 'none',
    borderRadius: '0',
    padding: 0,
    fontSize: '13px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  option5: {
    backgroundColor: '#f3f4f6',
    color: '#111827',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '13px',
    textDecoration: 'none',
    cursor: 'pointer',
  },
} as const

export type DownloadButtonVariant = keyof typeof downloadButtonStyles

export const ui = {
  downloadButtonVariant: 'option3' as DownloadButtonVariant,
  downloadButtonStyles,
}

export const profileBullets: string[] = [
  '**14 years** of experience in development, automation using **Python, Pytest, Robot framework, JavaScript Selenium Web Driver, Playwright, Flask REST API** and Mobile Automation using **Appium** and **XCUITest**.',
  '**Mobile test automation:** Architected **iOS/Android** frameworks with **Appium**, **XCUITest**, **Robot Framework**, **pytest**/**pytest-xdist**, **Allure**, **WebDriverAgent (WDA)**, reusable keywords/libraries, **page objects**, and **device-farm** orchestration; **Jenkins** CI/CD on **real devices**.',
  '**Automation platform:** **React** / **TypeScript** dashboard, **Flask** **REST** APIs, **Kubernetes** deployments, real-time execution monitoring, metrics/trends, and **Allure**-integrated reporting.',
  '**AI & LLM tooling:** Daily use of **Cursor** for AI-assisted development; experience with **Anthropic Claude** models, **Google Gemini** APIs, and **MCP** (Model Context Protocol) servers for integrated workflows and automation.',
  'Experience in automating web pages using **Python Selenium** in prior roles.',
  'Working experience in **DevOps** on **Kubernetes, Docker, Ansible, AWS, Jenkins, GitHub.**',
  'Worked as **Test Engineer (Automation)** on **Playwright and Kubernetes, WinRMIS, EPOS, EManager, French Fiscalization, EFT payments like NMI, Clover, Elavon, Adyen**.',
  'Have significant automation experience in domains like - **Information Security** and **Big Data.**',
  'Experience in UI development using **React** and **TypeScript**.',
  'Rich experience in automation development using **REST APIs, Web Pages, VM-Ware, Windows applications, AWS cloud services,** etc.',
  'Significant experience on **Docker** and **Ansible** for setting up VMs, environments, cloud setups and deployment pipelines etc.',
  'Adept in bringing forth expertise in design, installation, testing and maintenance of software systems.',
  'Able to effectively self-manage during independent projects, as well as collaborate as part of a productive team.',
  'Working closely with various stakeholders like product owner, scrum master, security architect, data architect, solution architect, testing teams, UAT users, etc.',
  'Proficient in delivery methodologies viz. Scrum, Agile, and Waterfall. Follower of Agile and Scrum methodologies.',
  'Active participant in sprint ceremonies viz. sprint planning, estimation, backlog grooming, closure, retrospection, etc.',
  'Excellent in managing time and tasks to handle multiple work streams. Successfully executed projects with globally distributed teams, from different cultural backgrounds, while maintaining good relationships.',
  'Self-Motivator & Team Player.',
]

export interface SkillRow {
  category: string
  text: string
}

export interface SectionTableData {
  title: string
  columns?: string[]
  columnWidths: string[]
  rows: string[][]
}

export interface ProjectEntry {
  heading: string
  summary: string
  bullets: string[]
}

export const projectsPage3: ProjectEntry[] = [
  {
    heading: 'SOFTWARE TEST ENGINEER - AUTOMATION, AT MOTOROLA SOLUTIONS, FROM JAN-2025 - CURRENT',
    summary: 'Motorola Solutions - London',
    bullets: [
      'Mobile Test Automation Framework',
      'Architected an enterprise-grade mobile automation framework for iOS and Android using Appium, Robot Framework, XCUITest, Playwrite and Python.',
      'Built 100+ reusable Robot Framework keywords and custom libraries for core scenarios including device management and authentication.',
      'Implemented intelligent driver management with automated Appium service orchestration and iOS WebDriverAgent (WDA) setup.',
      'Designed a modular Page Object architecture with 20+ screen objects to ensure maintainable and scalable test development.',
      'Integrated Pytest-xdist for parallel execution and Allure reporting for advanced test visualisation and analytics.',
      'Web-Based Automation Platform',
      'Developed a full-stack automation dashboard utilising a React TypeScript frontend and a Python Flask backend.',
      'Built real-time execution monitoring tools featuring historical reporting and integrated Allure report viewing.',
      'Engineered a REST API to handle test orchestration, device management, and execution result storage.',
      'Created Kubernetes deployment configurations to enable scalable, cloud-based test execution.',
      'Implemented a responsive UI featuring test metrics visualisation and execution trend charts.',
      'CI/CD Integration & Infrastructure',
      'Integrated the automation framework into CI/CD pipelines to enable automated validation for every build on real devices.',
      'Configured Jenkins pipelines for scheduled execution including automated video recording for failed scenarios.',
      'Set up a device farm management system with automatic device discovery and allocation logic.',
      'Key Impact & Results',
      'Reduced manual regression testing by 70% through strategic automated test coverage.',
      'Achieved 95%+ test reliability by implementing sophisticated automatic retry mechanisms.',
      'Accelerated release cycles by providing continuous automated validation within the deployment pipeline.',
      "Enabled non-technical stakeholders to contribute to testing via Robot Framework's natural language syntax.",
    ],
  },
  {
    heading: 'TEST ENGINEER (AUTOMATION), AT EUROSTOP LTD, FROM SEP-2023 - OCT-2024',
    summary: 'Eurostop Ltd, UK - UK',
    bullets: [
      'Developed robust automation frameworks, boosting testing efficiency by 40%.',
      'Executed over 500 automated test cases, reducing manual effort significantly.',
      'Collaborated with cross-functional teams to enhance product quality.',
      'Streamlined testing processes, cutting release cycles by 30%.',
      'Implemented CI/CD pipelines, accelerating deployment times by 50%.',
      'Conducted thorough regression testing, ensuring seamless updates.',
      'Mentored junior engineers, fostering a culture of continuous improvement.',
      'Achieved 95% test coverage, enhancing overall software reliability.',
    ],
  },
  {
    heading: 'SR. SOFTWARE ENGINEER, AT IMAGINATION TECHNOLOGIES UK, FROM JUNE-2022 - JULY-2023',
    summary:
      "Imagination Technologies do engineering around graphics, CPU, and AI chip designs that are at the core of your favorite electronic products. What's unique about them is that they're high-performance and power efficient, while being squeezed into the smallest space possible.",
    bullets: [
      'Using an in-house built Python framework to test the system and optimizing the existing workflows.',
      'Automated Web pages of the product using Python Selenium framework.',
      'Developed Plugins in python to add new functionality in the framework.',
      'Automated the test scenarios and integrated them in Jenkins after adding new Jenkins files in Groovy scripts.',
      'Added new Flask REST APIs to add new functionality in the framework.',
      'Developed new dashboard for automation using ReactJS.',
    ],
  },
  {
    heading: 'ENGINEER II, AT CROWDSTRIKE, FROM JULY-2020 TO JUNE-2022',
    summary:
      'CrowdStrike is the leader in cloud-delivered next-generation endpoint protection. CrowdStrike has revolutionized endpoint protection by being the first and only company to unify next-generation antivirus (AV), endpoint detection and response (EDR), and a 24/7 managed hunting service - all delivered via a single lightweight agent.',
    bullets: [
      'Using Python framework, developed scripts and library functions to install, uninstall and operate Falcon agents.',
      'Developed Docker scripts to set up dev environments on local VMs.',
      'Automated Web pages of the product using Python Selenium framework.',
      "Automated the test scenarios to find the performance of Falcon agent using Python's plumbum module.",
      "Automated the verification of communication between Falcon Server and Falcon Agent using Python's REST APIs.",
      'Developed an ansible framework using ansible roles to automate the devops tasks.',
      "Used Python's pandas library to process historical data and find values like average, min and max.",
      "Used JavaScript's Plotly library in ReactJS to fix the GUI of the existing web console.",
      'Contributed in deployment of MacOS VMs on VMWare Fusion.',
      'Code checkin / checkout using BitBucket / Stash and git.',
      'Setup Jenkins jobs and pipelines to trigger various automation runs using Groovy scripts.',
    ],
  },
  {
    heading: 'SDET, AT DRUVA, FROM SEPT-2017 TO JULY-2020',
    summary:
      "Druva Phoenix is a leading cloud-based server backup solution. Druva Phoenix delivers data availability and governance for enterprise infrastructures with a unique cloud-first approach combining high-performance, scalable backup, disaster recovery, archival, and analytics to simplify data protection, improve visibility, and dramatically reduce the risk, cost, and effort of managing today's complex information environment.",
    bullets: [
      'Using the Python Requests module, developed the rest API testing framework for automation-testing of REST APIs of Phoenix REST Server.',
      'Automated Web pages of the product using Python Selenium framework.',
      'Developed Docker scripts to create simulation of AWS cloud on local VMs.',
    ],
  },
]

export const druvaContinuationBullets: string[] = [
  'Automated the simulation of actions performed by Admins and then verification of the outcomes of the action. E.g. Checking of outcome in audit trail and generating reports based on that.',
  'Automated the verification of communication between Phoenix Server and Phoenix Agent using SMB-V2 protocol in Hyper-V proxy.',
  'Automated the verification of data upload to AWS S3 bucket using Boto3 module.',
  'Migrated automation done in Robot framework to Pytest framework for better efficiency and robustness.',
  "Used JavaScript's Cypress Framework to automate GUI testing of Druva Phoenix application pages.",
  'Used Python Selenium Web driver to automate UI testing of Druva One Console application pages like Login page, Dashboard page, etc.',
  'Used Python Pyvmoni for automation of Hyper-V and VMWare for operations like Create-VM, Shutdown-VM, RestartVM, etc.',
  'Setup Jenkins jobs and pipelines to trigger various automation runs using Groovy scripts.',
  "Developed REST APIs and setup mock server in Python's Flask module for billing services.",
]

export const projectsPage4: ProjectEntry[] = [
  {
    heading:
      'MODULE LEAD AUTOMATION, IN PROJECT VIRTUAL POWER PLANT, AT AUTOGRID, U.S.A, FROM NOV-2015 TO SEP-2017',
    summary:
      "AutoGrid builds software applications that enable a smarter distributed energy world. The company's suite of flexibility management applications allows utilities, electricity retailers, renewable energy project developers and energy service providers to deliver cleaner, affordable and reliable energy by managing networked distributed energy resources (DERs) in real time and at scale. AutoGrid has more than 5,000 megawatts of DERs.",
    bullets: [
      'Designed and developed automation framework from scratch, and automated test cases that involve use of products like Redis, MySQL, Kafka, Hbase, RabbitMQ etc.',
      'Worked onsite at a client office in the USA. Performed various DevOps tasks like creating / upgrading the application setup on AWS cloud.',
    ],
  },
  {
    heading:
      'QA ENGINEER, IN PROJECT DATA LEAK PREVENTION, AT SYMANTEC, FROM SEP-2011 TO NOV-2015',
    summary:
      'Symantec Endpoint Data Loss Prevention seamlessly integrates with Symantec Endpoint Protection, the cloud-managed version of Symantec Endpoint Protection, to provide comprehensive endpoint data security. Symantec Endpoint Data Loss Prevention lets you identify sensitive information on endpoints in your organization and enables you to monitor and regulate the flow of that information. You can monitor data moving off devices, data accessed by applications, and applications based on their reputation.',
    bullets: [
      "Designed and developed end-to-end automation test cases in a modular styled framework, using Python's Unit Test Case module.",
      'Automated legacy and new features and ensured high quality of product is delivered at the end of releases and ensures that all agile ceremonies are executed to reach the Done-Done criteria.',
    ],
  },
]

export const declaration = {
  name: 'NIKHIL KUMAR GUPTA',
  addressLines: ['Harrow HA1 2LT'],
  date: '27-Mar-2026',
}

export const employmentHistory: SectionTableData = {
  title: 'EMPLOYMENT HISTORY',
  columns: ['ORGANIZATION', 'TITLE', 'START', 'END'],
  columnWidths: ['3fr', '4fr', '1fr', '1fr'],
  rows: [
    ['Motorola Solutions', 'Test Engineer Automation', 'Jan-2025', 'Till now'],
    ['Eurostop Ltd, UK', 'Test Engineer (Automation)', 'Sep-2023', 'Oct-2024'],
    ['Imagination Technologies, UK', 'Sr. Software Engineer I', 'Jun-2022', 'July-2023'],
    ['CrowdStrike, Pune', 'Engineer II', 'Jul-2020', 'Jun-2022'],
    ['Druva Data Solutions, Pune', 'Software Developer Engineer in Test', 'Sep-2017', 'Jul-2020'],
    ['Persistent Systems, Pune', 'Module Lead', 'Nov-2015', 'Sep-2017'],
    ['Symantec Software, Pune', 'Software Quality Assurance Engineer', 'Sep-2011', 'Nov-2015'],
  ],
}

export const domainExperience: SectionTableData = {
  title: 'DOMAIN EXPERIENCE',
  columns: ['BUSINESS DOMAIN', 'CLIENT', 'START', 'END'],
  columnWidths: ['3fr', '3.5fr', '1fr', '1fr'],
  rows: [
    ['Video Security', 'Motorola Solutions', '2025', 'Till now'],
    ['EPOS (Retail)', 'Eurostop Ltd, UK', '2023', '2024'],
    ['AI', 'Imagination Technologies, UK', '2022', '2023'],
    ['Endpoint protection', 'CrowdStrike, India', '2020', '2022'],
    ['Storage, Backup & Restore', 'Druva, India', '2017', '2020'],
    ['Big Data', 'AutoGrid, India', '2015', '2017'],
    ['Information Security', 'Symantec, India', '2011', '2015'],
  ],
}

export const globalExposure: SectionTableData = {
  title: 'GLOBAL EXPOSURE',
  columns: ['ROLE', 'CLIENT', 'YEAR'],
  columnWidths: ['2.5fr', '3.5fr', '1fr'],
  rows: [
    ['Sr. Software Engineer', 'Imagination Technologies, UK', '2022'],
    ['Technical Module Lead', 'AutoGrid, San Francisco, USA', '2018'],
  ],
}

export const awardsRecognition: SectionTableData = {
  title: 'AWARDS & RECOGNITIONS',
  columns: ['AWARD', 'ISSUED BY', 'YEAR'],
  columnWidths: ['3fr', '3fr', '1fr'],
  rows: [
    ['Hackathon Participation Certificate', 'Druva Data Solutions', '2019'],
    ['Appreciation Certificate', 'Persistent Systems', '2017'],
  ],
}

export const certifications: SectionTableData = {
  title: 'CERTIFICATIONS',
  columns: ['CERTIFICATE', 'ISSUED BY', 'YEAR'],
  columnWidths: ['3fr', '3fr', '1fr'],
  rows: [
    ["Python's Pandas training", 'LinkedIn Learning', '2021'],
    ['Python Certification', 'Hacker Rank', '2020'],
    ['Javascript Essentials ES6', 'Udemy', '2020'],
    ['Learning Kubernetes', 'LinkedIn Learning', '2022'],
  ],
}

export const education: SectionTableData = {
  title: 'EDUCATION',
  columns: ['QUALIFICATION', 'UNIVERSITY', 'YEAR'],
  columnWidths: ['3fr', '3.5fr', '1fr'],
  rows: [
    ['PG Diploma in Advance Computing', 'C-DAC, Pune, India', '2011'],
    ['B. Tech in Computer Science', 'GBTU, Greater Noida, India', '2010'],
  ],
}

export const personalDetails: SectionTableData = {
  title: 'PERSONAL DETAILS',
  columnWidths: ['2fr', '4fr'],
  rows: [
    ['Date of Birth', 'XX-XXX-XXXX'],
    ['Passport', 'XXXXXXXX (India)'],
    ['Marital Status', 'Married'],
    ['Hobbies', 'Swimming, Cycling'],
    ['Languages', 'English, Hindi'],
    ['Visa in Hand', 'UK Skilled worker visa till Jan 2028'],
  ],
}

export const technicalSkills: SkillRow[] = [
  { category: 'Python', text: 'Python 2.7 & Python 3.8. Python Unit Test, Python PyTest, Robot framework, Python Flask, Python CherryPy, Python Selenium Web driver, Django, Pandas etc.' },
  { category: 'JavaScript', text: 'NodeJS, ExpressJS, ReactJS, TypeScript, Cypress' },
  { category: 'Mobile test automation', text: 'Appium (iOS/Android), XCUITest, Robot Framework, WebDriverAgent (WDA), device farm setup, pytest-xdist' },
  { category: 'Virtualization', text: 'Administration of VMWare, Vsphere, Hyper' },
  { category: 'DevOps', text: 'Kubernetes, Docker, Ansible 2.4, Jenkins, Terraform, Kibana, Curl, Kafka, Jenkins, Logstash, Putty, Windows Power shell, Windows Batch file scripting, Unix Shell file scripting, Groovy' },
  { category: 'Cloud Services', text: 'AWS EC2, AWS RDS, AWS-S3, AWS Lambda, Google Cloud' },
  { category: 'Messaging Servers', text: 'Rabbit MQ, Apache Kafka' },
  { category: 'Operating Systems', text: 'Windows, Linux, MacOS' },
  { category: 'Databases', text: 'MySQL, Oracle, Hbase, Redis, MongoDB, MS SQL' },
  { category: 'Development IDE', text: 'PyCharm, Eclipse, VS Code, Cursor' },
  { category: 'AI & LLM', text: 'Cursor (AI IDE), Anthropic Claude models, Google Gemini API, MCP servers (Model Context Protocol)' },
  { category: 'Testing Tools', text: 'Selenium, Playwright, JMeter, SOAP-UI, Postman, Allure' },
  { category: 'Source Control', text: 'GitHub, Gitlab, Perforce, TMS' },
  { category: 'Devices', text: 'EPOS Tills, Barcode Scanners, Zebra devices, Clover, NMI, Adyen, Elavon payment devices.' },
  { category: 'Other Tools', text: 'JIRA(REST API), Confluence, Remedy, HP Quality Center, E-Track, VersionOne, WireShark, WinDBG' },
]
