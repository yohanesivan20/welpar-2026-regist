# 🎯 Faith Game B2B — Event Registration Platform

A modern event registration website with real-time tracking, unique participant IDs, and seamless integration with Google Sheets as a lightweight backend.

🔗 Live Demo: https://faith-game-b2b-regist.vercel.app/

---

## 🚀 Overview

Faith Game B2B is a web-based registration platform built for a church community event.
The goal was to create a **simple, fast, and scalable system** without relying on a traditional backend server.

This project demonstrates how modern frontend tools can be combined with serverless solutions to build a **production-ready system with zero infrastructure cost**.

---

## ✨ Key Features

* 📝 **Online Registration Form**

  * Clean, responsive UI
  * Validation with smooth UX

* 🆔 **Unique Registration ID (B2B-001, B2B-002, ...)**

  * Automatically generated
  * Consistent between frontend & backend

* 📊 **Real-time Participant Counter**

  * Fetches live data from Google Sheets

* ⚡ **Serverless Backend**

  * Powered by Google Apps Script
  * No database setup required

* 🔒 **Race Condition Protection**

  * Uses locking mechanism to prevent duplicate IDs

* 🎨 **Modern UI/UX**

  * Built with TailwindCSS + animations
  * Interactive carousel & visual elements

---

## 🧠 Problem & Solution

### ❌ Problem

Traditional event registration systems:

* Require backend setup (costly & complex)
* Risk duplicate data under high traffic
* Hard to maintain for small communities

### ✅ Solution

This project solves it by:

* Using **Google Sheets as a database**
* Adding **Apps Script as a lightweight API**
* Implementing **locking system** to prevent race conditions
* Generating **human-readable unique IDs**

---

## 🛠️ Tech Stack

### Frontend

* Next.js (App Router)
* Tailwind CSS
* Framer Motion
* React Hook Form

### Backend (Serverless)

* Google Apps Script
* Google Sheets (Database)

### Deployment

* Vercel (Frontend)
* Google Script Web App (API)

---

## ⚙️ System Architecture

```text
User → Next.js Frontend → Google Apps Script → Google Sheets
```

### Flow:

1. User submits registration form
2. Frontend sends data via POST request
3. Apps Script:

   * Locks execution (prevent race condition)
   * Validates duplicate phone number
   * Generates unique ID (B2B-XXX)
   * Saves to Google Sheets
4. Response sent back to frontend
5. UI displays success + Registration ID

---

## 🔐 Race Condition Handling

To ensure unique IDs, the system uses:

* `LockService` from Google Apps Script
* Sequential ID generation based on row count

This guarantees:

* No duplicate IDs
* Safe concurrent submissions

---

## 📸 UI Highlights

* Animated hero section
* Interactive event carousel
* Clean and minimal registration form
* Responsive design for all devices

---

## 📦 Installation (Local Development)

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=YOUR_GOOGLE_SCRIPT_URL
```

---

## 🚀 Deployment

### Frontend

* Deployed on Vercel

### Backend

* Google Apps Script deployed as Web App
* Access: Anyone

---

## 📈 Future Improvements

* 📱 WhatsApp Bot Integration
* 📧 Email Confirmation System
* 🎟️ QR Code Check-in
* 📊 Admin Dashboard
* 🔍 Search & filter participants

---

## 💡 What I Learned

* Building serverless systems with minimal cost
* Handling concurrency (race condition) in distributed systems
* Designing scalable frontend architecture
* Integrating third-party services effectively

---

## 🤝 Let's Connect

I'm open to opportunities and collaborations, especially in:

* Fullstack Development
* AI-integrated applications
* Scalable web systems

Feel free to reach out!
