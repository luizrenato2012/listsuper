var testeMod = angular.module('testeApp', ['ServiceModule']);

testeMod.controller('ProdutoController', ['$scope','$http', '$q','ProdutoService', function ($scope, $http, $q, ProdutoService) {
	$scope.msg_info='';
	$scope.msg_erro='';
	$scope.produtos=[];
	$scope.produto={};
	
	$scope.edita = function(produto) {
		$scope.produto = produto;
	}

	/** recebe produtos */
	$scope.recebe = function() {
		ProdutoService.recebe().then(
				function(data) {
					console.log(data);
					$scope.msg_info='Produtos recebidos com sucesso.';
					$scope.msg_erro='';
				}, function(error) {
					console.error('Erro ao receber produtos '+ error);
					$scope.msg_info='';
					$scope.msg_erro='Erro ao receber produtos ';
				}	
		);
	}

	/** insere produto*/
	$scope.grava = function() {
		console.log('Gravando ')+ $scope.produto.descricao;
		ProdutoService.grava($scope.produto).then(
				function(data) {
					console.log(data);
					if (data.tipo=='OK') {
						$scope.msg_info=data.descricao;
						$scope.msg_erro='';
						$scope.produto={};
					} else {
						if(data.tipo=='ERRO_SISTEMA') {
							$scope.msg_erro = 'Erro no processamento';
						} else {
							$scope.msg_erro = data.descricao;
						}
						$scope.msg_info='';
					}
				},
				function(error) {
					console.error('Erro ao gravar produtos '+ error);
					$scope.msg_info='';
					$scope.msg_erro = 'Erro no processamento';
				}
		);

		$scope.limpa = function() {
			$scope.msg_info='';
			$scope.msg_erro = '';
		}
	}

	$scope.pesquisa = function(descricao){
		ProdutoService.pesquisa(descricao).then(
				function(data){ //callback success
					$scope.produtos = data;
					$scope.msg_error='';
					$scope.msg_info='Encontrados registros '+ $scope.produtos.length;
				},
				function(data){ //callback error
					$scope.msg_error='Erro ao pesquisar';
					$scope.msg_info='';
				}
		);
	}


}]);