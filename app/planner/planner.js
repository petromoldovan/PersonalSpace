angular.module('app.planner', [
        'ui.router',
        'ui.bootstrap',
        'services.crud',
        'ngAnimate'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('planner', {
            url: '/planner',
            views: {
                "main": {
                    controller: 'plannerCtrl',
                    templateUrl: 'app/planner/planner.tpl.html'
                }
            },
            data: {pageTitle: 'planner'}
        })
    })

    .controller("plannerCtrl", function contactCtrl($scope, crudService){

        $scope.newTask="";
        $scope.numberOfTasks=0;

        //set current date
        $scope.currentDate=new Date().toJSON().slice(0,10);
        $scope.currentDate=$scope.currentDate.split("-").join("/");


        //get tasks
        crudService.getTasks().success(function(data){
            $scope.listItems=data;
            $scope.numberOfTasks=$scope.listItems.length;
            })
            .error(function(){
                alert("error on download!")
            });

        //add task
        $scope.addToList=function(){
            if( $scope.newTask!=="") {
                $scope.listItems.push({"title": $scope.newTask, "done": false})
                $scope.numberOfTasks++;

                /*
                 crudService.newTask($scope.newTask).then(function (resp){                <==example request
                 //future code
                 })
                */

                $scope.newTask = "";
            }
        };

        //update task
        $scope.updateList=function(id,task){
            console.log("saved")
            /*
             crudService.updateTask(id,task).then(function (resp){                     <==example request
             //future code
             })
             */

        };

        //remove task
        $scope.deleteItem=function(id){
            $scope.listItems.splice(id,1);
            $scope.numberOfTasks--

            /*
            crudService.deleteTask(id).then(function (resp){                             <==example request
                //future code
            })
            */
        }

    });
