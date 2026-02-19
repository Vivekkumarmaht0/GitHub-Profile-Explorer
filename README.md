# GitHub Profile Explorer

## 📋 Project Overview

**GitHub Profile Explorer** is a lightweight web application that allows users to search for and explore GitHub user profiles. Enter any GitHub username to instantly retrieve comprehensive profile information along with the user's most recent repositories.

The application provides a clean, intuitive interface to discover detailed information about GitHub developers, including their bio, location, follower/following counts, repositories, and social media links.

---

## ✨ Key Features

### 1. **User Profile Search**
   - Search functionality for GitHub usernames
   - Support for both button click and Enter key submission
   - Input validation to ensure username is provided
   - Clear button to reset search and stored data

### 2. **Comprehensive Profile Display**
   - User avatar
   - Full name and GitHub username
   - User bio/biography
   - Location information
   - Account creation date (join date)
   - Email address (if public)
   - Followers count
   - Following count
   - Public repositories count

### 3. **Additional Information**
   - Company affiliation
   - Blog/website link
   - Twitter/X handle with direct link
   - Direct link to GitHub profile

### 4. **Repository Showcase**
   - Displays up to 6 latest repositories (sorted by update date)
   - For each repository shows:
     - Repository name with link
     - Description
     - Programming language used
     - Star count (stargazers)
     - Fork count
     - Last update date

### 5. **Error Handling**
   - User not found error messages
   - API rate limit notifications
   - Network error handling
   - Graceful fallbacks for missing data
Light/Dark Theme Toggle**
   - Easy switch between light and dark modes
   - Theme preference saved to localStorage
   - Persistent theme across sessions
   - Accessible theme button in navbar
   - Smooth transitions between themes

### 7. **Local Storage**
   - Remembers last searched username
   - Auto-loads last search on page reload
   - Saves user's theme preference

---

## 🏗️ Project Structure

```
GitHub-Profile-Explorer/
├── app.html                    # Main HTML file
├── README.md                   # Project documentation
├── images/                     # Image assets
├── scripts/
│   └── app.js                  # Main JavaScript logic
└── styles/
    └── app.css                 # Styling and layouts
```

### File Descriptions

#### **app.html**
- Semantic HTML structure
- Font Awesome icons (v7.0.1) via CDN
- Navigation bar with theme toggle button
- Hero section with project title
- Search input with search button and clear button
- Dynamic profile container (hidden until user searched)
- Additional info section (company, blog, twitter)
- Repository grid section with dynamic content
- Error container for error messages

