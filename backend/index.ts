import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { database } from './Database'
import { Patient } from './schemas/Patient'
import { Prescription } from './schemas/Prescription'

const app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
      res.sendStatus(200);
  } else {
      next();
  }
})

const port = 4000;

// see all patients
app.get("/patients", (req: Request, res: Response) => {
  const searchTerm = req.query.name?.toString()
  const offset = req.query.offset ? Number(req.query.offset) : 0
  const sortedPatients = Object.values(database.patients).sort((a, b) => a.lastAppointment < b.lastAppointment ? 1 : -1)

  if (searchTerm) {
    const foundPatients = sortedPatients.filter((patient: Patient) => {
      const name = patient.lastName.toLowerCase()
      return name.startsWith(searchTerm.toLowerCase())
    })
    res.json({
      patients: foundPatients || [],
      nextOffset: null,
    })
  } else {
    res.json({
      patients: sortedPatients.slice(offset, offset+5),
      nextOffset: sortedPatients.slice(offset, offset+5).length < 5 ? null : offset + 5,
    });
  }
});

// see one patient by id
app.get("/patients/:id", (req: Request, res: Response) => {
  const value = database.patients[req.params.id];
  if (value) {
    // associate prescriptions to the patient with user's id
    const prescriptions = Object.values(database.prescriptions).filter(script => script.userId === value.id)
    value.prescriptions = prescriptions
    res.json(value);
  } else {
    res.sendStatus(404);
  }
});

// create a new patient
app.post("/patients", (req: Request, res: Response) => {
  const {
    email,
    firstName,
    lastAppointment,
    lastName,
    phone,
    prescriptions = []
  } = req.body || {};

  if (!firstName || !lastName) {
    res.status(400).send("Error: Missing required fields");
  } else {
    const id = uuidv4();
    database.patients[id] = {
      email,
      firstName,
      id,
      lastAppointment,
      lastName,
      phone,
      prescriptions,
    };
    res.json(database.patients[id]);
  }
});

// update an existing patient
app.put("/patients/:id", (req: Request, res: Response) => {
  const {
    email,
    firstName,
    lastAppointment,
    lastName,
    phone,
  } = req.body || {};
  const patient = database.patients[req.params.id];

  if (!patient) {
    res.status(404).send('Error: user not found')
  } else {
    database.patients[req.params.id] = {
      ...patient,
      email: email || patient.email,
      firstName: firstName || patient.firstName,
      lastAppointment: lastAppointment || patient.lastAppointment,
      lastName: lastName || patient.lastName,
      phone: phone || patient.phone,
    }
    res.json([database.patients[req.params.id]])
  }
});

// add a prescription
app.post("/prescriptions", (req: Request, res: Response) => {
  const { prescriptions } = req.body || {};
  if (!prescriptions) {
    res.status(400).send("Error: Missing required fields");
  } else {
    const id = uuidv4();
    prescriptions.id = id
    database.prescriptions[id] = prescriptions;
    res.json(database.prescriptions[id]);
  }
});

// see all prescriptions
app.get("/prescriptions", (req: Request, res: Response) => {
  const searchTerm = req.query.name?.toString()
  const offset = req.query.offset ? Number(req.query.offset) : 0
  const filters = req.query.filters ? req.query.filters.toString().split(',') : ''

  // return to client sorted by status
  // would determine default sort based on user feedback
  const sortedScripts = Object.values(database.prescriptions).sort((a, b) => a.status < b.status ? 1 : -1)

  let formattedJson = {}

  if (searchTerm) {
    const foundPrescriptions = sortedScripts.filter(script => {
      const name = script.name.toLowerCase()
      return name.startsWith(searchTerm.toLowerCase())
    })
    formattedJson ={
      prescriptions: foundPrescriptions || [],
      nextOffset: null,
    }
  } else if (filters) {
    const filteredScripts = sortedScripts.filter(script => filters.includes(script.status.toLowerCase()))
    formattedJson = {
      prescriptions: filteredScripts,
      nextOffset: null,
    }
  } else {
    formattedJson = {
      prescriptions: sortedScripts.slice(offset, offset+5),
      nextOffset: sortedScripts.slice(offset, offset+5).length < 5 ? null : offset + 5,
    }
  }

  res.json(formattedJson)
});

// get one prescription by id
app.get("/prescriptions/:id", (req: Request, res: Response) => {
  const prescription = database.prescriptions[req.params.id];

  if (prescription) {
    res.json(prescription);
  } else {
    res.sendStatus(404);
  }
});

// update one prescription by id
app.put("/prescriptions/:id", (req: Request, res: Response) => {
  const { status, refills, name } = req.body || {};
  const script: Prescription = database.prescriptions[req.params.id];

  if (!script) {
    res.status(404).send('Error: prescription not found')
  } else {
    database.prescriptions[req.params.id] = {
      ...script,
      name: name || script.name,
      refills: refills !== undefined ? refills : script.refills,
      status: status || script.status,
    }
    res.json([database.prescriptions[req.params.id]])
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
