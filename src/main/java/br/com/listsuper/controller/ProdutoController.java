package br.com.listsuper.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.listsuper.model.Produto;
import br.com.listsuper.model.ProdutoDAO;
import br.com.listsuper.model.ProdutoDAOImplMock;

@Controller
@RequestMapping("/produtos")
public class ProdutoController {
	
	@Autowired
	private ProdutoDAOImplMock dao;
	
	@RequestMapping(value="/home", produces="application/json")
	@ResponseBody
	public String teste() {
		return "teste produtos ok";
	}
	
	@RequestMapping(value="/list", produces="application/json")
	public List<Produto> listaTodos() {
		return dao.listAll();
	}
	
	

}
