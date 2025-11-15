function sendMessage() {
    let input = document.getElementById("userInput");
    let message = input.value.trim();
    if (message === "") return;

    addMessage(message, "user");
    input.value = "";

    setTimeout(() => {
        let response = botReply(message);
        addMessage(response, "bot");
    }, 400);
}

function addMessage(text, sender) {
    let chatbox = document.getElementById("chatbox");
    let msg = document.createElement("div");

    msg.classList.add("message", sender);
    msg.innerText = text;

    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
}

/* -----------------------------
   PRIME CHECK
------------------------------*/
function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

/* -----------------------------
   FACTORS
------------------------------*/
function getFactors(n) {
    let list = [];
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) list.push(i);
    }
    return list;
}

/* -----------------------------
   SAFE BODMAS EVALUATOR
------------------------------*/
function safeEval(expr) {
    if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
        return "Invalid expression!";
    }
    try {
        return Function("return (" + expr + ")")();
    } catch {
        return "Error solving expression!";
    }
}

/* -----------------------------
   MAIN BOT LOGIC
------------------------------*/
function botReply(message) {
    let msg = message.toLowerCase();

    // Greetings
    if (msg.includes("hello") || msg.includes("hi")) {
        return "Hello! I can check primes, find factors, and solve BODMAS expressions.";
    }

    // PRIME CHECK
    if (msg.includes("prime")) {
        let num = parseInt(msg.match(/\d+/));
        if (isNaN(num)) return "Please give me a number to check!";
        return isPrime(num)
            ? `${num} is a prime number.`
            : `${num} is NOT a prime number.`;
    }

    // FACTORS
    if (msg.includes("factor")) {
        let num = parseInt(msg.match(/\d+/));
        if (isNaN(num)) return "Please give me a number to factor!";
        return `Factors of ${num} are: ${getFactors(num).join(", ")}`;
    }

    // BODMAS (math)
    if (msg.includes("solve") || msg.includes("=")) {
        let expr = msg.replace("solve", "").replace("=", "").trim();
        let answer = safeEval(expr);
        return `Answer: ${answer}`;
    }

    return "I can help with primes, factors, or BODMAS. Try: 'Is 17 prime?', 'Factors of 20', or 'Solve 8 + 4 * 2'";
}
