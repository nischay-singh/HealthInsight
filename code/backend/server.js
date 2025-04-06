const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json()); 

app.post("/api/symptomgraph", (req, res) => {
  const { keyword } = req.body;

  console.log("Received keyword:", keyword);

  const mockResult = [
    { specialty: "Pediatrics", count: 5 },
    { specialty: "Internal Medicine", count: 3 },
    { specialty: "Pulmonology", count: 2 },
  ];

  res.json({
    message: `Returning specialties matching '${keyword}'`,
    results: mockResult,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
