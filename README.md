# SamNursury Frontend

## Frontend

This is the frontend of the Project Name. It is built using React, TypeScript, Redux, Shadcn, and TailwindCSS.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [State Management](#state-management)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-frontend-repository.git
   cd your-frontend-repository

## Folder Structure

├── src
│   ├── assets
│   │   └── img
│   ├── components
│   │   ├── Pages
│   │   │   ├── AboutUs.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── CheckOut.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── HomeCategoryProducts.tsx
│   │   │   ├── ProductDetails.tsx
│   │   │   ├── ProductManagement.tsx
│   │   │   └── Tree.tsx
│   │   ├── UI
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   ├── hooks
│   ├── redux
│   │   ├── api
│   │   ├── slice
│   ├── utils
│   ├── App.tsx
│   ├── index.tsx
│   └── routes.tsx
├── public
│   ├── index.html
│   └── ...
├── package.json
└── tailwind.config.js


## State Management
The state management is handled using Redux. The redux folder contains all the slices and the API integration using RTK Query.

## Styling
The project uses TailwindCSS,Shadcn for styling. Custom components are styled using utility classes.
