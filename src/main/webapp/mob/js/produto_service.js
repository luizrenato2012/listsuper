var modulo = angular.module('ProdutoServiceMdl',[]);

modulo.service('ProdutoService', [ function() {
	this.produtos = [];
	this.produtosSelecionados = [];
	
	//SQL pesquisa todos os produtos do backend
	this.init = function() {
		this.produtos.push({id: 1, descricao:'produto 1',selecionado: false});
		this.produtos.push({id: 2, descricao:'produto 2',selecionado: false});
		this.produtos.push({id: 3, descricao:'produto 3',selecionado: false});
		this.produtos.push({id: 4, descricao:'produto 4',selecionado: false});
		this.produtos.push({id: 5, descricao:'produto 5',selecionado: false});
	}
	
	this.init();
	
	this.getProdutos = function() {
		return this.produtos;
	}
	

}]);