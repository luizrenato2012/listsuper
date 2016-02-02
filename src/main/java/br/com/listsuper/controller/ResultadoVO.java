package br.com.listsuper.controller;

public class ResultadoVO {
	
	private String descricao;
	
	private TipoResultado tipo;

	public ResultadoVO(String descricao, TipoResultado tipo) {
		super();
		this.descricao = descricao;
		this.tipo = tipo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public TipoResultado getTipo() {
		return tipo;
	}

	public void setTipo(TipoResultado tipo) {
		this.tipo = tipo;
	}
	

}

enum TipoResultado {
	OK,ERRO_SISTEMA, ERRO_NEGOCIO;
}
