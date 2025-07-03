let count = 0;
let rowCount = 0;
const 정답 = "magic";
let timer;

function appStart() {
    const displayGamemover = () => {
        clearInterval(timer);
        const div = document.createElement("div");
        div.innerText = "정답!";
        div.style =
            "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; width: 180px; height:80px; background-color: #ccc; border-radius: 30px;";
        document.body.appendChild(div);
    };

    const nextLine = () => {
        if (rowCount === 6) return gameOver();
        rowCount++;
        count = 0;
    };

    const handleKeyInput = (e) => {
        const keyItem = document.querySelector(
            `.block-box__item[data-item='${rowCount}${count}']`
        );
        if (e.key === "Backspace") handelKeyBackspace();
        if (count === 5) {
            if (e.key === "Enter") handleKeyEnterInput();
            else return;
        } else if (e.key >= "a" && e.key <= "z") {
            keyItem.innerHTML = e.key;
            count++;
        }
    };

    const handleKeyEnterInput = (e) => {
        let 맞은_수 = 0;
        for (let i = 0; i < 5; i++) {
            const keyItem = document.querySelector(
                `.block-box__item[data-item='${rowCount}${i}']`
            );

            const 입력_정답 = keyItem.innerHTML;

            const 정답_글자 = 정답[i];

            // console.log(입력_정답, 정답_글자);
            if (입력_정답 === 정답_글자) {
                keyItem.style.backgroundColor = "#B49F3A";
                keyItem.style.color = "white";
                맞은_수++;
            } else if (정답.includes(입력_정답)) {
                keyItem.style.backgroundColor = "#538D4E";
                keyItem.style.color = "white";
            } else {
                keyItem.style.backgroundColor = "#3A3A3C";
                keyItem.style.color = "white";
            }
        }
        if (맞은_수 === 5) gameOver();
        else {
            nextLine();
        }
    };

    const handelKeyBackspace = () => {
        if (count > 0) {
            const keyItem = document.querySelector(
                `.block-box__item[data-item='${rowCount}${count - 1}']`
            );
            keyItem.innerHTML = "";
        }

        if (count !== 0) count--;
    };

    const gameOver = () => {
        displayGamemover();
        window.removeEventListener("keydown", handleKeyInput);
    };

    const startTimer = () => {
        const 시작_시간 = new Date();

        function setTime() {
            const 현재_시간 = new Date();
            const 흐른_시간 = new Date(현재_시간 - 시작_시간);
            const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
            const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
            const time = document.querySelector("#time");
            time.innerHTML = `${분}:${초}`;
        }

        timer = setInterval(setTime, 1000);
    };

    startTimer();
    window.addEventListener("keydown", handleKeyInput);
}

appStart();
