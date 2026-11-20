// Santa Cruz Business Directory

import { displayFooter, setupNavigation } 
    from "./modules/common.mjs";

displayFooter();
setupNavigation();

// DOM Elements
const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

// Store member data
let membersData = [];

// Membership levels
const membershipNames = {
    1: "Member",
    2: "Silver",
    3: "Gold"
};

// Fetch member data from JSON
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        membersData = await response.json();

        displayMembers(membersData);

    } catch (error) {
        console.error("Error loading members:", error);

        membersContainer.textContent =
            "Unable to load the business directory. Please try again later.";
    }
}

// Create and display member cards
function displayMembers(members) {
    membersContainer.replaceChildren();

    members.forEach((member) => {
        // Create member card
        const card = document.createElement("article");
        card.classList.add("member-card");

        // Company image
        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} company logo`;
        image.width = 200;
        image.height = 120;
        image.loading = "lazy";

        // Member information
        const information = document.createElement("div");
        information.classList.add("member-info");

        const name = document.createElement("h3");
        name.textContent = member.name;

        const description = document.createElement("p");
        description.textContent = member.description;

        const address = document.createElement("p");
        address.textContent = `Address: ${member.address}`;

        const phone = document.createElement("p");
        phone.textContent = `Phone: ${member.phone}`;

        const membership = document.createElement("span");
        membership.classList.add("membership-level");
        membership.textContent =
            membershipNames[member.membershipLevel] || "Member";

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";

        // Assemble card
        information.append(
            name,
            description,
            address,
            phone,
            membership,
            website
        );

        card.append(image, information);

        membersContainer.appendChild(card);
    });
}

// Grid View
gridButton.addEventListener("click", () => {
    membersContainer.classList.remove("members-list");
    membersContainer.classList.add("members-grid");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});

// List View
listButton.addEventListener("click", () => {
    membersContainer.classList.remove("members-grid");
    membersContainer.classList.add("members-list");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
});

// Initialize directory
getMembers();
