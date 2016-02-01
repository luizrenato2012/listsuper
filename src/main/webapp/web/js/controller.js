var testeMod = angular.module('testeApp', []);

testeMod.controller('ProdutoController', ['$scope', function ($scope) {
	$scope.mensagem='Funcionou';
}]);