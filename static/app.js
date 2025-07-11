let count = 0;
let rowCount = 0;
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

    const handleKeyInput = (key) => {
        const block = document.querySelector(
            `.block-box__item[data-item='${rowCount}${count}']`
        );

        if (key === "BACKSPACE") handelKeyBackspace();
        else if (count === 5) {
            if (key === "ENTER") handleKeyEnterInput();
            else return;
        } else if (key >= "A" && key <= "Z") {
            block.innerHTML = key;
            count++;
        } 
    };

    const handleKeyEnterInput = async () => {
        let 맞은_수 = 0;
        const 응답 = await fetch("/answer"); //해당 루트에 응답을 받고
        console.log(응답);
        const 정답_객체 = await 응답.json(); // 그 응답은 json 으로 포맷
        console.log(정답_객체);
        const 정답 = 정답_객체.answer;

        for (let i = 0; i < 5; i++) {
            const block = document.querySelector(
                `.block-box__item[data-item='${rowCount}${i}']`
            );

            const 입력_정답 = block.innerHTML.toLocaleUpperCase();
            const 정답_글자 = 정답[i];

            if (입력_정답 === 정답_글자) {
                block.style =
                    "background-color:#B49F3A; color: white; transition: all 0.3s ease-in-out;";

                document.querySelectorAll(`.key-box__item`).forEach((e) => {
                    if (e.dataset.key === 정답_글자) {
                        e.style.backgroundColor = "#B49F3A";
                        block.style.color = "white";
                    }
                });
                block.classList.add("bounce");

                맞은_수++;
            } else if (정답.includes(입력_정답)) {
                block.style.backgroundColor = "#538D4E";
                block.style.color = "white";

                document.querySelectorAll(`.key-box__item`).forEach((e) => {
                    if (e.dataset.key === 입력_정답) {
                        e.style.backgroundColor = "#538D4E";
                        block.style.color = "white";
                    }
                });
            } else {
                block.style.backgroundColor = "#3A3A3C";
                block.style.color = "white";

                document.querySelectorAll(`.key-box__item`).forEach((e) => {
                    if (e.dataset.key === 입력_정답) {
                        e.style.backgroundColor = "#efefef";
                        block.style.color = "white";
                    }
                });

                block.classList.add("shake");
            }
        }
        if (맞은_수 === 5) gameOver();
        else nextLine();
    };

    const handelKeyBackspace = () => {
        if (count > 0) {
            const keyItem = document.querySelector(
                `.block-box__item[data-item='${rowCount}${count - 1}']`
            );
            console.log(keyItem)
            keyItem.innerHTML = "";
        }

        if (count !== 0) count -= 1;
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
    window.addEventListener("keydown", (e) => {
        const key = e.key.toUpperCase();
        handleKeyInput(key);
    });
    window.addEventListener("click", (e) => {
        const key = e.target.dataset.key;
        handleKeyInput(key);
    });
}

appStart();
