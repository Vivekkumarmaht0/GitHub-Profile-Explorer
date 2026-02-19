const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const profileContainer = document.getElementById("profile-container");
const errorContainer = document.getElementById("error-container");
const avatar = document.getElementById("avatar");
const nameElement = document.getElementById("name");
const usernameElement = document.getElementById("username");
const bioElement = document.getElementById("bio");
const locationElement = document.getElementById("location");
const joinedDateElement = document.getElementById("joined-date");
const email = document.getElementById("email");
const profileLink = document.getElementById("profile-link");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const reposCount = document.getElementById("repositories");

const companyElement = document.getElementById("company");
const blogElement = document.getElementById("blog");
const twitterElement = document.getElementById("twitter");
const companyContainer = document.getElementById("company-container");
const blogContainer = document.getElementById("blog-container");
const twitterContainer = document.getElementById("twitter-container");
const reposContainer = document.getElementById("repos-container");

window.addEventListener("load", () => {
  const savedUsername = localStorage.getItem("lastUsername");

  // Only load if user has actually searched before
  if (savedUsername) {
    searchInput.value = savedUsername;
    searchUser();
  } else {
    // Hide profile on first visit
    profileContainer.classList.add("hidden");
    errorContainer.classList.add("hidden");
  }
});


searchBtn.addEventListener("click", searchUser);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchUser();
});


async function searchUser() {
  const username = searchInput.value.trim();
  if (!username) return alert("Please enter a username");

  try {
    profileContainer.classList.add("hidden");
    errorContainer.classList.add("hidden");

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        "Accept": "application/vnd.github+json", 
        "User-Agent": "GitHub-Profile-Explorer"
      }
    });

    if (response.status === 403) {
      throw new Error("API rate limit exceeded. Try again later.");
    }

    if (!response.ok) throw new Error("User not found");

    const userData = await response.json();

    // save the users search
    localStorage.setItem("lastUsername", username);

    displayUserData(userData);
    fetchRepositories(userData.repos_url);

  } catch (error) {
    errorContainer.textContent = error.message;
    showError();
  }
}


async function fetchRepositories(reposUrl) {
  reposContainer.innerHTML =
    '<div class="loading-repos">Loading repositories...</div>';

  try {
    const response = await fetch(reposUrl + "?per_page=6&sort=updated", {
      headers: {
        "Accept": "application/vnd.github+json", 
        "User-Agent": "GitHub-Profile-Explorer",
      },
    });

    const repos = await response.json();
    displayRepos(repos);
  } catch (error) {
    reposContainer.innerHTML = `<div class="no-repos">Failed to load repositories</div>`;
  }
}

let timeout;

function handleSearch() {
  clearTimeout(timeout);
  timeout = setTimeout(searchUser, 500); 
}


function displayRepos(repos) {
  if (!repos || repos.length === 0) {
    reposContainer.innerHTML =
      '<div class="no-repos">No repositories found</div>';
    return;
  }

  reposContainer.innerHTML = "";

  repos.forEach((repo) => {
    const repoCard = document.createElement("div");
    repoCard.className = "repo-card";

    const updatedAt = formatDate(repo.updated_at);

    repoCard.innerHTML = `
      <a href="${repo.html_url}" target="_blank" class="repo-name">
        <i class="fas fa-code-branch"></i> ${repo.name}
      </a>
      <p class="repo-description">
        ${repo.description || "No description available"}
      </p>
      <div class="repo-meta">
        ${
          repo.language
            ? `
          <div class="repo-meta-item">
            <i class="fas fa-circle"></i> ${repo.language}
          </div>`
            : ""
        }
        <div class="repo-meta-item">
          <i class="fas fa-star"></i> ${repo.stargazers_count}
        </div>
        <div class="repo-meta-item">
          <i class="fas fa-code-fork"></i> ${repo.forks_count}
        </div>
        <div class="repo-meta-item">
          <i class="fas fa-history"></i> ${updatedAt}
        </div>
      </div>
    `;

    reposContainer.appendChild(repoCard);
  });
}

function displayUserData(user) {
  avatar.src = user.avatar_url;
  nameElement.textContent = user.name || user.login;
  usernameElement.textContent = `@${user.login}`;
  bioElement.textContent = user.bio || "No bio available";

  locationElement.textContent = user.location || "Not specified";
  joinedDateElement.textContent = formatDate(user.created_at);

  email.textContent = user.email || "No email";

  profileLink.href = user.html_url;
  followers.textContent = user.followers;
  following.textContent = user.following;

  reposCount.textContent = user.public_repos;

  companyElement.textContent = user.company || "Not specified";

  if (user.blog) {
    blogElement.textContent = user.blog;
    blogElement.href = user.blog.startsWith("http")
      ? user.blog
      : `https://${user.blog}`;
  } else {
    blogElement.textContent = "No website";
    blogElement.href = "#";
  }

  if (user.twitter_username) {
    twitterElement.textContent = `@${user.twitter_username}`;
    twitterElement.href = `https://twitter.com/${user.twitter_username}`;
  } else {
    twitterElement.textContent = "No Twitter";
    twitterElement.href = "#";
  }

  // Show profile after data loads
  profileContainer.classList.remove("hidden");
}

function showError() {
  errorContainer.classList.remove("hidden");
  profileContainer.classList.add("hidden"); 
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Default search
// searchInput.value = "Vivekkumarmaht0";
// searchUser();


// switch-mode
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Load saved theme
if (localStorage.getItem('lightmode') === 'active') {
  body.classList.add('lightmode');
}

themeSwitch.addEventListener("click", () => {
  body.classList.toggle('lightmode');

  if (body.classList.contains('lightmode')) {
    localStorage.setItem('lightmode', 'active');
  } else {
    localStorage.removeItem('lightmode');
  }
});

// Clear saved search 
function clearSearch() {
  localStorage.removeItem("lastUsername");
  searchInput.value = "";
  profileContainer.classList.add("hidden");
  errorContainer.classList.add("hidden");
  reposContainer.innerHTML = "";
}

