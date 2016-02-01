package br.com.listsuper.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import br.com.listsuper.model.Produto;
import br.com.listsuper.model.ProdutoDAOImplMock;

@Controller
@RequestMapping("/produtos")
public class ProdutoController {

	@Autowired
	private ProdutoDAOImplMock dao;

	@RequestMapping(value="/home", produces="application/json", method= RequestMethod.GET)
	@ResponseBody
	@ResponseStatus(value=HttpStatus.OK)
	public String teste() {
		return "teste produtos ok " + DateFormat.getDateTimeInstance().format(new Date());
	}

	@RequestMapping(value="/list", produces="application/json", method= RequestMethod.GET)
	@ResponseBody
	public List<Produto> listaTodos() {
		return dao.listAll();
	}


	@RequestMapping(value="/insert",  method= RequestMethod.POST, consumes="text/plain", 
			headers = "Content-Type=application/x-www-form-urlencoded")
	@ResponseBody
	public ResponseEntity insere (@RequestParam("descricao")String descricao) {
		try {
			Logger.getLogger("ProdutoController").info("inserindo " + descricao);
			Produto p = new Produto(descricao);
			dao.insert(p);
			Logger.getLogger("ProdutoController").info("inserindo " + descricao);
			return new ResponseEntity<String>("Insercao com sucesso",HttpStatus.OK);
		} catch(Exception e ) {
			e.printStackTrace();
			return new ResponseEntity<String>("Erro "+ e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value="/{id}", produces="application/json", method=RequestMethod.GET)
	@ResponseBody
	public Produto carrega(@PathVariable Integer id) {
		return dao.load(id);
	}



}
