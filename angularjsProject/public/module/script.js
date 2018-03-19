


var app=angular.module('todoApp', ['ui.router']);//'ui-router'
  app.config(function($stateProvider){
	$stateProvider
                .state("home",{
	             	  url:"/home",
	             	  templateurl:"home.html",
                  controller:'CalcController'
	             })
              .state("getasew",{
                     url:"/getasew",
                     template:"hello............"
                 });
});
 app.controller('TodoListController', function($scope,$http) {

    $scope.todos ={};
    
    $scope.todoList=function(){
          $http.get('/list').then(function(res){
          	 $scope.todos=res.data;
             //console.log(res.data);
          },function(err){
          	  console.log('errtodoList');
          });
    };
    $scope.todoList();
    $scope.addTodo = function() {
    	$http.post('/addtodoList',{name:$scope.todo.name, done:false}).then(function(res){
    		//console.log('addTodo');
    	 },function(err){
    		//console.log('erraddTodo');
    	});
      $scope.todo.name = '';
      $scope.todoList();
      $scope.remaining();
    };
 
    $scope.remaining = function() {
           $http.get('/remain').then(function(res){
            $scope.remain=res.data.length;
         // console.log(res.data);   
         });
       };
    $scope.remaining();
    $scope.archive = function() {
     $http.get('/archive').then(function(res){
         $scope.todos=res.data;
       //console.log('archive');
     });
    };
    $scope.delete=function(){
         $http.delete('/delete').then(function(res){
          //console.log('delete');	 
         });  
         $scope.todoList();
         $scope.remaining();
    };
    $scope.don=function(id,data){
          $http.put('/done/'+id,data).then(function(res){
    		//console.log(data.done);
    	});
     $scope.remaining();
    
    };
   $scope.checkAll=function(){
       if ($scope.selectedAll) {
          $http.get('/checkAll').then(function(res){
        //console.log(data.done);
      });
       }else{
        $http.get('/uncheckAll').then(function(res){
        //console.log(data.done);
      });
       }   
     $scope.remaining();
    $scope.todoList();
    };
    
    $scope.edit=function(id){
      $http.get('/edit/'+id).then(function(res){
      	$scope.todo=res.data;
         // console.log(res.data);	 
         }); 

 
    };
    $scope.update=function(){
    	if ($scope.todo) {
    	// console.log($scope.todo);
    	$http.put('/update/'+$scope.todo._id,$scope.todo).then(function(res){
           console.log('update');

    	});
    
      }else{
      	console.log('first click edit boto');
      }	
      
     $scope.todoList();

    };
  });
app.factory('MathService', function() {
    var factory1 = {};
   factory1.multiply = function(a, b) {
      return a * b
    }
    return factory1;
 });
app.service('CalcService', function(MathService){
    this.square = function(a) {
    return MathService.multiply(a,a);
    }
 });
app.controller('CalcController', function($scope, CalcService) {
        $scope.square=function(){
          $scope.result = CalcService.square($scope.number);
        }
    
 });