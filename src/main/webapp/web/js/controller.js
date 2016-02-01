var testeMod = angular.module('testeApp', ['ServiceModule']);

testeMod.controller('ProdutoController', ['$scope','$http', '$q','ProdutoService', function ($scope, $http, $q, ProdutoService) {
	$scope.mensagem='Funcionou';
	$scope.descricao = '';
	
	/** recebe produtos */
	$scope.recebe = function() {
		ProdutoService.recebe().then(
			function(data) {
				console.log(data);
				$scope.mensagem='Produtos recebidos com sucesso.';
			}, function(error) {
				console.erro('Erro ao receber produtos '+ error);
				$scope.mensagem='Erro ao receber produtos ';
			}	
		);
	}
	
	/** insere produto*/
	$scope.grava = function() {
		console.log('Gravando ')+ $scope.descricao;
		ProdutoService.grava($scope.descricao).then(
			function(data) {
				console.log(data);
				$scope.mensagem='Produtos gravado com sucesso.';
			},
			function(error) {
				console.erro('Erro ao gravar produtos '+ error);
				$scope.mensagem='Erro ao gravar produtos ';
			}
		);
		$scope.descricao='';
	}
}]);