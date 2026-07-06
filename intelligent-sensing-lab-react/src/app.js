import React, { useMemo, useState } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";

const A = "./assets/images/";

const researchGroups = [
  {
    division: "Optical Sensing",
    summary: "Advanced imaging, LiDAR, and nanophotonic sensing systems.",
    groups: [
      { name: "Hyperspectral Imaging Group", image: "hyperspectral.png", openings: 4, stipend: "18,000" },
      { name: "LiDAR Development Team", image: "lidar.png", openings: 3, stipend: "16,500" },
      { name: "Nanophotonics Research", image: "nanophotonics.png", openings: 2, stipend: "17,500" },
    ],
  },
  {
    division: "Bio-Sensing",
    summary: "Medical diagnostics, environmental monitoring, and wearable sensors.",
    groups: [
      { name: "Medical Diagnostics Group", image: "medical.png", openings: 5, stipend: "17,000" },
      { name: "Environmental Sensors Team", image: "environmental.png", openings: 3, stipend: "15,500" },
      { name: "Wearable Technology Lab", image: "wearable.png", openings: 4, stipend: "16,000" },
    ],
  },
  {
    division: "Smart Sensing",
    summary: "AI-enabled sensor networks for intelligent, real-time decisions.",
    groups: [
      { name: "IoT Sensor Networks", image: "iot.png", openings: 6, stipend: "16,000" },
      { name: "AI-Enabled Sensing", image: "ai.png", openings: 4, stipend: "17,500" },
    ],
  },
];

const stats = [
  ["45+", "Research Projects"],
  ["85+", "Patents Filed"],
  ["120+", "Researchers"],
  ["15", "Spin-offs"],
  ["40+", "International Collaborations"],
];

const contacts = [
  ["Main Laboratory", "Tat Chee Avenue, Kowloon, Hong Kong SAR", "(852) 9876 5432", "info@intelligentsensinglab.edu.hk"],
  ["Research Partnerships", "Tat Chee Avenue, Kowloon, Hong Kong SAR", "(852) 9876 5433", "partnerships@intelligentsensinglab.edu.hk"],
  ["Internship Program", "Tat Chee Avenue, Kowloon, Hong Kong SAR", "(852) 9876 5434", "internships@intelligentsensinglab.edu.hk"],
];

function App() {
  const [active, setActive] = useState("home");
  const [selectedDivision, setSelectedDivision] = useState(researchGroups[0].division);
  const [choices, setChoices] = useState({});
  const [message, setMessage] = useState("");
  const [visitMessage, setVisitMessage] = useState("");

  const flatGroups = useMemo(
    () => researchGroups.flatMap((division) => division.groups.map((group) => ({ ...group, division: division.division }))),
    []
  );

  const chosenRows = Array.from({ length: 5 }, (_, index) => {
    const rank = index + 1;
    return { rank, item: choices[rank] };
  });

  function chooseGroup(group, rank) {
    const parsedRank = Number(rank);
    if (!Number.isInteger(parsedRank) || parsedRank < 1 || parsedRank > 5) {
      setMessage("Please choose a rank between 1 and 5.");
      return;
    }

    const duplicate = Object.entries(choices).find(([, value]) => value.name === group.name);
    if (duplicate) {
      setMessage(`${group.name} has already been selected.`);
      return;
    }

    setChoices((current) => ({ ...current, [parsedRank]: group }));
    setMessage(`${group.name} added as choice ${parsedRank}.`);
  }

  function submitApplication() {
    const ranks = Object.keys(choices).map(Number).sort((a, b) => a - b);
    if (!ranks.length) {
      setMessage("Please select at least one research group before submitting.");
      return;
    }

    const missing = [];
    for (let rank = 1; rank <= Math.max(...ranks); rank += 1) {
      if (!ranks.includes(rank)) missing.push(rank);
    }

    if (missing.length) {
      setMessage(`Please fill rank ${missing.join(", ")} before submitting. Rankings cannot have gaps.`);
      return;
    }

    setMessage(`Application submitted successfully at ${new Date().toLocaleString()}.`);
  }

  function checkVisit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const date = form.get("date");
    const visitors = Number(form.get("visitors"));
    if (!date || !visitors || visitors < 1) {
      setVisitMessage("Please enter a valid date and number of visitors.");
      return;
    }
    setVisitMessage(visitors <= 20 ? "Tour slot available. Your visit request is ready." : "This tour is full. Please reduce the group size or select another time.");
  }

  return (
    React.createElement("div", null,
      React.createElement(Header, { active, setActive }),
      React.createElement("main", null,
        active === "home" && React.createElement(Home, { setActive }),
        active === "about" && React.createElement(About),
        active === "apply" && React.createElement(Apply, {
          selectedDivision,
          setSelectedDivision,
          flatGroups,
          choices,
          chosenRows,
          chooseGroup,
          submitApplication,
          clearChoices: () => {
            setChoices({});
            setMessage("Selections cleared.");
          },
          message,
        }),
        active === "visit" && React.createElement(Visit, { checkVisit, visitMessage }),
        active === "information" && React.createElement(Information),
        active === "contact" && React.createElement(Contact),
        active === "design" && React.createElement(Design)
      ),
      React.createElement(Footer, { setActive })
    )
  );
}

