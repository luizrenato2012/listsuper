package br.com.listsuper.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import br.com.listsuper.controller.ListSuperException;

@Service
public class ProdutoServiceImplMock implements ProdutoService, Serializable {

	private static final long serialVersionUID = 3563033397080066807L;
	
	private List<Produto> produtos;
	
	public ProdutoServiceImplMock() {
		produtos = new ArrayList<Produto>();
	}

	@Override
	public void insert(Produto p) {
		p.setDescricao(p.getDescricao().toUpperCase());
		p.setId(this.produtos.size()+1);
		this.produtos.add(p);
	}

	@Override
	public void delete(Integer id) {
		Produto p = this.load(id);
		if (p==null){
			new ListSuperException("Produto " + id + " nao encontrado para exclusão");
		}
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
	
	public void exclui(int id) {
		for(Produto produto: this.produtos){
			if (produto.getId().equals(id)){
				this.produtos.remove(produto);
				return;
			}
		}
	}

	@Override
	public void saveOrUpdate(Produto p) {
		if (p.getId()==null || p.getId()==0) {
			this.insert(p);
		} else {
			this.update(p);
		}
	}
	

}
