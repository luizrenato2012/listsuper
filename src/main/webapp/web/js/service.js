var serviceModule = angular.module('ServiceModule',[]);

serviceModule.service('ProdutoService',['$http','$q', function($http, $q) {

	//var defer = $d.defer();
	this.recebe = function() {
		var defer = $q.defer();
		$http({
			method: 'GET',
			url: 'http://localhost:8080/listsuper/rest/produtos/list',
			headers: {'content-type':'application/json'}
		}).success( function(data,status,headers, config) {
			defer.resolve(data);
			console.log(data);
		}).error(function(data,status,headers, config) {
			defer.reject(data);
			console.error('erro ao receber ' + data);
		});
		return defer.promise;
	}

	this.grava = function(descricao) {
		var defer = $q.defer();
		//success e error estao depreciados, usar then
		$http({
			method: 'POST',
			url: 'http://localhost:8080/listsuper/rest/produtos/insert',
			params: {'descricao': descricao},	
			headers: {'content-type': 'application/x-www-form-urlencoded'},
		}).then(
				function(data,status,headers, config) {
					defer.resolve(data);
					console.log(data);
				},
				function(data,status,headers, config) {
					defer.reject(data);
					console.error('erro ao gravar ' + data);
				}
		
		);
		return defer.promise;
	}
}]);