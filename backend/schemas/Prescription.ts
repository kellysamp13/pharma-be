import { z } from 'zod'

export const PrescriptionSchema = z.object({
    id: z.string(),
    name: z.string(),
    refills: z.string(),
    status: z.string(),
    userId: z.string(),
})

export type Prescription = z.infer<typeof PrescriptionSchema>
