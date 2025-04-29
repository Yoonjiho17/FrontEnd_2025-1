const $makeNumButton = document.querySelector("#makeNumButton");
const $resultNums = [];
for(let i = 1; i<=6; i++){
    const el = document.querySelector(`#resultNum${i}`);
    $resultNums.push(el);
}
const $buyLottoButton = document.querySelector("#buyLottoButton");
const $myNums = [];
for(let i = 1; i<=6; i++){
    const el = document.querySelector(`#myNum${i}`);
    $myNums.push(el);
}
const $lottoResultText = document.querySelector(".lottoResultText");
const $input = document.querySelector("input");
const $price = document.querySelector("#price");
const $resultBox = document.querySelector(".resultBox");
const $myNumBox = document.querySelector(".myNumBox");
const $container = document.querySelector(".container");

let resultLottoNumber = []; //로또 결과 배열 선언
let myLottoNumber = []; //내 결과 배열 선언
let newNumbers = []; //복제 배열 선언

function randomNum() {
    let number = new Set(); //중복 방지를 위한 set
    while (number.size < 6) {
        number.add(Math.floor(Math.random() * 45) + 1); //1~45 사이의 난수 생성
    }
    const randomNumarr = [...number].sort((a, b) => a - b) //Set을 배열로 바꾼 후 오름차순 정렬
    return randomNumarr;
}

function crossCheck(arr1, arr2) { //배열끼리 몇 개 일치하는지 비교하는 함수
    let match = 0;
    for(let i=0; i<6; i++) {
        if (arr2.includes(arr1[i])) {
            match++;
        }
    }
    return match;
}

$makeNumButton.addEventListener('click', function() { //번호 생성 클릭 이벤트

    resultLottoNumber = randomNum();
    for(let i=0; i<6; i++) { //로또 결과 배열에 랜덤 수 삽입
        $resultNums[i].innerText = resultLottoNumber[i]; 
    }
    
});

let buyButtonCount = 0;
$buyLottoButton.addEventListener('click', function() { //구매하기 클릭 이벤트

    const matchCount = crossCheck(resultLottoNumber, myLottoNumber); //로또 결과 배열, 내 결과 배열 비교 

    if(resultLottoNumber.length === 0) { //로또 결과 배열이 없을 시 경고 및 새로고침
        alert("먼저 로또 번호를 생성해주세요!");
        location.reload();
    }
    else { //로또 결과 텍스트 삽입
        $lottoResultText.innerText = `결과: ${matchCount}개 일치`
    }

    const inputvalue = parseInt($input.value); //입력값 
    $price.innerText = `${inputvalue*1000}`; //금액 텍스트 삽입 

    if(isNaN(inputvalue) || inputvalue <= 0) { //입력값 1이상 아니면 경고 및 새로고침 
        alert("구매 수량을 제대로 입력하세요!");
        $input.focus();
    }
    else {
        buyButtonCount++; // 구매하기 버튼 두 번 누르면 버튼 비활성화
        if(buyButtonCount > 1) {
            $buyLottoButton.disabled(true);
        }

        myLottoNumber = randomNum();
        for(let i=0; i<6; i++) { //내 결과 배열에 랜덤 수 삽입 
            $myNums[i].innerText = myLottoNumber[i];
        }

        const cloneCount = inputvalue - 1; // 몇 번 복제할지 결정
        let height = 0; //높이
    
        for (let i = 0; i < cloneCount; i++) {
            //내 결과 복제
            const clonedMyNumBox = $myNumBox.cloneNode(true);
            const clonedCircles = clonedMyNumBox.querySelectorAll(".circle");
    
            newNumbers = randomNum();
            clonedCircles.forEach((circle, index) => { //복제 구에 숫자 채워 넣기
                circle.innerText = newNumbers[index];
            });

            const clonedResultText = clonedMyNumBox.querySelector(".lottoResultText"); //로또 결과 배열, 내 결과 복제 비교
            const matchCount = crossCheck(resultLottoNumber, newNumbers);
            clonedResultText.innerText = `결과: ${matchCount}개 일치`
    
            $resultBox.appendChild(clonedMyNumBox); // resultBox에 추가
    
            if (inputvalue > 2) height += 125; //높이 누적
        }

        if(inputvalue > 2) height -= 125; // 높이 조정 (inputvalue가 2면 height는 0이므로 원래 높이 그대로 유지)
        $container.style.height = `${1000 + height}px`;
        $resultBox.style.height = `${460 + height}px`;
    }
});
