# CineScope

CineScope is a modern, responsive web application for searching and browsing movies and TV series. It's built with Next.js and utilizes the OMDb API to fetch movie data.

![CineScope Screenshot](https://placehold.co/800x600.png)

## Features

- **Movie & Series Search**: Quickly search for any movie or series by title.
- **Advanced Filtering**: Narrow down your search by type (movie or series) and year of release.
- **Detailed Information**: Click on any movie card to view detailed information, including the plot, actors, director, ratings, and more in a clean modal view.
- **Pagination**: Easily navigate through search results with a simple pagination control.
- **Responsive Design**: A beautiful and functional interface that works seamlessly on desktops, tablets, and mobile devices.

## Tech Stack

This project is built with a modern tech stack, including:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [OMDb API](https://www.omdbapi.com/)

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- Node.js (v18 or newer recommended)
- `npm` or `yarn`

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ay690/Applyo_assignment.git
    cd Applyo_assignment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    You'll need an API key from the [OMDb API](https://www.omdbapi.com/apikey.aspx).

    Create a file named `.env.local` in the root of your project and add your API key to it:

    ```
    NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
    ```

    Replace `your_api_key_here` with the key you obtained.

## Available Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts a Next.js production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

# Demo Link

[Link](https://applyo-assignment.vercel.app/)