function Header({ active, setActive }) {
  const nav = [
    ["home", "Home"],
    ["about", "About"],
    ["apply", "Apply"],
    ["visit", "Visit"],
    ["information", "Information"],
    ["contact", "Contact"],
  ];

  return React.createElement("header", { className: "site-header" },
    React.createElement("a", { className: "brand", href: "#home", onClick: () => setActive("home") },
      React.createElement("img", { src: `${A}logo.png`, alt: "Intelligent Sensing Lab logo" }),
      React.createElement("span", null, "Intelligent Sensing Lab")
    ),
    React.createElement("nav", { "aria-label": "Primary navigation" },
      nav.map(([id, label]) => React.createElement("button", {
        key: id,
        className: active === id ? "active" : "",
        onClick: () => setActive(id),
      }, label))
    )
  );
}

function Home({ setActive }) {
  return React.createElement("section", { className: "hero" },
    React.createElement("div", { className: "hero-copy" },
      React.createElement("p", { className: "eyebrow" }, "React portfolio edition"),
      React.createElement("h1", null, "Intelligent sensing for healthcare, cities, and industry."),
      React.createElement("p", null, "A modern React rebuild of the coursework website, turning the original multi-page HTML project into an interactive single-page experience."),
      React.createElement("div", { className: "actions" },
        React.createElement("button", { className: "primary", onClick: () => setActive("apply") }, "Explore internships"),
        React.createElement("button", { className: "secondary", onClick: () => setActive("about") }, "View lab highlights")
      )
    ),
    React.createElement("div", { className: "hero-panel" },
      React.createElement("img", { src: `${A}about.png`, alt: "Sensor research laboratory" }),
      React.createElement("div", { className: "metrics" },
        stats.slice(0, 3).map(([value, label]) => React.createElement("div", { key: label },
          React.createElement("strong", null, value),
          React.createElement("span", null, label)
        ))
      )
    )
  );
}

function About() {
  return React.createElement("section", { className: "section" },
    React.createElement("div", { className: "section-heading" },
      React.createElement("p", { className: "eyebrow" }, "About"),
      React.createElement("h2", null, "A research lab built around applied sensing systems."),
      React.createElement("p", null, "Founded in 2018, the lab develops intelligent sensing solutions for healthcare, environmental monitoring, industrial automation, and urban infrastructure.")
    ),
    React.createElement("div", { className: "stat-grid" },
      stats.map(([value, label]) => React.createElement("article", { key: label, className: "stat-card" },
        React.createElement("strong", null, value),
        React.createElement("span", null, label)
      ))
    ),
    React.createElement("div", { className: "feature-grid" },
      ["Optical Sensing Lab", "Bio-Integration Lab", "AI Sensor Fusion Lab"].map((title) => React.createElement("article", { key: title },
        React.createElement("h3", null, title),
        React.createElement("p", null, title === "Optical Sensing Lab" ? "Develops hyperspectral imaging and LiDAR platforms." : title === "Bio-Integration Lab" ? "Creates implantable, wearable, and diagnostic sensors." : "Builds intelligent networks that combine sensor data with AI models.")
      ))
    )
  );
}

