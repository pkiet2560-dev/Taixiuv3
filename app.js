let balance = 1000000;
let riggedResult = "";
const logHistory = [];

function verifyAccessCode() {
    const code = document.getElementById('accessCode').value.trim();
    const indicator = document.getElementById('adminIndicator');
    const hint = document.getElementById('nextResultHint');

    if (code === "kemanh2013") {
        indicator.classList.remove('hidden');
        if (!riggedResult) riggedResult = Math.random() > 0.5 ? "ODD" : "EVEN";
        hint.innerText = riggedResult;
    } else {
        indicator.classList.add('hidden');
    }
}

function initiateRoll(playerBet) {
    const amount = parseInt(document.getElementById('betInput').value);
    const feedback = document.getElementById('statusFeedback');

    if (isNaN(amount) || amount <= 0 || amount > balance) {
        feedback.innerText = "Error: Invalid funds.";
        return;
    }

    feedback.innerText = "System rolling...";

    setTimeout(() => {
        let d1, d2, d3, total, actualResult;

        if (riggedResult !== "") {
            actualResult = riggedResult;
            do {
                d1 = Math.floor(Math.random() * 6) + 1;
                d2 = Math.floor(Math.random() * 6) + 1;
                d3 = Math.floor(Math.random() * 6) + 1;
                total = d1 + d2 + d3;
                var temp = (total % 2 !== 0) ? "ODD" : "EVEN";
            } while (temp !== actualResult);
        } else {
            d1 = Math.floor(Math.random() * 6) + 1;
            d2 = Math.floor(Math.random() * 6) + 1;
            d3 = Math.floor(Math.random() * 6) + 1;
            total = d1 + d2 + d3;
            actualResult = (total % 2 !== 0) ? "ODD" : "EVEN";
        }

        document.getElementById('d1').innerText = d1;
        document.getElementById('d2').innerText = d2;
        document.getElementById('d3').innerText = d3;
        document.getElementById('currentScore').innerText = total;

        if (playerBet === actualResult) {
            balance += amount;
            feedback.innerText = "SUCCESS: YOU WIN!";
        } else {
            balance -= amount;
            feedback.innerText = "FAILED: YOU LOST!";
        }

        document.getElementById('balanceAmount').innerText = balance.toLocaleString();
        renderHistory(actualResult);
        
        riggedResult = Math.random() > 0.5 ? "ODD" : "EVEN";
        verifyAccessCode();
    }, 800);
}

function renderHistory(res) {
    logHistory.push(res);
    const container = document.getElementById('historyContainer');
    const dot = document.createElement('div');
    dot.className = `history-dot ${res === 'ODD' ? 'btn-odd' : 'btn-even'}`;
    dot.innerText = res[0];
    container.appendChild(dot);
}