#### **scripts/app.js**
- Handles user search functionprofile information
- Manages repository data retrieval (6 latest repos, sorted by update date)
- Implements date formatting utility
- Error handling (user not found, rate limit exceeded)
- Theme toggle functionality with localStorage persistence
- Clear search functionality
- Auto-load last searched username on page load
- CSS custom properties (variables) for theming
- Dark theme design (background color: #18151F)
- Light theme support with class-based switching
- Navbar with theme toggle button
- Gradient button styling
- Responsive layout for profile display
- Card-based design for repositories
- Dark theme design (background color: #18151F)
- Gradient button styling
- Responsive grid layout for profile display
- Card-based design for repositories
- Color variables for consistent theming
- Flexbox and CSS Grid layouts
- Smooth transitions and hover effects

---

## 🛠️ Technologies Used

### Frontend
| Technology | Purpose |
|-----------|---------|
| **HTML5** | Markup structure and semantic elements |
| **CSS3** | Styling, layout (Grid/Flexbox), animations |
| **Vanilla JavaScript** | DOM manipulation, API calls, event handling |
| **Font Awesome 7** | Icons for UI elements |

### APIs & Services
| Service | Purpose |
|---------|---------|
| **GitHub REST API** | Fetches user profile data and repository information |
| **GitHub API Authentication** | Personal Access Token for increased rate limits |

---

## 🔄 How It Works

### User Search Flow

1. **User Input**: User enters a GitHub username in the search field
2. **Search Trigger**: Click search button or press Enter key
3. **API Request**: JavaScript makes authenticated fetch request to GitHub API
4. **Data Processing**: User data is validated and extracted
5. **Profile Display**: Profile information is dynamically rendered to DOM
6. **Repository Fetch**: Secondary request fetches user's latest repositories
7. **Repository Display**: Repository cards aritories, etc.

GET /users/{username}/repos?per_page=6&sort=updated
- Fetches latest 6 repositories sorted by most recently updated
- Returns: repository details, language, stars, forks, etc.
```

### Error Handling
- Gracefully handles "User not found" responses (404)
- Detects API rate limit exceeded errors (403)
- Displays user-friendly error messages etc.
```

### Authentication
- Uses GitHub Personal Access Token
- Token is included in request headers
- Provides higher API rate limit (5000 requests/hour vs 60)
- **Token Details**: Expires on October 31, 2026

**Dark Mode:**
```
--bg-dark: #18151F          (Dark background)
--navbar-bg: #302f3e        (Navbar background)
--btn-linear: gradient      (Purple gradient buttons)
--text-light: #f3f4f6       (Light text)
--text-gray: #9ca3af        (Gray secondary text)
--card-bg: gradient         (Card background)
--repo-bg: #F2F2F2          (Repository background)
```

**Light Mode:**
```
--bg-dark: #D1D5DB          (Light gray background)
--navbar-bg: #FFFFFF        (White navbar)
--btn-linear: gradient      (Blue gradient buttons)
--text-light: #1F2937       (Dark text)
--text-gray: #6B7280        (Medium gray text)
--card-bg: gradient         (Light gradient background)
--repo-bg: #F9FAFB          (Very light
--bg-dark: #18151F          (Dark background)
--btn-linear: gradient      (Purple gradient buttons)
--text-light: #f3f4f6       (Light text)
--text-gray: #9ca3af        (Gray secondary text)
--card-bg: gradient         (Card background)
--repo-bg: #F2F2F2          (Repository background)
```

### Layout Structure
- **Navbar**: Theme toggle button and title
- **Hero Section**: Main title and search bar with clear button
- **Profile Container**: 
  - Profile header with avatar and basic info
  - Stats section (followers, following, repositories)
  - Additional info (company, blog, twitter)
  - Repository section with grid of repo cards
- **Error Container**: Displays error messages when applicable

### Responsive Design
- Centered content layout
- Flexible width design
- Mobile-friendly with proper spacing
- Grid-based repository display
- Accessible navigation and form elements

---

## 📊 Key JavaScript Functions

### `searchUser()`
- Validates username input
- Fetches user data from GitHub API
- Handles errors (user not found, rate limit exceeded)
- Saves username to localStorage
- Calls `displayUserData()` on success
- Initiates repository fetch

### `fetchRepositories(reposUrl)`
- Makes API request to repositories endpoint
- Fetches 6 latest repositories sorted by update date
- Calls `displayRepos()` with fetched data
- Handles fetch errors gracefully

### `displayUserData(user)`
- Populates all profile fields in the DOM
- Handles optional/missing data fields with fallbacks
- Shows profile container once data is loaded
- Formats dates for display

### `displayRepos(repos)`
- Creates repository cards dynamically
- Displays language, stars, forks, and last update date
- Links to GitHub repository URLs
- Shows appropriate message for empty repository lists

### `formatDate(dateString)`
- Converts ISO date format to readable format
- Returns format: "Mon DD, YYYY"
- Uses browser localization

### `clearSearch()`
- Removes saved username from localStorage
- Clears search input field
- Hides profile and error containers
- Resets repository display

---

- Theme preference is automatically loaded from localStorage
The application features intelligent auto-loading:
- On page load, it automatically searches for the previously searched username (stored in localStorage)
- If no previous search exists, the page loads ready for user input
- Users can search for any GitHub username at any time
- Last search is preserved across browser sessions

---

## 🔒 Security Considerations

1. **Token Exposure**: GitHub token is in client-side code (development only)
2. **GitHub API**: Uses public GitHub API endpoints (no sensitive data exposed)
2. **Input Validation**: Validates username input before API calls
3. **Safe DOM Updates**: Using `textContent` to prevent XSS vulnerabilities
4. **CORS**: Leverages GitHub API's CORS support for client-side requests
5. **No Sensitive Data**: Application doesn't store or transmit sensitive information
## 🐛 Error Handling

The application handles:
- ❌ User not found (404 errors)
- ❌ API rate limit exceeded (403 errors)
- ❌ Network failures
- ❌ Empty or invalid usernames
- ❌ Missing optional profile fields

---


- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6 JavaScript support
- Uses Fetch API (available in modern browsers)
- Font Awesome CDN requirement

---

## 🎯 Potential Enhancements

- [ ] Add pagination for repositories
- [ ] Filter repositories by language
- [ ] Add repository search/filter
- [ ] User comparison feature
- [ ] Save favorite users
- [ ] Repository search/filter functionality
- [ ] User profile comparison feature
- [ ] Save favorite profiles
- [ ] Advanced search filters (followers, repos count, etc.)
- [ ] Repository analytics and statistics
- [ ] Trending developers/repositories discovery
- [ ] GitHub OAuth authentication for higher rate limits
- [ ] Progressive Web App (PWA) features
GitHub Profile Explorer is a well-structured, functional web application that demonstrates:
- Clean separation of concerns (HTML, CSS, JavaScript)
- Effective use of GitHub's public API
- Modern web development practices
- User-friendly interface desfunctional web application that demonstrates:
- Clean separation of concerns (HTML, CSS, JavaScript)
- Effective use of GitHub's public REST API
- Modern web development practices with vanilla JavaScript
- User-friendly interface with light/dark theme support
- Comprehensive error handling and data validation
- Local storage for seamless user experience

It serves as an excellent tool for discovering information about GitHub developers and their projects in an elegant interface.