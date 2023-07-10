import { Patient } from './schemas/Patient'
import { Prescription } from './schemas/Prescription'

interface Database {
    patients: Record<string, Patient>;
    prescriptions: Record<string, Prescription>;
  }

export const database: Database = {
    patients: {
      '86467007-ebfe-4b8f-ab82-eee4d0567857': {
        email: 'example@example.com',
        firstName: 'Cordelia',
        id: '86467007-ebfe-4b8f-ab82-eee4d0567857',
        lastAppointment: '2023-01-01',
        lastName: 'Chase',
        phone: '555-555-5555',
        prescriptions: [],
      },
      '391faa42-0568-45e7-a5b2-cf16efc9a08b': {
        email: 'example2@example.com',
        firstName: 'Harmony',
        id: '391faa42-0568-45e7-a5b2-cf16efc9a08b',
        lastAppointment: '2023-02-02',
        lastName: 'Kendall',
        phone: '555-123-4567',
        prescriptions: [],
      },
      'd0dc0904-33c2-4063-8ecb-38127441cbb8': {
        email: 'example23@example.com',
        firstName: 'Daniel',
        id: 'd0dc0904-33c2-4063-8ecb-38127441cbb8',
        lastAppointment: '2023-03-04',
        lastName: 'Osbourne',
        phone: '555-765-4321',
        prescriptions: [],
      },
      '60e89915-94ef-416c-a222-ed1a059e8dfa': {
        email: 'example4@example.com',
        firstName: 'William',
        id: '60e89915-94ef-416c-a222-ed1a059e8dfa',
        lastAppointment: '2022-12-02',
        lastName: 'Pratt',
        phone: '557-666-4343',
        prescriptions: [],
      },
      '7303ce40-f6bb-414b-861a-1017c7bb1fb4': {
        email: 'example5@example.com',
        firstName: 'Anya',
        id: '7303ce40-f6bb-414b-861a-1017c7bb1fb4',
        lastAppointment: '2022-11-20',
        lastName: 'Jenkins',
        phone: '222-444-4232',
        prescriptions: [],
      },
      '070f744f-b09a-40a2-8d0a-d6e66f1ef460': {
        email: 'example6@example.com',
        firstName: 'Wesley',
        id: '070f744f-b09a-40a2-8d0a-d6e66f1ef460',
        lastAppointment: '2021-02-02',
        lastName: 'Wyndham-Price',
        phone: '417-113-4567',
        prescriptions: [],
      },
    },
    prescriptions: {
      '370d3c0c-9f10-44f8-8a4e-49e34815cf7b': {
        name: 'Some name',
        refills: "0",
        status: "Filled",
        userId: '86467007-ebfe-4b8f-ab82-eee4d0567857',
        id: '370d3c0c-9f10-44f8-8a4e-49e34815cf7b',
      },
      '7a445e57-f526-4e3e-940b-a98754d5aae4a': {
        name: 'Other name',
        refills: "3",
        status: "In Progress",
        userId: '86467007-ebfe-4b8f-ab82-eee4d0567857',
        id: '7a445e57-f526-4e3e-940b-a98754d5aae4a',
      },
      '11254ede-f48a-41ed-8a66-76bfc7efe8a6': {
        name: 'Tylenol',
        refills: "9",
        status: "Pending",
        userId: '86467007-ebfe-4b8f-ab82-eee4d0567857',
        id: '11254ede-f48a-41ed-8a66-76bfc7efe8a6',
      },
      'c6acca38-aee9-423e-a7b4-8a68e63ac912': {
        name: 'Aspirin',
        refills: "2",
        status: "Filled",
        userId: '391faa42-0568-45e7-a5b2-cf16efc9a08b',
        id: 'c6acca38-aee9-423e-a7b4-8a68e63ac912',
      },
      '10903203-8362-42a0-95c3-2c018f1f17ce': {
        name: 'Excedrin',
        refills: "30",
        status: "In Progress",
        userId: '391faa42-0568-45e7-a5b2-cf16efc9a08b',
        id: '10903203-8362-42a0-95c3-2c018f1f17ce',
      },
      '0db37148-7fb3-49c8-b92a-f26e771fe2e0': {
        name: 'Benadryl',
        refills: "0",
        status: "Filled",
        userId: '86467007-ebfe-4b8f-ab82-eee4d0567857',
        id: '0db37148-7fb3-49c8-b92a-f26e771fe2e0',
      },
      '208a8cad-4402-46fb-b0c8-b83e18c9ba32': {
        name: 'Benadryl',
        refills: "10",
        status: "Pending",
        userId: '60e89915-94ef-416c-a222-ed1a059e8dfa',
        id: '208a8cad-4402-46fb-b0c8-b83e18c9ba32',
      },
      'ddf831a3-aab3-49e8-ab61-73f53c054040': {
        name: 'Benadryl',
        refills: "4",
        status: "Pending",
        userId: '070f744f-b09a-40a2-8d0a-d6e66f1ef460',
        id: 'ddf831a3-aab3-49e8-ab61-73f53c054040',
      },
    },
  };
