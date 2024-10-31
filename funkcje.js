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

function sendDataToRaspberry(data){
    console.log(data);
    if (socket.readyState === WebSocket.OPEN) {
        // Tworzenie obiektu danych do wysłania
        let dataToSend = {};

        // Pętla do tworzenia właściwości obiektu na podstawie elementów tablicy do_raspberry
        data.forEach((value, index) => {
            dataToSend[`value${index + 1}`] = value;
        });

        // Konwersja obiektu do JSON i wysłanie przez WebSocket
        let jsonData = JSON.stringify(dataToSend);
        socket.send(jsonData);
        console.log("Wysłano dane do Raspberry Pi:", jsonData);
    }
}