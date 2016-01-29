package br.com.listsuper.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class ProdutoDAOImplMock implements ProdutoDAO {

	private List<Produto> produtos;
	
	public ProdutoDAOImplMock() {
		produtos = new ArrayList<Produto>();
	}

	@Override
	public void insert(Produto p) {
		p.setDescricao(p.getDescricao().toUpperCase());
		p.setId(this.produtos.size()+1);
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
			if (produto.getDescricao().contains(descricao)){
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
		int idx = this.produtos.indexOf(p);
		for(Produto produto: this.produtos){
			if (produto.getId().equals(p.getId())){
				produto = p;
				this.produtos.set(idx, p);
			}
		}

	}

}
