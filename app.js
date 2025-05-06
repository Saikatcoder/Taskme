const taskList  = document.getElementById('task-list')
window.onload  = ()=>{
    fetchtask()
}
const openDialog = () => {
    Swal.fire({
        html:` 
    <div class="text-left space-y-8">
    <h1 class="text-xl font-semibold text-black">Add a New Task</h1>
    <form action="" onsubmit="createTask(event)" class = "space-y-5">
        <input required type="text" id="task" class="px-3 py-2 border border-gray-300 w-full rounded" placeholder="Enter task name">
        <input required type="date" id="date" class="px-3 py-2 border border-gray-300 w-full rounded">
        <button class="bg-indigo-500 px-6 py-2 rounded mt-4 text-white">
            Add
        </button>
        </form>
        </div>
        `,
        showConfirmButton: false
    })
}

function createTask(e){
    e.preventDefault()
    const taskInput = document.getElementById('task');
    const dateInput = document.getElementById('date');

    const task = taskInput.value.trim();
    const key =  Date.now();

    const date = dateInput.value

    // create payload for maultiple task fild , if you have single task then you pass single apyload but , when you have multiple task , create payload object , and convert this object using json.stringify method.
    const payload =JSON.stringify({
        task: task,
        date : date,
        status: "sedule"
    })
    localStorage.setItem(key,payload);
     Swal.fire({
        icon:"success",
        title:"Task Created !"
    }).then(()=>{
        location.href = location.href
    })
}


 function fetchtask() {
    const keys = Object.keys(localStorage);
    let snNumber =0
    for (let element of keys) {
        const data =JSON.parse( localStorage.getItem(element))
        
        const ui = ` <tr class="border-b border-[#474af1]">
                  <td class="p-3">${snNumber}</td>
                  <td class="p-3">${data.task[0].toUpperCase()}${data.task.slice(1)}</td>
                  <td class="p-3">${moment(data.date).format('DD MMM YYYY')}</td>
                  <td class="p-3 p-1">
                        <select  class ="border border-gray-300 rounded p-1" onchange="updateStatus(event,${element})">
                        <option value="scheduled" ${data.status === 'scheduled' ? 'selected' : ''}>Scheduled</option>
                        <option value="inprogress" ${data.status === 'inprogress' ? 'selected' : ''}>Inprogress</option>
                        <option value="cancled" ${data.status === 'cancled' ? 'selected' : ''}>Cancled</option>
                        <option value="complected" ${data.status === 'complected' ? 'selected' : ''}>Complected</option>
                        </select>
                  </td>
                  <td class="p-3">
                    <div class="flex items-center gap-2">
                      <button class="text-green-500 hover:text-green-700 w-8 h-8 flex justify-center items-center"  onclick="editTitle('${data.task}','${element}','${data.date}')">
                        <i class="fa-solid fa-pen"></i>
                      </button>
                      <button class="text-red-500 hover:scale-110 w-8 h-8 flex justify-center items-center"  onclick="deleteTask('${element}')">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                `
        taskList.innerHTML += ui;
        snNumber ++
    }
}

function deleteTask(key) {
    localStorage.removeItem(key);
    Swal.fire({
        icon: "warning", 
        title: "Task Deleted!"
    }).then(() => {
        location.href = location.href;
    });
}


function editTitle(task,element,date){
    // const formattedDate = new Date(date).toISOString().split('T')[0];
    Swal.fire({
        html:` 
    <div class="text-left space-y-8">
    <h1 class="text-xl font-semibold text-black">Add a New Task</h1>
    <form action="" onsubmit="saveTask(event,${element})" class = "space-y-5" >
        <input value="${task}" type="text" id="edittaskInput" class="px-3 py-2 border-gray-300 w-full rounded" placeholder="Enter task name">
        <input  value="${date}" type="date" id="edited-date" class="px-3 py-2 border border-gray-300 w-full rounded">
        <button class="bg-indigo-500 px-6 py-2 rounded mt-4 text-white">
            Save
        </button>
        </form>
        </div>
        `,
        showConfirmButton: false
    })
}

function saveTask(e,element){
    e.preventDefault();
    const edittaskInput = document.getElementById('edittaskInput')
    const editedDateInput = document.getElementById('edited-date');
    const editedDate = editedDateInput.value
    const edittask = edittaskInput.value.trim();
    const payload = Json.stringify({
        task:edittask,
        date: editedDate
    })
    localStorage.setItem(element, payload);
     Swal.fire({
        icon: 'Success',
        title: 'Task Saved !'
    }).title(()=>{
        location.href = location.href
    })

}



function updateStatus(even,element){
    const status = even.target.value;
  const payload =JSON.parse(localStorage.getItem(element))
  payload.status = status;
    localStorage.setItem(element,JSON.stringify(payload));
    Swal.fire({
        icon: "success", 
        title: "Status Upadated",
        text: status.toUpperCase()
    })
  
}


