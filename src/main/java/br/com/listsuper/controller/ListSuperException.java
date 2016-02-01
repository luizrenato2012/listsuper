package br.com.listsuper.controller;

public class ListSuperException extends RuntimeException {

	public ListSuperException(String message, Throwable cause,
			boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public ListSuperException(String message, Throwable cause) {
		super(message, cause);
	}

	public ListSuperException(String message) {
		super(message);
	}

}
