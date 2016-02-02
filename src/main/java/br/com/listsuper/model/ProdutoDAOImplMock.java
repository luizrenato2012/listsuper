package br.com.listsuper.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public class ProdutoDAOImplMock implements ProdutoDAO, Serializable {

	private static final long serialVersionUID = 3563033397080066807L;
	
	private List<Produto> produtos;
	
	public ProdutoDAOImplMock() {
		produtos = new ArrayList<Produto>();
	}

	@Override
	public void insert(Produto p) {
		p.setDescricao(p.getDescricao().toUpperCase());
		p.setId(this.produtos.size()+1);
		this.produtos.add(p);
	}

	@Override
	public void delete(Produto p) {
		this.produtos.remove(p);
	}

	@Override
	public List<Produto> listAll() {
		return this.produtos;
	}

	@Override
	public List<Produto> listByDescricao(String descricao) {
		List<Produto> lista = new ArrayList<Produto>();
		for(Produto produto: this.produtos){
			if (produto.getDescricao().contains(descricao.toUpperCase())){
				lista.add(produto);
			}
		}
		return lista;
	}

	@Override
	public Produto load(Integer id) {
		for(Produto produto: this.produtos){
			if (produto.getId().equals(id)){
				return produto;
			}
		}
		return null;
	}

	@Override
	public void update(Produto p) {
		int idx = 0; 
		for(Produto produto: this.produtos){
			if (produto.getId().equals(p.getId())){
				idx = this.produtos.indexOf(produto);
				produto = p;
				this.produtos.set(idx, p);
			}
		}
	}
	
	public boolean isExiste(String descricao) {
		for(Produto produto : this.produtos){
			if (produto.getDescricao().equalsIgnoreCase(descricao)){
				return true;
			}
		}
		return false;
	}
	

}
