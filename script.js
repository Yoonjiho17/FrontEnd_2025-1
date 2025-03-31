function randomnumber() {
    let number = new Set(); //중복 방지를 위한 set

    while (number.size < 6) {
        number.add(Math.floor(Math.random() * 45) + 1); //1~45 사이의 난수 생성
    }

    let lottonumber = [...number].sort((a, b) => a - b) //Set을 배열로 바꾼 후 오름차순 정렬
}
