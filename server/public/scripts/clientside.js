$(document).ready(function() {
    ////=========   initial GET function         ============////
    //getFunction that contains ajax get request and appends DOM
    getTask();


    ////=====================////

    ////=========   event listeners         ============////
    $("#submitbutton").on("click", submitTask);
    // $('#').on('click', function);
    // $('#').on('click', function);
    ////=====================////
});

//=======vvv   additional functions vvv=======//

function getTask() {
    $.ajax({
        type: "GET",
        url: "/tasks",
        success: function (taskObject) {
            console.log("GET /works");
            taskObject.forEach(function (list) {
                var taskArray = [];
                taskArray.push({
                    id: list.id,
                    name: list.list_name,
                    description: list.list_description,
                    status: list.list_status

                });
                console.log(taskArray);
                console.log(taskArray[0].id);
                console.log(taskArray[0].name);
                console.log(taskArray[0].description);
                console.log(taskArray[0].status);
                //still won't append to DOM, not sure why//
                $("#taskcontainer").append('<div class = "taskappend">' +
                   taskArray[0].name + " " + taskArray[0].description + '</div>');
                //note to self -- review more closely
                console.log(taskArray);
                console.log(taskArray[0].id);
                console.log(taskArray[0].name);
                console.log(taskArray[0].description);
                console.log(taskArray[0].status);
                console.log(taskObject);
                console.log(list.id);

            });
        },
        error: function () {
            console.log("GET /did not work");
        }
    });
}

function submitTask() {
  event.preventDefault();

  // var name = $( ".ownerList option:selected" ).text();
  // console.log('name: ', name);

  var task = {};
  $.each($('#taskForm').serializeArray(), function (i, field) {
    task[field.name] = field.value;  //syntax was wrong
  });
  console.log("TASK:", task);

  //task.  = name;

  $.ajax({
      type: "POST",
      url: "/tasks",
      data: task,
      success: function() {
          console.log("POST /tasks Succeded.");
          getTask();
      },
      error: function(response) {
          console.log("POST /tasks failed");
      },
  });

}
