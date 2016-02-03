var serviceModule = angular.module('ServiceModule',[]);

serviceModule.service('ProdutoService',['$http','$q', function($http, $q) {

	//var defer = $d.defer();
	this.lista = function() {
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

	this.grava = function(produto) {
		var defer = $q.defer();
		//success e error estao depreciados, usar then
		$http.post('../rest/produtos/save', produto).then(
				//status,headers, config sao fornecidos por data
				function(data) {
					defer.resolve(data.data);
					console.log(data);
				},
				function(data) {
					defer.reject("Erro ao gravar ");
					console.error('erro ao gravar ' + data);
				}
		
		);
		return defer.promise;
	}
	
	this.pesquisa = function(descricao) {
		var defer = $q.defer();
		$http.get('../rest/produtos/query/descricao/'+descricao).then(
				function(data) {
					defer.resolve(data.data);
					console.log(data);
				},
				function(data) {
					defer.reject('Erro ao pesquisar');
					console.error('Erro ao pesquisar ' + data)
				}
		);
		
		return defer.promise;
	}
	
	this.exclui = function(id) {
		var defer = $q.defer();
		$http.delete('../rest/produtos/delete/'+id).then(
				function(data) {
					defer.resolve(data.data);
					console.log(data);
				},
				function(data) {
					defer.reject('Erro ao excluir');
					console.error('Erro ao exclui ' + data)
				}
		);
		
		return defer.promise;
	}
}]);