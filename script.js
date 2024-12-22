let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}


// Dark-Mode Toggle Code

const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeIcon = document.getElementById('dark-mode-icon');

darkModeToggle.onclick = () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    darkModeIcon.src = 'assets/day-mode.png'; // Sun icon for light mode
    darkModeIcon.alt = 'Sun Icon';
  } else {
    darkModeIcon.src = 'assets/night-mode.png'; // Moon icon for dark mode
    darkModeIcon.alt = 'Moon Icon';
  }
}




// Multiple-Text Animation
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,
});


//  Fetch Github Repos through API for Portfolio
document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("portfolio-container");

    const getMyGitHubData = async () => {
        const response = await fetch('https://api.github.com/users/ManjilKarmacharya7');
        const data = await response.json();
        return data;
    }

    const getMyGitHubRepos = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const displayGitHub = async () => {
        try {
            const data = await getMyGitHubData();
            const reposData = await getMyGitHubRepos(data.repos_url);

            reposData.forEach((repo) => {
                // Create portfolio box
                const portfolioBox = document.createElement("div");
                portfolioBox.className = "portfolio-box";

                // Image element
                const img = document.createElement("img");
                img.src = "assets/portfolio.png"; // Placeholder image
                img.alt = `Image for ${repo.name}`;
                portfolioBox.appendChild(img);

                // Portfolio layer
                const portfolioLayer = document.createElement("div");
                portfolioLayer.className = "portfolio-layer";

                // Heading
                const h4 = document.createElement("h4");
                h4.textContent = repo.name; // Repository name
                portfolioLayer.appendChild(h4);

                // Description
                const p = document.createElement("p");
                p.textContent = repo.description || "No description available."; // Repository description
                portfolioLayer.appendChild(p);

                // Link
                const a = document.createElement("a");
                a.href = repo.html_url; // Repository link
                a.target = "_blank";
                const i = document.createElement("i");
                i.className = "bx bx-link-external";
                a.appendChild(i);
                portfolioLayer.appendChild(a);

                portfolioBox.appendChild(portfolioLayer);
                container.appendChild(portfolioBox);
            });
        } catch (error) {
            console.error("Error fetching GitHub data:", error);
        }
    }

    // Call the function to display GitHub data
    displayGitHub();
});