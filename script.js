async function getPokemon() {
  let cont = document.getElementById("id_cont").value;
  const id = document.getElementById("pokemonId").value;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (response.ok) {
    const data = await response.json();
    let sprites = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ];
    document.getElementById("pokemonInfo").innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <img src="${sprites[cont - 1]}" alt="${data.name}">
      <p><strong>Altura:</strong> ${data.height / 10} m</p>
      <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
      <p><strong>Tipos:</strong> ${data.types
        .map((t) => t.type.name)
        .join(", ")}</p>
      <p><strong>Experiencia Base:</strong> ${
        data.base_experience
      } <i>xp</i></p>
    `;
  } else {
    document.getElementById("pokemonInfo").innerHTML =
      "<p>Pokémon não encontrado.</p>";
  }
}
