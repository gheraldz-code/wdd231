const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// HTML elements
const courseContainer = document.querySelector("#course-container");
const creditTotal = document.querySelector("#credit-total");
const filterButtons = document.querySelectorAll(".filter-button");

// Display courses
function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach(course => {
        const courseCard = document.createElement("article");

        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p class="course-title">${course.title}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p>${course.description}</p>
            <p><strong>Technology:</strong> ${course.technology.join(", ")}</p>
            <p class="course-status">
                ${course.completed ? "✓ Completed" : "In Progress"}
            </p>
        `;

        courseContainer.appendChild(courseCard);
    });

    // Calculate credits for currently displayed courses
    const total = courseList.reduce(
        (sum, course) => sum + course.credits,
        0
    );

    creditTotal.textContent = `Total Credits: ${total}`;
}

// Filter courses
function filterCourses(subject) {
    let filteredCourses;

    if (subject === "ALL") {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(
            course => course.subject === subject
        );
    }

    displayCourses(filteredCourses);

    // Update active button
    filterButtons.forEach(button => {
        const isActive = button.dataset.filter === subject;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", isActive);
    });
}

// Listen for button clicks
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterCourses(button.dataset.filter);
    });
});

// Initial display
filterCourses("ALL");
