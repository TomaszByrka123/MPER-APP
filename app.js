let socket = new WebSocket("ws://192.168.8.107:8765");
let do_raspberry = [0, 0, 0, 0, 0];

// Funkcja do otwierania i zamykania zakładek
function openTab(event, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}


// Inicjalizacja joysticka za pomocą nipplejs
let joystickManager = nipplejs.create({
    zone: document.getElementById('joystick-container'),  // Kontener joysticka
    mode: 'static',  // Statyczny joystick
    position: { left: '50%', top: '50%' },  // Pozycja joysticka
    color: 'red',  // Kolor joysticka
    size: 150  // Rozmiar joysticka
});

// Obsługa ruchu joysticka
joystickManager.on('move', function (evt, data) {
  if (data.direction) {
      let normalizedX = data.vector.x.toFixed(2);  // Odczyt X z danych wektora
      let normalizedY = (-data.vector.y).toFixed(2);  // Odczyt Y (odwrócony) z danych wektora

      // Aktualizacja pierwszych dwóch wartości w ramce do_raspberry
      do_raspberry[0] = parseFloat(normalizedX);
      do_raspberry[1] = parseFloat(normalizedY);
  }
});

// Reset joysticka po zakończeniu ruchu
joystickManager.on('end', function () {
    do_raspberry[0] = 0;
    do_raspberry[1] = 0;
});


function sendDataToRaspberry() {
    if (socket.readyState === WebSocket.OPEN) {
        // Tworzenie obiektu danych do wysłania
        let dataToSend = {};

        // Pętla do tworzenia właściwości obiektu na podstawie elementów tablicy do_raspberry
        do_raspberry.forEach((value, index) => {
            dataToSend[`value${index + 1}`] = value;
        });

        // Konwersja obiektu do JSON i wysłanie przez WebSocket
        let jsonData = JSON.stringify(dataToSend);
        socket.send(jsonData);
        console.log("Wysłano dane do Raspberry Pi:", jsonData);
    }
}

setInterval(sendDataToRaspberry, 400);


// Obsługa WebSocket
socket.onopen = function () {
    console.log("Połączono z Raspberry Pi");
};

socket.onmessage = function (event) {
    // Odbiór danych z serwera (ramka danych)
    let serverData = JSON.parse(event.data);
    console.log("Otrzymano dane z serwera:", serverData);
};

socket.onclose = function () {
    console.log("Rozłączono z Raspberry Pi");
};

socket.onerror = function (error) {
    console.error("Błąd WebSocket:", error);
};
