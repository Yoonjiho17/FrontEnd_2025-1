document.getElementById("searchButton").addEventListener("click", async function() {
    const countryName = document.getElementById("countryInput").value
    if (!countryName) {
        alert("나라 이름을 입력하세요!");
        return;
    }

    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

    if (response.status === 404) {
        document.getElementById("result").innerText = "해당 나라를 찾을 수 없습니다.";
        return;
    }    
    
    const data = await response.json();

    const country = data.find(c => c.name.common.toLowerCase() === countryName.toLowerCase());

    if (!country) {
        document.getElementById("result").innerText = "나라 이름을 정확히 입력해주세요.";
        return;
    }

    const flagUrl = country.flags.png;
    let capital;
    if(country.capital) {
        capital = country.capital[0];
    }
    else {
        capital = "정보 없음";
    }

    document.getElementById("result").innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>수도:</strong> ${capital}</p>
        <img src="${flagUrl}" alt="국기" width="200">
    `;
});


