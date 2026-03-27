# Contact Form Implementation Procedure

This document describes the procedure followed for implementing the contact form, including the use of server actions and Google reCAPTCHA for spam protection.

---

## 1. Form Structure (Client Side)

- The form is implemented in `app/contact/page.tsx` using React and Next.js.
- It uses custom UI components for fields, labels, and input elements.
- The form includes fields for **Name**, **Email**, **Phone**, and **Message**.
- Google reCAPTCHA is integrated using the `react-google-recaptcha` package to prevent spam submissions.
- The reCAPTCHA token is stored in a React state and sent as a hidden input (`captchaToken`) with the form data.
- The submit button is disabled until the reCAPTCHA is completed.

## 2. Server Action Handling

- The form uses a server action (`handleContact`) defined in `app/contact/action.ts`.
- The server action is invoked using Next.js's `useActionState` hook, which manages form state and handles submission.
- On submission, the form data is sent to the server action for processing.

## 3. reCAPTCHA Verification (Server Side)

- The server action receives the form data, including the `captchaToken`.
- It sends a POST request to Google's reCAPTCHA verification endpoint (`https://www.google.com/recaptcha/api/siteverify`) with:
  - The secret key (from environment variable `RECAPTCHA_SECRET_KEY`)
  - The response token from the client
- The response from Google is checked for success. If verification fails, an error is returned.

## 4. Validation and Response

- The server action validates required fields (name, email, message) and checks for a valid email format and minimum message length.
- If any validation fails, an appropriate error message is returned to the client.
- If all checks pass, a success message is returned (actual message sending logic can be added as needed).

## 5. User Feedback

- The client displays error or success messages based on the server action's response.
- The submit button shows a loading state while the form is being submitted.

---

## File Overview

- `app/contact/page.tsx`: Form UI, client-side logic, reCAPTCHA integration.
- `app/contact/submitform.tsx`: Submit button component with loading state.
- `app/contact/action.ts`: Server action for form handling, validation, and reCAPTCHA verification.

---

## Environment Variables Required

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: Public site key for reCAPTCHA (used on the client).
- `RECAPTCHA_SECRET_KEY`: Secret key for reCAPTCHA (used on the server).

---

## Security Notes

- reCAPTCHA helps prevent automated spam submissions.
- All sensitive validation and verification are performed server-side.

---


**End of Procedure**
