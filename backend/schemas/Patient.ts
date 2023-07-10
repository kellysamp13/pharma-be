import { z } from 'zod'
import { PrescriptionSchema } from './Prescription'

const PatientSchema = z.object({
    activeScripts: z.array(PrescriptionSchema).optional(),
    email: z.string().email(),
    expiredScripts: z.array(PrescriptionSchema).optional(),
    firstName: z.string(),
    id: z.string().optional(),
    lastAppointment: z.string(),
    lastName: z.string(),
    phone: z.string(),
    prescriptions: z.array(PrescriptionSchema).optional(),
})

export type Patient = z.infer<typeof PatientSchema>
