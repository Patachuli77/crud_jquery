/**
 * @file Contiene el controlador principal de la aplicación
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
import {Vista} from './vista.js'
export class VistaList extends Vista{
	constructor(controlador, div){
		super(div)
		
		this.controlador = controlador
		this.inicio=this.div.find('div').eq(0)
		this.listado=this.div.find('div').eq(1)
		this.logo= $('img').eq(0)
	
	
		this.listado.css('display','none')

		this.btnListar = this.div.find('button').eq(0)


		this.btnListar.click(this.listar.bind(this))
		this.logo.click(this.listar.bind(this))

		this.btnListar.keypress(this.listar.bind(this))
		this.logo.keypress(this.listar.bind(this))
		
	}/**
	 * Metodo que elimina la fachada de carga inicial y cambia a la vista normal
	 */
	listar(){
		this.listado.show("fade",700)
		this.inicio.hide(400)
		this.controlador.listar()
		this.listado.sortable()
	}
	/**
	 * Metodo que genera la estructura de la lista y la mete en la vista
	 * @param {array} lista 
	 */
	generarLista(lista){
		//console.log(lista)
		this.listado.html("")
		let i=5
		lista.forEach(element => {
			
			
			let p = $('<p></p>').text(element["id"]).addClass('oculto')
			

			let	divCaja = $('<div></div>').addClass('cajaRopa')
			let img = $('<img></img>').attr('src', element["imagenSrc"])

			let h3 = $('<h3></h3>').text(element["nombre"])

			divCaja.append(img)
			divCaja.append(h3)
			divCaja.append(p)
			divCaja.attr('tabindex', i)
			divCaja.attr('role', 'button')
			this.listado.append(divCaja)
			divCaja.click(this.pulsarCaja.bind(this, element.id))
			divCaja.keypress(this.pulsarCaja.bind(this, element.id))
			i++
		});
		
	}
	/**
	 * Metodo que indica al controlador que se ha pulsado una caja
	 * @param {string} id 
	 */	
	pulsarCaja(id){
		
		this.controlador.pulsarRopa(id)
	}
}
