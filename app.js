let socket = new WebSocket("ws://10.42.0.1:8765");
let do_raspberry = [100, 100, 0, 0, 0, 0, 0];
let od_raspberry = [];

//0 - 1 moc silnika (lewy, prawy) (0, 200)
//2 - 6 dane manipulatora 

setInterval(() => sendDataToRaspberry(do_raspberry), 400);


// Obsługa WebSocket
socket.onopen = function () {
    console.log("Połączono z Raspberry Pi");
};

socket.onmessage = function (event) {
    // Odbiór danych z serwera (ramka danych)
    let od_raspberry= JSON.parse(event.data);
    console.log("Otrzymano dane z serwera:", od_raspberry);
};

socket.onclose = function () {
    console.log("Rozłączono z Raspberry Pi");
};

socket.onerror = function (error) {
    console.error("Błąd WebSocket:", error);
};
