import express from "express";

const app = express();

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/transactions", async (req, res) => {
  try {
    const { title, amount, category, user_id } = req.body();

    if (!title || !user_id || !amount || !category)
      return res.status(400).json({ message: "All fields are required" });

    const transaction = await sql`
      INSERT INTO transactions(user_id,title,amount,category)
      VALUES (${user_id},${title},${amount},${category})
      RETURNING *
    `;

    res.status(201).json(transaction[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { app };
