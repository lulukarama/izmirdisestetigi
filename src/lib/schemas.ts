// src/lib/schemas.ts 

import { z } from 'zod'

export const appointmentSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().optional(),
  preferred_date: z.string().min(1, 'Please select a date')
})

export type AppointmentFormData = z.infer<typeof appointmentSchema> 