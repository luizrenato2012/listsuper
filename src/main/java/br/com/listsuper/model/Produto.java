package br.com.listsuper.model;

import java.io.Serializable;

public class Produto implements Serializable {

	private static final long serialVersionUID = 5057011256954590345L;
	
	private Integer id;
	
	private String descricao;
	
	public Produto(Integer id, String descricao) {
		super();
		this.id = id;
		this.descricao = descricao;
	}

	public Produto(String descricao) {
		super();
		this.descricao = descricao;
	}

	public Produto() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((descricao == null) ? 0 : descricao.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Produto other = (Produto) obj;
		if (descricao == null) {
			if (other.descricao != null)
				return false;
		} else if (!descricao.equals(other.descricao))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Produto [id=" + id + ", descricao=" + descricao + "]";
	}
	

}
