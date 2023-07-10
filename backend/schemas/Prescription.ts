import { z } from 'zod'

export const PrescriptionSchema = z.object({
    name: z.string(),
    refills: z.string(),
    status: z.string(),
    userId: z.string(),
    id: z.string()
})

export type Prescription = z.infer<typeof PrescriptionSchema>
