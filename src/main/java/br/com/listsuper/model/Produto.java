package br.com.listsuper.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(schema="lista", name="produto")
@SequenceGenerator(schema="lista", name="SEQ_ID_PRODUTO",sequenceName="lista.seq_id_produto", allocationSize=1)
@NamedQueries({
			@NamedQuery(name="Produto.listByDescricao",
						query="select p from Produto p where p.descricao like :descricao order by p.descricao"),
			@NamedQuery(name="Produto.findAll",
						query="select p from Produto p order by p.descricao"),
			@NamedQuery(name="Produto.findByDescricao",
						query="select p from Produto p where p.descricao=:descricao")			
			})
public class Produto implements Serializable {

	private static final long serialVersionUID = 5057011256954590345L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEQ_ID_PRODUTO")
	private Integer id;
	
	private String descricao;
	
	private boolean ativo;
	
	public Produto(Integer id, String descricao) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.ativo = true;
	}

	public Produto(String descricao) {
		super();
		this.descricao = descricao;
		this.ativo = true;
	}

	public Produto() {
		super();
		this.ativo = true;
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
	
	

	public boolean isAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
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
