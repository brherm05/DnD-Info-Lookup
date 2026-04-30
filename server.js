const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/monsters/:index", async (req, res) => {
    try {
        const { index } = req.params;
        const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${index}`, );

        if (!response.ok) {
            return res.status(404).json({ error: "Monster not found" });
        }

        const data = await response.json();

        // Send back only the data we need
        res.json({
            name: data.name,
            size: data.size,
            type: data.type,
            hit_points: data.hit_points,
            image: data.image
        });

    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});