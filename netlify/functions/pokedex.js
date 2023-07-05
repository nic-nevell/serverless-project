exports.handler = async function (event, context) {
  const eventBody = JSON.parse(event.body);
  console.log(eventBody);
  const POKE_API = 'https://pokeapi.co/api/v2/pokemon/' + eventBody.name;

  const response = await fetch(POKE_API);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      // data
      pokemon: data.name,
      powers: data.abilities
    })
  };
};