function Apply({ selectedDivision, setSelectedDivision, flatGroups, chosenRows, chooseGroup, submitApplication, clearChoices, message }) {
  const division = researchGroups.find((item) => item.division === selectedDivision);
  const selectedCount = chosenRows.filter((row) => row.item).length;

  return React.createElement("section", { className: "section split" },
    React.createElement("div", null,
      React.createElement("div", { className: "section-heading compact" },
        React.createElement("p", { className: "eyebrow" }, "Apply"),
        React.createElement("h2", null, "Choose research groups and rank your internship preferences."),
        React.createElement("p", null, "The original JavaScript ranking table has been rebuilt with React state, validation, and clearer feedback.")
      ),
      React.createElement("div", { className: "tabs" },
        researchGroups.map((item) => React.createElement("button", {
          key: item.division,
          className: selectedDivision === item.division ? "active" : "",
          onClick: () => setSelectedDivision(item.division),
        }, item.division))
      ),
      React.createElement("div", { className: "group-grid" },
        division.groups.map((group) => React.createElement(GroupCard, {
          key: group.name,
          group: { ...group, division: division.division },
          onChoose: chooseGroup,
        }))
      )
    ),
    React.createElement("aside", { className: "selection-panel" },
      React.createElement("h3", null, "Current choices"),
      React.createElement("p", null, `${selectedCount} of 5 ranks selected`),
      React.createElement("div", { className: "choice-list" },
        chosenRows.map(({ rank, item }) => React.createElement("div", { key: rank, className: "choice-row" },
          React.createElement("span", null, rank),
          React.createElement("div", null,
            React.createElement("strong", null, item ? item.name : "Not selected"),
            React.createElement("small", null, item ? item.division : "Choose a group from the left")
          )
        ))
      ),
      React.createElement("div", { className: "actions vertical" },
        React.createElement("button", { className: "primary", onClick: submitApplication }, "Submit application"),
        React.createElement("button", { className: "secondary", onClick: clearChoices }, "Clear choices")
      ),
      message && React.createElement("p", { className: "notice" }, message),
      React.createElement("h4", null, "All openings"),
      React.createElement("ul", { className: "mini-list" }, flatGroups.map((group) => React.createElement("li", { key: group.name }, `${group.name}: ${group.openings} openings`)))
    )
  );
}

function GroupCard({ group, onChoose }) {
  const [rank, setRank] = useState("");
  return React.createElement("article", { className: "group-card" },
    React.createElement("img", { src: `${A}${group.image}`, alt: group.name }),
    React.createElement("div", null,
      React.createElement("h3", null, group.name),
      React.createElement("p", null, `${group.openings} openings. HKD ${group.stipend}/month stipend.`),
      React.createElement("div", { className: "rank-control" },
        React.createElement("input", {
          type: "number",
          min: "1",
          max: "5",
          value: rank,
          placeholder: "Rank",
          onChange: (event) => setRank(event.target.value),
        }),
        React.createElement("button", { onClick: () => onChoose(group, rank) }, "Add")
      )
    )
  );
}

function Visit({ checkVisit, visitMessage }) {
  return React.createElement("section", { className: "section split visit" },
    React.createElement("div", null,
      React.createElement("div", { className: "section-heading compact" },
        React.createElement("p", { className: "eyebrow" }, "Visit"),
        React.createElement("h2", null, "Plan a lab tour and see sensor systems in action."),
        React.createElement("p", null, "Visitors can explore cleanroom fabrication, environmental chambers, calibration labs, and prototype workshops.")
      ),
      React.createElement("img", { className: "map", src: `${A}location.png`, alt: "Lab location map" })
    ),
    React.createElement("form", { className: "booking-card", onSubmit: checkVisit },
      React.createElement("h3", null, "Open day registration"),
      React.createElement("label", null, "Date", React.createElement("input", { name: "date", type: "date" })),
      React.createElement("label", null, "Time", React.createElement("select", { name: "time", defaultValue: "09:00-11:00" },
        ["09:00-11:00", "11:00-13:00", "13:00-15:00", "15:00-17:00"].map((slot) => React.createElement("option", { key: slot, value: slot }, slot))
      )),
      React.createElement("label", null, "Number of visitors", React.createElement("input", { name: "visitors", type: "number", min: "1", placeholder: "10" })),
      React.createElement("button", { className: "primary", type: "submit" }, "Check availability"),
      visitMessage && React.createElement("p", { className: "notice" }, visitMessage),
      React.createElement("p", { className: "muted" }, "Address: Tat Chee Avenue, Kowloon, Hong Kong SAR")
    )
  );
}

