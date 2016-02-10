var modulo = angular.module('ListaServiceMdl',[]);

modulo.service('ListaService',['$location', function($location) {
	this.listas = [];
	this.listaAtual={};
	
	this.init = function() {
		// SQL busca listas no banco e acrescenta a nova
		this.listas.push({descricao:"Nova", id: null, dataCriacao: new Date(), produtos: []});
	}
	
	this.init();
	
	this.seleciona= function(lista) {
		this.listaAtual = lista;
		$location.path('cadastro_lista');
	}
	
	this.insere = function(lista) {
		this.listas.push(lista);
	}
	
	this.exclui = function(lista) {
		this.listas.pop();
	}
	
	this.getListas = function() {
		return this.listas;
	}
	
	this.getListaAtual = function() {
		return this.listaAtual;
	}
	
	/** implementacao especifica p/ objetos em memoria */
	this.adicionaSelecionados = function(lista) {
		var i ;
		var produtoAtual={};
		var produtoInclusao = {};
		
		
		var totalProdutosInclusao = lista.length;
		var totalProdutosAtuais = this.listaAtual.produtos.length;
		
		if ( totalProdutosAtuais > 0) {
			for(i=0; i < totalProdutosInclusao; i++) {
				produtoInclusao = lista[i];
				if (!this.jaExiste(produtoInclusao)) {
					this.listaAtual.produtos.push(produtoInclusao);
				}
			}
		} else {
			this.listaAtual.produtos = lista;
		}
		this.retiraSelecao();
	}
	
	this.jaExiste = function(produto) {
		var j;
		var totalProdutosAtuais = this.listaAtual.produtos.length;
		
		for(j=0; j < totalProdutosAtuais; j++){
			produtoAtual = this.listaAtual.produtos[j];
			if ( produto.id == produtoAtual.id){
				return true;
			}
		}
		return false;
	}
	
	this.retiraSelecao = function() {
		var i;
		var produto = {};
		for(i=0; i < this.listaAtual.produtos.length; i++) {
			produto = this.listaAtual.produtos[i]; 
			produto.selecionado = false;
			produto.exclui = false;
		}
	}
	
/*	this.findByDescricao = function (descricao) {
		var i;
		var produto = {};
		var listaProdutos = [];
		descricao = descricao.toUpperCase();
		
		for(i=0; i < this.listaAtual.produtos.length; i++) {
			produto = this.listaAtual.produtos[i]; 
			if (produto.descricao.indexOf(descricao)!= -1 ) {
				listaProdutos.push(produto);
			}
		}
		return listaProdutos;
	}   */
	
}]);