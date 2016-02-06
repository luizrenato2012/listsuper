package br.com.listsuper.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import javax.ejb.EJB;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import br.com.listsuper.model.Produto;
import br.com.listsuper.model.ProdutoService;

@Controller
@RequestMapping("/produtos")
public class ProdutoController {

//	@Autowired
//	private ProdutoServiceImplMock dao;
	
	//@Autowired
	private ProdutoService produtoService;
	
	private Logger log = Logger.getLogger("ProdutoController");

	@RequestMapping(value="/home", method= RequestMethod.GET)
	@ResponseBody
	@ResponseStatus(value=HttpStatus.OK)
	public String teste() {
		return "teste produtos ok " + DateFormat.getDateTimeInstance().format(new Date());
	}

	@RequestMapping(value="/list", produces="application/json", method= RequestMethod.GET)
	@ResponseBody
	public List<Produto> listaTodos() {
		log.info("Listando " );
		List<Produto> lista = produtoService.listAll();
		log.info("Produtos  " + lista);
		return lista;
	}
	
	@RequestMapping(value="/query/descricao/{descricao}", produces="application/json", method=RequestMethod.GET)
	@ResponseBody
	public List<Produto> listaPorDescricao(@PathVariable("descricao") String descricao){
		//log.info("pesquisando " + descricao );
		if (descricao.trim().equals("TODOS")) {
			return produtoService.listAll();
		} else {
			return produtoService.listByDescricao(descricao);
		}
	}
	
	@RequestMapping(value="/delete/{id}", produces="application/json", method=RequestMethod.DELETE)
	@ResponseBody
	public ResultadoVO exclui(@PathVariable("id") int id) {
		ResultadoVO resultado = null;
		log.info("Excluindo " + id);
		try{
			produtoService.delete(id);
			resultado = new ResultadoVO("Produto excluido." , TipoResultado.OK);
		} catch(Exception e ) {
			e.printStackTrace();
			resultado = new ResultadoVO("Produto excluido." , TipoResultado.ERRO_SISTEMA);
		}
		return resultado;
	}


	@RequestMapping(value="/save",  method= RequestMethod.POST, produces="application/json")
	@ResponseBody
	public ResultadoVO grava (@RequestBody Produto produto) {
		ResultadoVO resultado = null;
		try {
			this.validaDescricao(produto.getDescricao());
			log.info("inserindo " + produto.getDescricao());
			if (produto.getId()!=null && produto.getId()!=0) {
				produtoService.update(produto);
				log.info("Alterado produto " + produto);

			} else {
				produtoService.insert(produto);
				log.info("Criado produto " + produto);
			}
			resultado = new ResultadoVO("Produto criado com sucesso." , TipoResultado.OK);
		} catch(ListSuperException e ) {
			e.printStackTrace();
			resultado = new ResultadoVO(e.getMessage() , TipoResultado.ERRO_NEGOCIO);
		}
		catch(Exception e ) {
			e.printStackTrace();
			resultado = new ResultadoVO(e.getMessage() , TipoResultado.ERRO_SISTEMA);
		}
		return resultado;
	}
	
	private void validaDescricao(String descricao) {
		if (descricao==null || descricao.trim().equals("") || descricao.length()< 3) {
			throw new ListSuperException("Descricao invalida");
		}
		
		
	}
	
	@RequestMapping(value="/{id}", produces="application/json", method=RequestMethod.GET)
	@ResponseBody
	public Produto carrega(@PathVariable Integer id) {
		return produtoService.load(id);
	}

	public void setProdutoService(ProdutoService produtoService) {
		this.produtoService = produtoService;
	}
	

}
