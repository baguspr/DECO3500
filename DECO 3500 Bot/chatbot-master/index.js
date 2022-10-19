document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      blurImage();
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});

/**
 * This function blurs the image of the person
 */
function blurImage(){
  if(document.getElementById("1") != null){
    document.getElementById("1").src = "./60 percent blur.png";
    document.getElementById("1").setAttribute("id", "2");
  }
  else if(document.getElementById("2") != null){
    document.getElementById("2").src = "./40 percent blur.png";
    document.getElementById("2").setAttribute("id", "3");
  }
  else if(document.getElementById("3") != null){
    document.getElementById("3").src = "./20 percent blur.png";
    document.getElementById("3").setAttribute("id", "4");
  }
  else if(document.getElementById("4") != null){
    document.getElementById("4").src = "./10 percent blur.png";
    document.getElementById("4").setAttribute("id", "5");
  }
  else if(document.getElementById("5") != null){
    document.getElementById("5").src = "./bot.png";
    document.getElementById("5").setAttribute("id", "6");
  }

}

function output(input) {
  let product;

  // Regex remove non word/space chars
  // Trim trailing whitespce
  // Remove digits - not sure if this is best
  // But solves problem of entering something like 'hi1'

  let text = input
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/[\d]/gi, "")
    .trim();
  text = text
    .replace(/ a /g, " ") // 'tell me a story' -> 'tell me story'
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(prompts, replies, text)) {
    // Search for exact match in `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!";
  } else if (text.match(/(corona|covid|virus)/gi)) {
    // If no match, check if message contains `coronavirus`
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {
    // If all else fails: random alternative
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  // Update DOM
  addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        // Stop inner loop when input value matches prompts
        break;
      }
    }
    if (replyFound) {
      // Stop outer loop when reply is found instead of interating through the entire array
      break;
    }
  }
  return reply;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  // botImg.src = "bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  // Keep messages at most recent
  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;

  // Fake delay to seem "real"
  setTimeout(() => {
    botText.innerText = `${product}`;
    textToSpeech(product);
  }, 2000);
}
