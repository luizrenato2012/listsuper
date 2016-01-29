package br.com.listsuper.model;

import java.io.Serializable;
import java.util.List;

import org.springframework.stereotype.Repository;

public class ProdutoDAOImpl implements ProdutoDAO, Serializable {

	@Override
	public void insert(Produto p) {
		
	}

	@Override
	public void delete(Produto p) {
		
	}

	@Override
	public List<Produto> listAll() {
		return null;
	}

	@Override
	public List<Produto> listByDescricao(String descricao) {
		return null;
	}

	@Override
	public Produto load(Integer p) {
		return null;
	}

	@Override
	public void update(Produto p) {
		
	}

}
