# WriteWise

WriteWise is a modern web application for managing writing classes, assignments, student submissions, revisions, and teacher feedback.

The project is being built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Supabase**, with a focus on creating a scalable platform for English language teachers and learners.

The project also serves as the practical component of a broader research interest in **AI-assisted formative feedback for second language writing**.

---

# Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Supabase Authentication
- Supabase Database
- Supabase Row Level Security (RLS)
- Server Actions

---

# Current Features

## Authentication

### User Registration

- Email and password registration
- Full name collection
- Teacher and Student role selection
- Email verification

### Login

- Email/password authentication
- Automatic role detection
- Redirects users to the correct dashboard after login

### Password Recovery

- Forgot Password
- Password reset through email
- Password update page

### Logout

- Secure logout using Supabase Authentication
- Session destroyed before redirecting to login

---

# Authorization

Role-based route protection has been implemented.

### Teacher

Protected routes include:

- `/teacher`
- `/teacher/profile`
- `/teacher/classes`
- `/teacher/assignments`
- `/teacher/submissions`

Only authenticated teachers can access teacher functionality.

### Student

Protected routes include:

- `/student`
- `/student/classes`
- `/student/classes/[id]`
- `/student/classes/[id]/assignments/[assignmentId]`

Only authenticated students can access student functionality.

Unauthenticated users are redirected to the login page.

---

# User Profile

A `profiles` table stores application-specific user information.

Current fields include:

- `id`
- `full_name`
- `role`

Authentication data is managed by Supabase Auth, while application-specific data is stored in the database.

---

# Teacher Module

## Teacher Dashboard

The teacher dashboard provides an overview of:

- Active classes
- Active assignments
- New student submissions
- Assignments approaching their deadlines
- Submissions awaiting review

Quick actions are also available for:

- Creating a new class
- Accessing classes
- Reviewing submissions
- Accessing assignments

---

## Class Management

Teachers can:

- Create classes
- View all their classes
- View individual class details
- Edit existing classes
- Delete classes

Each class includes:

- Title
- Level
- Description
- Class code
- Teacher

---

## Student Management

Students can join classes using a class code.

The database uses an `enrolments` table to establish the relationship between:

- Students
- Classes

A unique constraint prevents a student from enrolling in the same class more than once.

---

## Assignment Management

Teachers can:

- Create assignments within a class
- View assignments belonging to a class
- View individual assignments
- Set assignment instructions
- Set due dates

Each assignment belongs to a specific class.

---

# Student Module

## Student Dashboard

The student dashboard provides an overview of:

- Enrolled classes
- Total assignments
- Assignments awaiting feedback
- Recent assignments

Students can also:

- View their enrolled classes
- Join another class using a class code
- Access individual class pages
- Access individual assignments

---

## Class Pages

Students can view:

- Class title
- Class level
- Class description
- Assignments belonging to the class

Each assignment displays:

- Assignment title
- Instructions
- Due date
- Submission status

Students can click an assignment to access its submission page.

---

# Assignment Submissions

Students can:

- Submit an essay
- View their existing submission
- Update an existing submission
- Revise their work after receiving feedback

Each student can have one active submission for a particular assignment.

Updating a submission overwrites the current response rather than creating a second active submission.

---

# Submission Status

Submissions currently use statuses including:

- `submitted`
- `reviewed`

### Submitted

The student's work has been submitted and is awaiting teacher review.

### Reviewed

The teacher has provided feedback and/or a score.

When a student revises and resubmits their work:

- The current response is updated
- The submission status changes back to `submitted`
- Previous feedback is cleared from the active submission
- The teacher can review the new version

---

# Teacher Submission Review

Teachers can access a dedicated submissions area where they can:

- View student submissions
- See which submissions are awaiting review
- View reviewed submissions
- Read student responses
- Provide feedback
- Assign scores

The teacher dashboard also displays the number of submissions currently awaiting review.

---

# Submission Review History

To preserve feedback and revision history, WriteWise uses a separate `submission_reviews` table.

This allows the active `submissions` record to represent the student's current version while previous teacher reviews are preserved separately.

For example:

```text
Student submits Essay 1
        ↓
Teacher reviews Essay 1
        ↓
Review 1 saved in submission_reviews
        ↓
Student revises Essay
        ↓
Current response is updated
        ↓
Teacher reviews Essay 2
        ↓
Review 2 saved in submission_reviews


## Author

Maryam Abdulkareem
#