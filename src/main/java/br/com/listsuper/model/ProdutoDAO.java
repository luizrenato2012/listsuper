package br.com.listsuper.model;

import java.util.List;

import org.springframework.stereotype.Repository;

public interface ProdutoDAO {
	
	public void insert(Produto p);
	
	public void delete (Produto p);
	
	public List<Produto> listAll();
	
	public List<Produto> listByDescricao(String descricao);
	
	public Produto load(Integer p);
	
	public void update(Produto p);

}
