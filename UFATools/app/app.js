var application = require("application");
var viewsModule = require("./utils/views");
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

application.resources ={
    formatDate: formatDate,
    formatTime: formatTime,

    formatReminder: function (task) {
        return "10 min before";
    },
    formatDueDate: function (dueDate) {
        return formatDate(dueDate) + ", " + formatTime(dueDate);
    },
    formatTasksCount: function (tasksCount) {
        if (tasksCount === undefined || isNaN(tasksCount)) {
            return "";
        }
        if (tasksCount === 0 || tasksCount > 1) {
            return tasksCount + " tasks";
        }
        return "1 task";
    },
    formatDateForPicker: function (date) {
        if (date) {
            return formatDate(date);
        }
        return "Select date";
    },
    formatTimeForPicker: function (date) {
        if (date) {
            return formatTime(date);
        }
        return "Select time";
    },
    getProjectNameForProjectsPicker: function (project) {
        if (project) {
            return project.Name;
        }
        return "Select project";
    },
    getProjectName: function (project, projectId) {
        if (projectId) {
            if (project) {
                return project.Name;
            }
            else {
                return "";
            }
        }
        return "Default";
    },
    getStatusImage: function (task) {
        return task.IsCompleted ? "res://ic_checkmark_checked" : "res://ic_checkmark";
    },
    getStatusFab: function (task) {
        return task.IsCompleted ? "res://fab_completed" : "res://fab_complete";
    }
};
}

function formatDate(date) {
    return date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
}
function formatTime(date) {
    var minutes = date.getMinutes().toString();
    if (minutes.length === 1) {
        minutes = "0" + date.getMinutes();
    }
    return date.getHours() + ":" + minutes;
}

application.onLaunch = function(context){
    var serviceModule = require("./utils/service");
    if (serviceModule.service.isAuthenticated){
       application.mainModule = viewsModule.Views.main;
    }
    else{
        application.mainModule = viewsModule.Views.login;
    }
};
application.start();
