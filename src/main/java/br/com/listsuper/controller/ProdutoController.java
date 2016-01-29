package br.com.listsuper.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/produtos")
public class ProdutoController {
	
	@RequestMapping(value="/home", produces="application/json")
	@ResponseBody
	public String teste() {
		return "teste produtos ok";
	}

}
