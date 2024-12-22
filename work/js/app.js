document.getElementById("get-weather").addEventListener("click", () => {
    const cityCode = document.getElementById("city-select").value;
  
    if (!cityCode) {
      alert("都市を選択してください");
      return;
    }
  
    const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${cityCode}.json`;
  
    fetch(url)
      .then((response) => response.json())
      .then((weather) => {
        console.log(weather);
  
        if (!weather || weather.length === 0) {
          alert("天気情報が取得できませんでした。");
          return;
        }
  
        const timeSeries = weather[0]?.timeSeries;
  
        if (!timeSeries || timeSeries.length < 3) {
          alert("十分な天気情報が含まれていません。");
          return;
        }
  
        const areaData = timeSeries[0]?.areas?.[0];
        const tempData = timeSeries[2]?.areas?.[0]; 
        const timeDefines = timeSeries[0]?.timeDefines;
  
        if (!areaData || !tempData) {
          alert("天気情報が不足しています。");
          return;
        }
  
        document.getElementById("publishingOffice").lastElementChild.textContent =
          weather[0]?.publishingOffice || "情報なし";
  
        document.getElementById("reportDatetime").lastElementChild.textContent =
          weather[0]?.reportDatetime || "情報なし";
  
        document.getElementById("targetArea").lastElementChild.textContent =
          areaData?.area?.name || "情報なし";
  
        document.getElementById("today").lastElementChild.textContent =
          areaData?.weathers?.[0] || "情報なし";
  
        document.getElementById("todayHighTemperature").lastElementChild.textContent =
          tempData?.temps?.[0] || "情報なし";
  
        document.getElementById("todayLowTemperature").lastElementChild.textContent =
          tempData?.temps?.[1] || "情報なし";
  
        document.getElementById("tomorrow").lastElementChild.textContent =
          areaData?.weathers?.[1] || "情報なし";
  
        document.getElementById("dayAfterTomorrow").lastElementChild.textContent =
          areaData?.weathers?.[2] || "情報なし";
      })
      .catch((error) => {
        console.error("エラーが発生しました:", error);
        alert("天気情報の取得に失敗しました。");
      });
  });
  