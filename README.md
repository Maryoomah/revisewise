# WriteWise

WriteWise is a modern web application for managing writing classes, assignments, student submissions, revisions, teacher feedback, and AI-assisted revision guidance.

The project is built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Supabase**, with a focus on creating a scalable platform for English language teachers and learners.

---

# Tech Stack

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* Supabase Authentication
* Supabase Database
* Supabase Row Level Security (RLS)
* Server Actions
* Google Gemini API

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

# Authorization

Role-based route protection has been implemented.

### Teacher

Protected routes include:

* `/teacher`
* `/teacher/profile`
* `/teacher/classes`
* `/teacher/assignments`
* `/teacher/submissions`

Only authenticated teachers can access teacher functionality.

### Student

Protected routes include:

* `/student`
* `/student/classes`
* `/student/classes/[id]`
* `/student/classes/[id]/assignments/[assignmentId]`

Only authenticated students can access student functionality.

Unauthenticated users are redirected to the login page.

---

# User Profile

A `profiles` table stores application-specific user information.

Current fields include:

* `id`
* `full_name`
* `role`

Authentication data is managed by Supabase Auth, while application-specific data is stored in the database.

# Teacher Module

## Teacher Dashboard

The teacher dashboard provides an overview of:

* Active classes
* Active assignments
* New student submissions
* Assignments approaching their deadlines
* Submissions awaiting review

Quick actions are also available for:

* Creating a new class
* Accessing classes
* Reviewing submissions
* Accessing assignments

---

## Class Management

Teachers can:

* Create classes
* View all their classes
* View individual class details
* Edit existing classes
* Delete classes

Each class includes:

* Title
* Level
* Description
* Class code
* Teacher

---

## Student Management

Students can join classes using a class code.

The database uses an `enrolments` table to establish the relationship between:

* Students
* Classes

A unique constraint prevents a student from enrolling in the same class more than once.

---

## Assignment Management

Teachers can:

* Create assignments within a class
* View assignments belonging to a class
* View individual assignments
* Set assignment instructions
* Set due dates

Each assignment belongs to a specific class.

---

# Student Module

## Student Dashboard

<!-- The student dashboard provides an overview of:

* Enrolled classes
* Total assignments
* Assignments awaiting feedback
* Recent assignments -->

The student dashboards allows students to :

* View their enrolled classes
* Join another class using a class code
* Access individual class pages
* Access individual assignments

---

## Class Pages

Students can view:

* Class title
* Class level
* Class description
* Assignments belonging to the class

Each assignment displays:

* Assignment title
* Instructions
* Due date
* Submission status

Students can click an assignment to access its submission page.

---

# Assignment Submissions

Students can:

* Submit an essay
* View their existing submission
* Update an existing submission
* Revise their work after receiving feedback

Each student has one active submission record for a particular assignment.

Updating a submission updates the current response rather than creating a second active submission.

---

# Submission Status

Submissions currently use statuses including:

* `submitted`
* `reviewed`

### Submitted

The student's current work has been submitted and is awaiting teacher review.

### Reviewed

The teacher has reviewed the current submission and provided feedback and/or a score.

When a student revises and resubmits their work:

* The current response is updated
* The submission status changes back to `submitted`
* Previous feedback is cleared from the active submission
* The previous review remains preserved in the revision history
* The teacher can review the new version

---

# Teacher Submission Review

Teachers can access a dedicated submissions area where they can:

* View student submissions
* See which submissions are awaiting review
* View reviewed submissions
* Read student responses
* Provide feedback
* Assign scores

The teacher dashboard also displays the number of submissions currently awaiting review.

---

# Submission Revision History

ReviseWise preserves previous reviewed versions of student work using a separate `submission_revisions` table.

The active `submissions` record represents the student's **current version**, while `submission_revisions` preserves previous reviewed versions, including:

* Student response
* Teacher feedback
* Score
* Revision timestamp

This allows the system to maintain a history of the student's writing development without creating multiple active submission records for the same assignment.

For example:

```text
Student submits Essay 1
        ↓
Teacher reviews Essay 1
        ↓
Revision 1 saved
        ↓
Student receives feedback
        ↓
Student revises Essay
        ↓
Current submission is updated
        ↓
Teacher reviews Essay 2
        ↓
Revision 2 saved
        ↓
Review history preserved
```

---

# AI-Assisted Revision Guidance

ReviseWise integrates the **Google Gemini API** to provide AI-assisted guidance after teacher feedback has been provided.

The AI is designed as a **revision coach**, not an essay writer.

The goal is to help students understand and act on teacher feedback without replacing the student's own writing process.

## AI Guidance Flow

```text
Student writes essay
        ↓
Student submits
        ↓
Teacher analyses the writing
        ↓
Teacher provides feedback
        ↓
AI helps student understand and implement the feedback
        ↓
Student revises
        ↓
Teacher reviews the revised work
        ↓
Review history is preserved
```

The AI guidance focuses on:

* Explaining what the teacher's feedback means
* Identifying where the student should focus
* Providing questions that help the student think through the revision
* Giving the student a starting point for revision
* Providing a revision checklist

The AI is explicitly instructed to:

* Not rewrite the student's essay
* Not provide full replacement sentences
* Not grade the student's work
* Guide the student toward making their own revisions

---

# AI Guidance Storage

AI-generated guidance is stored separately in an `ai_guidance` table.

Each guidance record is linked to a specific `submission_revisions` record through `revision_id`.

This preserves the relationship between:

```text
Student response
      ↓
Teacher feedback
      ↓
AI revision guidance
```

AI guidance is therefore associated with a specific reviewed version of the student's work rather than the submission as a whole.

Row Level Security (RLS) policies ensure that students can only create and view AI guidance associated with their own submissions.

---


This project is being developed to strengthen practical skills in:

* Next.js App Router
* TypeScript
* React
* Authentication
* Authorization
* CRUD Operations
* Database Design
* Row Level Security
* Server Actions
* API Integration
* AI Integration
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

* Review submissions ✅
* View student work ✅
* Provide feedback ✅
* Assign scores ✅
* Preserve review history ✅

## Phase 7

### AI-Assisted Feedback

* AI revision guidance ✅
* Teacher-feedback interpretation ✅
* Revision starting points ✅
* Revision questions ✅
* Revision checklist ✅




---

# Current Status

**Current milestone:** WriteWise has a functional end-to-end teacher feedback and AI-assisted revision guidance workflow.

Completed:

* Authentication
* Role-based authorization
* Teacher Dashboard
* Student Dashboard
* Class Management (CRUD)
* Student enrolment
* Assignment Creation
* Assignment Listing
* Assignment Viewing
* Assignment Submission
* Submission Updates
* Teacher Submission Review
* Teacher Feedback
* Teacher Scoring
* Submission Revision History
* AI-Assisted Revision Guidance
* Gemini API Integration
* RLS policies for AI guidance

### Core Workflow

```text
Student writes
      ↓
Student submits
      ↓
Teacher reviews
      ↓
Teacher provides feedback
      ↓
AI guides the student
      ↓
Student revises
      ↓
Teacher reviews again
      ↓
Revision history is preserved
```

---

# Future Development

Planned improvements include:

* Student progress tracking
* More detailed revision analytics
* Assignment statistics
* Teacher insights
* More sophisticated AI revision guidance
* Grammar and vocabulary guidance
* Coherence and organization guidance
* Improved student revision experience

---

# Author

Maryam Abdulkareem
