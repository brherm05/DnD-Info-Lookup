async function loadMonster() {
    const id = document.getElementById("monsterIndex").value;
    const status = document.getElementById("status");
    const card = document.getElementById("monsterBio");


    try {
        console.log("monster ID:", id);
        status.textContent = "Loading...";
        card.classList.add("hidden");

        const response = await fetch(`/monsters/${id}`);

        if (!response.ok) {
            throw new Error("Monster not found!");
        }

        const monster = await response.json();

        // Populate the card
        document.getElementById("monsterName").textContent = monster.name;
        document.getElementById("monsterSize").textContent = monster.size;
        document.getElementById("monsterType").textContent = monster.type;
        document.getElementById("monsterHP").textContent = monster.hit_points;

        status.textContent = "";
        card.classList.remove("hidden");

    } catch (error) {
        status.textContent = "Error: " + error.message;
        card.classList.add("hidden");
        console.error(error);
    }
}

// Allow pressing Enter to search
document.getElementById("monsterIndex").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        loadMonster();
    }
});