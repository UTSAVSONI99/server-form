"use server"

export async function handleContact(state:unknown,formData: FormData) {
  const name = formData.get("name")?.toString().trim()
  const email = formData.get("email")?.toString().trim()
  const phone = formData.get("phone")?.toString().trim()
  const message = formData.get("message")?.toString().trim()
  const token = formData.get("captchaToken")

    if (!token) {
    return { error: "Captcha not completed" }
  }

const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    secret: process.env.RECAPTCHA_SECRET_KEY ?? "",
    response: typeof token === "string" ? token : "",
  }),
});

const data = await res.json();

  if (!data.success) {
    return { error: "Captcha verification failed" }
  }


 
  if (!name || !email || !message) {
    return { error: "All required fields must be filled" }
  }

  if (!email.includes("@")) {
    return { error: "Invalid email format" }
  }

  if (message.length < 10) {
    return { error: "Message too short" }
  }

  console.log({ name, email, phone, message })

  return { success: "Message sent successfully" }
}