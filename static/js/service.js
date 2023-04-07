function updateStatus(serviceName, elementId) {
    fetch(`/status/${serviceName}`)
        .then(response => response.json())
        .then(data => {
            const statusSpan = document.getElementById(elementId);
            if (data.status.includes("active (running)")) {
                statusSpan.innerText = "Running";
                statusSpan.style.color = "green";
            } else if (data.status.includes("inactive (dead)")) {
                statusSpan.innerText = "Stopped";
                statusSpan.style.color = "red";
            } else {
                statusSpan.innerText = "Error";
                statusSpan.style.color = "orange";
            }
        })
        .catch(error => {
            const statusSpan = document.getElementById(elementId);
            statusSpan.innerText = "Error";
            statusSpan.style.color = "orange";
        });
}

function stopService(serviceName) {
    const data = new FormData();
    data.append("action", "stop");
    data.append("service", serviceName);

    fetch("/action/stop", {
        method: "POST",
        body: data
    })
        .then(() => {
            updateStatus(serviceName, `status-${serviceName}`);
        })
        .catch(error => {
            console.log(error);
        });
}

function restartService(serviceName) {
    const data = new FormData();
    data.append("action", "restart");
    data.append("service", serviceName);

    fetch(`/action/restart`, {
        method: "POST",
        body: data
    })
        .then(() => {
            updateStatus(serviceName, `status-${serviceName}`);
        })
        .catch(error => {
            console.log(error);
        });
}

updateStatus("admision", "status-admision");
updateStatus("cc2000", "status-cc2000");
updateStatus("comedor", "status-comedor");
updateStatus("dacepro", "status-dacepro");
updateStatus("dacepto", "status-dacepto");
updateStatus("diplomad", "status-diplomad");
updateStatus("fdocente", "status-fdocente");
updateStatus("helpdesk", "status-helpdesk");
updateStatus("ningreso", "status-ningreso");
updateStatus("postgrad", "status-postgrad");
updateStatus("solic", "status-solic");
updateStatus("solicita", "status-solicita");
updateStatus("tgpp", "status-tgpp");
updateStatus("userdoc", "status-userdoc");
updateStatus("usersdb", "status-usersdb");
updateStatus("usuarios", "status-usuarios");
