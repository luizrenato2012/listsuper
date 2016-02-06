package br.com.listsuper.model;

import java.io.Serializable;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import br.com.listsuper.controller.ListSuperException;

@Service
@Stateless(name="produtoServiceDB")
public class ProdutoServiceImpl implements ProdutoService, Serializable {

	private static final long serialVersionUID = -6016311783282495711L;

	@PersistenceContext(unitName="listSuperPU")
	private EntityManager entityManager;

	@Override
	public void insert(Produto p) {
		if (this.isExiste(p.getDescricao().trim().toUpperCase())) {
			throw new ListSuperException("Produto " + p.getDescricao() + " já cadastrado");
		}
		p.setDescricao(p.getDescricao().trim().toUpperCase());
		this.entityManager.persist(p);
	}

	@Override
	public void delete(Integer id) {
		Produto p = this.load(id);
		if (p==null) {
			throw new ListSuperException("Produto "+ id + " nao encontrado para exclusão");
		}
		this.entityManager.remove(p);
	}

	@Override
	public void saveOrUpdate(Produto p) {
		if (p.getId()==null || p.getId()==0) {
			this.insert(p);
		} else {
			this.update(p);
		}
	}

	@Override
	public List<Produto> listAll() {
		return this.entityManager.createNamedQuery("Produto.findAll").getResultList();
	}

	@Override
	public List<Produto> listByDescricao(String descricao) {
		Query query = this.entityManager.createNamedQuery("Produto.listByDescricao");
		String argumento = "\'%"+ descricao.toUpperCase() + "%\'";
		System.out.println("Argumento " + argumento);
		query.setParameter("descricao", argumento);
		return query.getResultList();
	}

	@Override
	public Produto load(Integer id) {
		return this.entityManager.find(Produto.class, id);
	}

	@Override
	public void update(Produto p) {
		this.entityManager.merge(p);

	}

	private boolean isExiste(String descricao) {
		Query query = this.entityManager.createNamedQuery("Produto.findByDescricao");
		query.setParameter("descricao", descricao);
		try {
			query.getSingleResult();
			return true;
		} catch (NoResultException e) {
			return false;
		}
		
	}



}
