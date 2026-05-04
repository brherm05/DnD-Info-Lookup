/**
 * Author: Brayden Hermanson
 * Description: Web app to look up info on D&D creatures
 * Completion: 5/4/2026
 * GitHub: https://github.com/brherm05/DnD-Info-Lookup
 *
 */

/**
 * Loads the monster from the API using user input
 *
 */
async function loadMonster() {
    const input = document.getElementById("monsterIndex").value;
    const status = document.getElementById("status");
    const card = document.getElementById("monsterBio");


    try {

        const id = input.replace(/\s/g, "-").toLowerCase();

        status.textContent = "Loading...";
        card.classList.add("hidden");

        const response = await fetch(`/monsters/${id}`);

        if (!response.ok) {
            throw new Error("Monster not found!");
        }

        const monster = await response.json();

        // Populate the card
        console.log(monster.strength);
        document.getElementById("monsterName").textContent = monster.name;
        document.getElementById("monsterSize").textContent = monster.size;
        document.getElementById("monsterType").textContent = monster.type;
        document.getElementById("monsterHP").textContent = monster.hit_points;
        document.getElementById("monsterBioImg").src = "https://www.dnd5eapi.co" + monster.image;
        document.getElementById("monsterStr").textContent = monster.strength;
        document.getElementById("monsterDex").textContent = monster.dexterity;
        document.getElementById("monsterCon").textContent = monster.constitution;
        document.getElementById("monsterInt").textContent = monster.intelligence;
        document.getElementById("monsterWis").textContent = monster.wisdom;
        document.getElementById("monsterCha").textContent = monster.charisma;

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