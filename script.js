async function getPokemon() {
  const id = document.getElementById("pokemonId").value;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (response.ok) {
    const data = await response.json();
    let imagemHtml;
    if (data.sprites.front_default) {
      imagemHtml = `
      <div class="carousel-item active">
          <img src="${data.sprites.front_default}" alt="${data.name}" class="d-block w-100">
      </div>`;
    }
    if (data.sprites.back_default) {
      imagemHtml += `
      <div class="carousel-item">
          <img src="${data.sprites.back_default}" alt="${data.name}" class="d-block w-100">
      </div>`;
    }
    if (data.sprites.back_female) {
      imagemHtml += `
      <div class="carousel-item">
          <img src="${data.sprites.back_female}" alt="${data.name}" class="d-block w-100">
      </div>`;
    }
    if (data.sprites.back_shiny) {
      imagemHtml += `
      <div class="carousel-item">
          <img src="${data.sprites.back_shiny}" alt="${data.name}" class="d-block w-100">
      </div>`;
    }
    if (data.sprites.back_shiny_female) {
      imagemHtml += `
      <div class="carousel-item">
          <img src="${data.sprites.back_shiny_female}" alt="${data.name}" class="d-block w-100">
      </div>`;
    }
    if (data.sprites.front_shiny) {
      imagemHtml += `
      <div class="carousel-item">
          <img src="${data.sprites.front_shiny}" alt="${data.name}" class="d-block w-100">
      </div>`;
    }
    if (data.sprites.front_female) {
      imagemHtml += `
      <div class="carousel-item">
          <img src="${data.sprites.front_female}" alt="${data.name}" class="d-block w-100">
      </div>`;
    }
    if (data.sprites.front_shiny_female) {
      imagemHtml += `
      <div class="carousel-item">
          <img src="${data.sprites.front_shiny_female}" alt="${data.name}" class="d-block w-100">
      </div>`;
    }
    if (
      data.sprites.versions["generation-v"]["black-white"].animated
        .front_default
    ) {
      imagemHtml += `
      <div class="carousel-item">
          <img src="${data.sprites.versions["generation-v"]["black-white"].animated.front_default}" alt="${data.name}" class="d-block w-100">
      </div>`;
    }
    let generoPokemon = "";

    for (let cont = 1; cont <= 3; cont++) {
      const responseGender = await fetch(
        `https://pokeapi.co/api/v2/gender/${cont}`
      );
      if (responseGender.ok) {
        const dataGender = await responseGender.json();
        let nomes = dataGender.pokemon_species_details.map(
          (nome) => nome.pokemon_species.name
        );
        if (cont == 1 && nomes.includes(data.name)) {
          generoPokemon += "Feminino, ";
        }
        if (cont == 2 && nomes.includes(data.name)) {
          generoPokemon += "Masculino;";
        }
        if (cont == 3 && nomes.includes(data.name)) {
          generoPokemon += "Sem Gênero;";
        }
      }
    }

    document.getElementById("pokemonInfo").innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        ${imagemHtml}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Próximo</span>
      </button>
    </div>
      <p><strong>Altura:</strong> ${data.height / 10} m</p>
      <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
      <p><strong>Tipos:</strong> ${data.types
        .map((t) => t.type.name)
        .join(", ")}</p>
      <p><strong>Sexo do Pokemon:</strong> ${generoPokemon}</p>
    `;
  } else {
    document.getElementById("pokemonInfo").innerHTML =
      "<p>Pokémon não encontrado.</p>";
  }
}