function Information() {
  return React.createElement("section", { className: "section" },
    React.createElement("div", { className: "section-heading" },
      React.createElement("p", { className: "eyebrow" }, "Information"),
      React.createElement("h2", null, "Research openings and stipend overview."),
      React.createElement("p", null, "A clearer table layout makes internship information easier to scan during interviews.")
    ),
    React.createElement("div", { className: "table-wrap" },
      React.createElement("table", null,
        React.createElement("thead", null, React.createElement("tr", null,
          ["Research Division", "Focus Area", "Open Positions", "Stipend"].map((head) => React.createElement("th", { key: head }, head))
        )),
        React.createElement("tbody", null,
          researchGroups.flatMap((division) => division.groups).map((group) => React.createElement("tr", { key: group.name },
            React.createElement("td", null, researchGroups.find((division) => division.groups.includes(group)).division),
            React.createElement("td", null, group.name),
            React.createElement("td", null, group.openings),
            React.createElement("td", null, `HKD ${group.stipend}/month`)
          ))
        )
      )
    )
  );
}

function Contact() {
  return React.createElement("section", { className: "section" },
    React.createElement("div", { className: "section-heading" },
      React.createElement("p", { className: "eyebrow" }, "Contact"),
      React.createElement("h2", null, "Reach the right team quickly."),
      React.createElement("p", null, "Contact details are presented in reusable React data structures instead of repeated table markup.")
    ),
    React.createElement("div", { className: "contact-grid" },
      contacts.map(([department, address, tel, email]) => React.createElement("article", { key: department, className: "contact-card" },
        React.createElement("h3", null, department),
        React.createElement("p", null, address),
        React.createElement("a", { href: `tel:${tel}` }, tel),
        React.createElement("a", { href: `mailto:${email}` }, email)
      ))
    )
  );
}

function Design() {
  return React.createElement("section", { className: "section" },
    React.createElement("div", { className: "section-heading" },
      React.createElement("p", { className: "eyebrow" }, "Implementation"),
      React.createElement("h2", null, "What changed in the React upgrade."),
      React.createElement("p", null, "The original coursework remains in CW1, CW2, and CW3. This version adds a modern React layer for a stronger portfolio presentation.")
    ),
    React.createElement("div", { className: "feature-grid" },
      ["Component-based layout", "Stateful application form", "Responsive visual design", "GitHub Pages deployment"].map((item) => React.createElement("article", { key: item },
        React.createElement("h3", null, item),
        React.createElement("p", null, item === "Component-based layout" ? "Pages, cards, tables, and forms are split into reusable React components." : item === "Stateful application form" ? "Research choices are validated with React state instead of direct DOM mutation." : item === "Responsive visual design" ? "The interface is cleaner on desktop and mobile, with accessible buttons and readable sections." : "The site is served from the same public GitHub Pages URL.")
      ))
    )
  );
}

function Footer({ setActive }) {
  return React.createElement("footer", null,
    React.createElement("img", { src: `${A}footer_logo.png`, alt: "Intelligent Sensing Lab footer logo" }),
    React.createElement("p", null, "React upgrade designed by Zezheng Du. Original coursework iterations are preserved in CW1, CW2, and CW3."),
    React.createElement("button", { onClick: () => setActive("design") }, "View implementation notes")
  );
}

createRoot(document.getElementById("root")).render(React.createElement(App));
