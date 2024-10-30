const startTimeSelect = document.getElementById("start-time");
const endTimeSelect = document.getElementById("end-time");

let startHour = 8;
let endHour = 17;

populateDropDown(startTimeSelect, 8);
populateDropDown(endTimeSelect, 17);


function populateDropDown(select, selected) {
    for (let i = 0; i < 24; i++) {
        let option = document.createElement("option");
        let hour = i % 12 === 0 ? 12 : i % 12;
        hour += ':00';
        hour += i < 12 ? 'AM' : 'PM'
        option.text = hour;
        option.value = i;
        if (i === selected) {
            option.selected = true;
        }
        select.appendChild(option);
    }
}

function createTimeTable() {
    const timeTable = document.getElementById("timeTable");

    let tableHTML = '<table><thead><tr><th></th>';
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

    days.forEach(day => {
        tableHTML += `<th class="day-header"> ${day} </th>`
    })

    tableHTML += "</tr></thead><tbody>";

    for (let i = startHour; i <= endHour; i++) {
        let hour = i % 12 === 0 ? 12 : i % 12;
        hour += ':00';
        hour += i < 12 ? 'AM' : 'PM'

        tableHTML += `<tr> <td class="time-lable"> ${hour} </td>`
        days.forEach(day => {
            tableHTML += `<td class="time-slot" 
        onClick=toggleTimeSlot(this)
        data-day="${day}"
        data-time="${hour}">
        </td>`
        })
    }

    tableHTML += "</tbody></table>"
    timeTable.innerHTML = tableHTML;

}

createTimeTable();

startTimeSelect.addEventListener('change', ()=> {
    startHour = parseInt(this.value);
})

endTimeSelect.addEventListener('change', ()=> {
    endHour = parseInt(this.value);
})

const selectedTimeSlots = new Set();

function toggleTimeSlot(tdElem) {
    const timeSlotId = `${tdElem.dataset.day}-${tdElem.dataset.time}`
    if (selectedTimeSlots.has(timeSlotId)) {
        selectedTimeSlots.delete(timeSlotId);
        tdElem.classList.remove("selected");
    }
    else {
        selectedTimeSlots.add(timeSlotId);
        tdElem.classList.add("selected");
    }

}

document.getElementById("submitMeeting").addEventListener("click", async () => {
    const userName = document.getElementById("user-name").value;
    const eventName = document.getElementById("event-name").value;
    if (!userName || !eventName) {
        alert("Enter name or event ");
        return
    }
    else {
        const bodyPayload = {
            userName: userName,
            eventName: eventName,
            slots: [...selectedTimeSlots]
        }

        console.log(bodyPayload.userName);
        console.log(bodyPayload.eventName);
        console.log(bodyPayload.slots);


        
        const API_URL = "https://jsonplaceholder.typicode.com/posts"
        
        const response =  await fetch(API_URL, {
            method: 'POST',
            body:
            JSON.stringify(bodyPayload),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        console.log(`we got this response from the server: ${JSON.stringify(data)}`);
        
    }
})




