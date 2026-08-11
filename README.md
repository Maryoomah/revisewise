# WriteWise

WriteWise is a modern web application for managing  writing classes, assignments, submissions, and AI-assisted  feedback. The project is being built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Supabase**, with a focus on creating a scalable platform for English language teachers and learners.

The project also serves as the practical component of a broader research interest in AI-assisted formative feedback for second language writing.

---

## Tech Stack


* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* Supabase Authentication
* Supabase Database


---

# Current Features

## Authentication

### User Registration

* Email and password registration
* Full name collection
* Teacher and Student role selection
* Email verification

### Login

* Email/password authentication
* Automatic role detection
* Redirects users to the correct dashboard after login

### Password Recovery

* Forgot Password
* Password reset through email
* Password update page

### Logout

* Secure logout using Supabase Authentication
* Session destroyed before redirecting to login

---

## Authorization

Role-based route protection has been implemented.

### Teacher

Protected routes:

* `/teacher`
* `/teacher/profile`
* Future teacher pages

Only authenticated teachers can access these routes.

### Student

Protected routes:

* `/student`
* Future student pages

Only authenticated students can access these routes.

Unauthenticated users are redirected to the login page.

---

## User Profile

A `profiles` table stores application-specific user information.

Current fields include:

* id
* full_name
* role

Authentication data is managed by Supabase Auth, while application data is stored in the database.

---
## Teacher Module

### Teacher Dashboard

* Protected teacher dashboard
* Role-based access

### Class Management (CRUD)

Teachers can:

* Create classes
* View all their classes
* View individual class details
* Edit existing classes
* Delete classes

### Assignment Management

Teachers can:

* Create assignments within a class
* View assignments belonging to a class

Each assignment includes:

* Title
* Instructions
* Due date


# Current Learning Objectives

This project is being developed to strengthen practical skills in:

* Next.js App Router
* TypeScript
* React
* Authentication
* Authorization
* CRUD Operations
* Database Design
* Server Actions
* Full-stack application architecture

---

# Planned Features

## Phase 1

* Authentication ✅
* Authorization ✅

## Phase 2

### Class Management

* Create Class ✅
* View Classes ✅
* View Individual Class ✅
* Edit Class ✅
* Delete Class ✅

## Phase 3

### Student Management

* Invite students ✅
* Join classes ✅
* Manage enrolled students

## Phase 4

### Assignment Management

* Create assignments ✅
* View assignments within a class ✅
* Edit assignments
* View individual assignment ✅
* Delete assignments

## Phase 5

### Student Dashboard

* View enrolled classes ✅
* View assignments ✅
* Submit essays ✅
* Update existing submissions ✅
* Track progress

## Phase 6

### Teacher Dashboard

* Review submissions
* View student work
* Provide feedback

## Phase 7

### AI-Assisted Feedback

* Automated formative feedback
* Grammar suggestions
* Vocabulary suggestions
* Coherence feedback
* Revision support

## Phase 8

### Analytics

* Student progress
* Revision history
* Assignment statistics
* Teacher insights

---



# Status

**Current milestone:** Students can enrol in classes, view the classes and submit assignments.

Completed:

* Authentication
* Role-based authorization
* Teacher Dashboard
* Class Management (CRUD)
* Assignment Creation
* Assignment Listing
* Assignment Submission

**Next milestone:** Teacher Module (assignment response viewing and review).

## Author

Maryam Abdulkareem
#