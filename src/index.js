const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
  ITEM: "",
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
  ITEM: "",
};

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

function sortearItem() {
  let random = Math.random();
  let result;

  result = random > 0.5 ? "Bomba" : "Casco";

  return result;
}

function turbo() {
  const atributos = ["Velocidade", "Manobrabilidade", "Poder"];
  const index = Math.floor(Math.random() * atributos.length);
  return atributos[index];
}

function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResult1 = rollDice();
    let diceResult2 = rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );

      logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }
    //js expressions
    if (block === "CONFRONTO") {
      character1.ITEM = sortearItem();
      character2.ITEM = sortearItem();

      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

      logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);

      logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        if (character1.ITEM === "Bomba") {
          character2.PONTOS -= 2;
          console.log(
            `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 2 pontos 🐢`
          );
        } else {
          character2.PONTOS--;
          console.log(
            `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`
          );
        }
        //desafio turbo
        let turboBonus = turbo();
        console.log(`${character1.NOME} ganhou bônus de ${turboBonus} com o turbo! 🚀`);
        character1[turboBonus]++;
      }

      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        if (character2.ITEM === "Bomba") {
          character1.PONTOS -= 2;
          console.log(
            `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 2 pontos 🐢`
          );
        } else {
          character1.PONTOS--;
          console.log(
            `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`
          );
        }
      }

      //ternario
      console.log(
        powerResult2 === powerResult1
          ? "Confronto empatado! Nenhum ponto foi perdido"
          : ""
      );
    }

    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    console.log("-----------------------------");
  }
}

function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  else console.log("A corrida terminou em empate");
}

//autoinvoke
(function main() {
  console.log(
    //windows + . = icons
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );

  playRaceEngine(player1, player2);
  declareWinner(player1, player2);
})();
