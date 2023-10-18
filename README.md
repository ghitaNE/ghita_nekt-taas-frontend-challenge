# ghita_nekt-taas-frontend-challenge

This is a simple Vue.js application that allows users to authorize their GitHub account, list repositories, and view commit history based on selected repository and branches.

## Features

- Authorize GitHub Account.
- List repositories with filtering.
- View commit history with infinite scroll.
- Switch branches and refresh commit history.

## Technologies Used

- Vue.js with TypeScript
- Tailwind CSS
- GitHub REST API v3·

## CORS Issue and Proxy Server

The application faced a CORS (Cross-Origin Resource Sharing) issue when attempting to fetch data from the GitHub Access Token API. To circumvent this problem, we implemented a small Node.js proxy server. CORS policies in web browsers restrict requests from different domains, and by using the proxy server, we were able to forward API requests from our frontend to the GitHub API on the server-side, ensuring seamless communication while maintaining security standards.

## Project Setup

1. Clone the repository.

### Vue.js Frontend

1. Navigate to the `FrontEnd` directory:
2. Install dependencies using `npm install`.
3. Run the development server using `npm run serve`.

The Vue.js application will be accessible at `http://localhost:5173/`.

### Node.js Proxy Server

1. Navigate to the `Proxy` directory
2. Install dependencies using `npm install`.
3. Start the Node.js proxy server using `npm start`

The proxy server will run at `http://localhost:3000`

## Author

[Ghita Nekt]
