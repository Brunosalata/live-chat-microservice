const stompClient = new StompJs.Client({
    brokerURL: 'ws://' + window.location.host + '/live-chat'
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topics/live-chat', (message) => {
        updateLiveChat(JSON.parse(message.body).content);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#message").keypress(function(event) {
        if (event.which === 13) { // 13 é o código da tecla Enter
            event.preventDefault(); // evita o envio do formulário
            $("#send").click(); // aciona o botão de envio
        }
    });
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    if($("#user").val()!="" && $("#message").val()!=""){
        stompClient.publish({
            destination: "/app/new-message",
            body: JSON.stringify({'user': $("#user").val(), 'message': $("#message").val()})
        });
        $("#message").val("");
    }
}

function updateLiveChat(message) {
    $("#live-chat").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendMessage());
});