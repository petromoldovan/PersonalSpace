angular.module('services.crud', [])
    .factory('crudService', function ($http) {

        api_url = "assets/data/";

        return {
            getTasks: function()
            {
                return $http.get(api_url+'apiData.json');
            },

            //example request
            updateTask:function(taskID,newObject){
                return $http.put(api_url+"some/link"+taskID, newObject);                 //update url
            },

            //example request
            newTask: function(task){
                return $http.post(api_url + "some/link" ,task );                         //update url
            },

            //example request
            deleteTask: function(taskID)
            {
                return $http.delete(api_url + 'organisation/tasks/'+taskID);             //update url
            }
        }
    });
