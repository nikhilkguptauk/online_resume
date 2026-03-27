export const heroData = {
  name: 'Nikhil K Gupta',
  title: 'Senior Automation Engineer',
  phone: '+44-7979 965 209',
  email: 'nikhilgupta.myid@gmail.com',
  linkedInDisplay: 'www.linkedin.com/in/nikhilkgupta84',
  linkedInUrl: 'https://www.linkedin.com/in/nikhilkgupta84',
  location: 'London, UK',
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
  '**Adept in bringing forth expertise in design, installation, testing and maintenance of software systems.**',
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
