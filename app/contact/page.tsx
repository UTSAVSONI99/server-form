"use client"
import React, { useActionState } from 'react'
import { handleContact } from "./action"


import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import ReCAPTCHA from "react-google-recaptcha";
import { Input } from "@/components/ui/input"
import { SubmitButton } from './submitform'




type State = { error?: string; success?: string }
const initialState: State = { error: undefined, success: undefined }


export default function InputForm() {
  const [state, formAction] = useActionState(handleContact, initialState)
  const [token, setToken] = React.useState<string>("")

  return (
    <form action={formAction} className="w-full max-w-sm mx-auto flex flex-col justify-center min-h-screen">
      {state?.error && (
        <p className="text-red-500">{state.error}</p>
      )}

      {state?.success && (
        <p className="text-green-500">{state.success}</p>
      )}
      <FieldGroup>


        <Field>
          <FieldLabel htmlFor="form-name">Name</FieldLabel>
          <Input
            name="name"
            id="form-name"
            type="text"
            placeholder="Evil Rabbit"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-email">Email</FieldLabel>
          <Input name='email' id="form-email" type="email" placeholder="john@example.com" />
          <FieldDescription>
            We&apos;ll never share your email with anyone.
          </FieldDescription>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
            <Input name="phone" id="form-phone" type="tel" placeholder="+1 (555) 123-4567" />
          </Field>

        </div>
        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <textarea
            name='message'
            id="message"
            rows={4}
            placeholder="Your message here..."
            className="resize-y min-h-25 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none "
          />
        </Field>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          onChange={(value: string | null) => setToken(value ?? "")}
           
        />
        {/* hidden input to send token */}a
        <input type="hidden" name="captchaToken" value={token} />
      </FieldGroup>

      <Field orientation="horizontal">

        <SubmitButton disabled={!token} />
      </Field>
    </form>
  )

}





