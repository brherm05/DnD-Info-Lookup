async function loadMonster() {
    const input = document.getElementById("monsterIndex").value;
    const status = document.getElementById("status");
    const card = document.getElementById("monsterBio");


    try {

        let id = input.replace(/\s/g, "-").toLowerCase();

        status.textContent = "Loading...";
        card.classList.add("hidden");

        const response = await fetch(`/monsters/${id}`);

        if (!response.ok) {
            throw new Error("Monster not found!");
        }

        const monster = await response.json();

        // Populate the card
        console.log("https://www.dnd5eapi.co" + monster.image);
        document.getElementById("monsterName").textContent = monster.name;
        document.getElementById("monsterSize").textContent = monster.size;
        document.getElementById("monsterType").textContent = monster.type;
        document.getElementById("monsterHP").textContent = monster.hit_points;
        document.getElementById("monsterBioImg").src = "https://www.dnd5eapi.co" + monster.image;

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