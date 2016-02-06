package br.com.listsuper.model;

import java.util.List;

import javax.ejb.Local;

import org.springframework.stereotype.Repository;

@Local
public interface ProdutoService {
	
	public void insert(Produto p);
	
	public void update(Produto p);
	
	public void saveOrUpdate(Produto p);
	
	public void delete (Integer id);
	
	public List<Produto> listAll();
	
	public List<Produto> listByDescricao(String descricao);
	
	public Produto load(Integer p);
	

}
