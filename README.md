# EduBora Frontend (JavaScript + Next.js)

## Overview

EduBora is a role-based, multi-tenant school management system designed for both local and cloud use. This frontend, built with JavaScript and Next.js App Router, enables administrators, teachers, students, parents, and other stakeholders to access tailored dashboards and features. The interface is intuitive, responsive, and adaptable to various devices, with support for offline-first design through future PWA enhancements.

## Project Structure

The frontend is structured for scalability and clarity:

```
/app
  /auth/login/        - Login pages and logic per role
  /dashboard/[role]/  - Role-based dashboard pages

/components/
  /ui/                - Shared UI components (Button, Input, Label, etc.)
  /hooks/             - Custom hooks such as use-toast and use-auth

/public/              - Static files like images and logos
/styles/              - Tailwind CSS and custom stylesheets
```

## Key Features

* Multi-tenant support per school instance
* Role-based access and routing (admin, teacher, student, etc.)
* Admin login using school code and password
* Staff login using employee ID (e.g., TSC number or phone + password)
* Student login using admission number and password
* Clean and modular design with Tailwind CSS
* Fully client-rendered pages using the Next.js App Router (`use client`)
* Session management via localStorage
* Toast notifications for feedback (success, error)
* Demo login functionality for development testing

## Technologies Used

* Next.js 14+ (App Router)
* JavaScript (ES6+)
* Tailwind CSS
* Lucide Icons
* Custom hooks and reusable components

## Getting Started

### Prerequisites

* Node.js 18 or higher
* NPM or Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/cobrianz/edubora.git
   cd edubora
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local`:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   NEXT_PUBLIC_APP_NAME=EduBora
   ```

4. Run development server:

   ```bash
   npm run dev
   ```

### Build for Production

```bash
npm run build
npm start
```

## Authentication Flow

* Admins sign in using a unique school code and password
* Other users authenticate using role-specific identifiers:

  * Teachers: TSC Number + Phone + Password
  * Students: Admission Number + Password
* Credentials are verified against the Django backend (REST API)
* On successful login, user session is stored in localStorage and redirected to `/dashboard/[role]`

## Demo Mode

A demo login system is built-in for testing each role without backend integration. Demo credentials autofill on click. This is helpful for UI preview and development without backend setup.

## API Integration

All API calls are made via the base URL defined in `.env.local`. Authentication tokens and school identifiers (tenant info) are included in each request header. Axios or native fetch can be used for requests.

## Deployment

The application is deployable on Vercel, Netlify, or any Node.js-compatible hosting service. For best results:

* Set environment variables securely in your hosting platform
* Use `npm run build` for optimized builds

## Future Enhancements

* Full offline-first PWA support for schools in remote areas
* Push notifications and messaging module
* Role-specific dashboards for counselors, doctors, and dorm managers
* File uploads and student portfolio modules

## License

MIT or organizational proprietary license. Modify accordingly.

## Maintainers

EduBora Dev Team

---

This README provides a comprehensive guide for developers to understand, configure, and extend the EduBora frontend built using JavaScript and Next.js.
