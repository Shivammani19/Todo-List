$(() => {
  let inpNewTask = $('#inpNewTask')

  let tasks = []
  if (localStorage.list) {
    tasks = JSON.parse(localStorage.list)
  }

  function refreshList() {
    localStorage.list = JSON.stringify(tasks)
    $('#taskList').empty()
    for (let i in tasks) {
      let task = tasks[i]

      $('#taskList').append(
        $('<li>')
        .attr('class', "list-group-item")
        .append(
          $('<div>')
          .attr('class', task.done ? "row done" : "row")
          .append(
            $('<span>')
            .attr('class', "col py-1")
            .text(task.name)
          )
          .append(
            $('<button>')
            .text(task.done ? "❌" : "✔️" )
            .attr('class', "btn btn-outline-success col-0 mx-0")
            .click(function () {
              task.done = !task.done
              refreshList()
            })
          )
          .append(
            $('<button>')
            .html('<i class="fas fa-trash"></i>')
            .attr('class',"btn btn-outline-dark col-0 mx-0")
            .click(function () {
              tasks.splice(i, 1)
              refreshList()
            })
          )
          .append(
            $('<button>')
            .html('<i class="fas fa-chevron-circle-up"></i>')
            .attr("class","btn btn-outline-danger col-0  mx-0")
            .click(function()
            {
              if(i!==0)
              {
                tasks.splice(i-1,1,tasks.splice(i,1,tasks[i-1])[0])
                refreshList()
              }
            }
            )
          )
          .append(
            $('<button>')
            .html('<i class="fas fa-chevron-circle-down"></i>')
            .attr("class","btn btn-outline-danger col-0  mx-0")
            .click(function()
            {  
              tasks.splice(i+1,1,tasks.splice(i,1,tasks[i+1])[0])
                refreshList()

            }
                
            
            
            )
          )
        )
      )
    }
  }

  refreshList()

  function sortList() {
    tasks.sort(function (a, b) {
      return a.done - b.done
    })
    refreshList()
  }

  function clearList() {
    tasks = tasks.filter(function (t) {
      return !t.done
    })
    refreshList()
  }

  function addTask() {
    console.log(tasks)
    let taskName = inpNewTask.val()
    tasks.push({
      name: taskName,
      done: false
    })
    inpNewTask.val('')
    refreshList()
  }

  $('#btnAdd').click(function () {
    addTask()
  })

  inpNewTask.keyup(function (ev) {
    if (ev.keyCode == 13) {
      addTask()
    }
  })

  $('#btnSort').click(function () {
    sortList()
  })

  $('#btnClear').click(function () {
    clearList()
  })



})
