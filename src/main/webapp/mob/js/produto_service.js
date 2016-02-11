var modulo = angular.module('ProdutoServiceMdl',[]);

modulo.service('ProdutoService', [ function() {
	this.produtos = [];
	this.produtosSelecionados = [];
	
	//SQL pesquisa todos os produtos do backend
	this.init = function() {
		this.produtos.push({id: 1, descricao:'PRODUTO 1',selecionado: false});
		this.produtos.push({id: 2, descricao:'PRODUTO 2',selecionado: false});
		this.produtos.push({id: 3, descricao:'PRODUTO 3',selecionado: false});
		this.produtos.push({id: 4, descricao:'PRODUTO 4',selecionado: false});
		this.produtos.push({id: 5, descricao:'PRODUTO 5',selecionado: false});
	}
	
	this.init();
	
	this.getProdutos = function() {
		return this.produtos;
	}
	
	this.findByDescricao = function (descricao) {
		var i;
		var produto = {};
		var listaProdutos = [];
		descricao = descricao.toUpperCase();
		
		for(i=0; i < this.produtos.length; i++) {
			produto = this.produtos[i]; 
			if (produto.descricao.indexOf(descricao)!= -1 ) {
				listaProdutos.push(produto);
			}
		}
		return listaProdutos;
	}
	
	// substituir p/ implementacao SQL
	this.insert = function(descricao)  {
		descricao = descricao.toUpperCase();
		var proxId = this.produtos.length+1;
		this.produtos.push({id: proxId, descricao: descricao, selecionado: false});
	}
	

}]);