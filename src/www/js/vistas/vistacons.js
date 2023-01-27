/**
 * @file Contiene el controlador principal de la aplicación
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
import {Vista} from './vista.js'
export class VistaCons extends Vista{
	constructor(controlador, div){
		super(div)
		this.controlador = controlador
		
		this.btnEditar = this.div.find('a').eq(1)
		this.btnEditar.click(this.modificar.bind(this))

		this.btnVolver = this.div.find('a').eq(0)
		this.btnVolver.click(this.volver.bind(this))
	}/**
	 * Metodo que mete los datos del objeto dentro de su sitio en la vista para poder visualizarlos
	 * @param {object} ropa 
	 */
	mostrarDatos(ropa){
		console.log(ropa.nombre)
		let cadena = ''
		if(ropa.estacion[0]==true){
			cadena+='Primavera, '}
		if(ropa.estacion[1]==true){
			cadena+='Verano, '}
		if(ropa.estacion[2]==true){
			cadena+='Otoño, '}
		if(ropa.estacion[3]==true){
			cadena+='Invierno, '}
		cadena = cadena.substring(0, cadena.length - 2)


		let nombre =this.div.find('h3').eq(0)
		let talla=this.div.find('h3').eq(1)
		let dia=this.div.find('h3').eq(2)
		let descripcion=this.div.find('p').eq(0)
		let tipo=this.div.find('h3').eq(3)
		let estacion=this.div.find('h3').eq(4)
		console.log(ropa.estacion[0])
		
		nombre.text(ropa.nombre)
		talla.text(ropa.talla)
		dia.text(ropa.diaComprado)
		descripcion.text(ropa.descripcion)
		tipo.text(ropa.tipo)
		estacion.text(cadena)
	}/**
	 * Metodo para cambiar a la vista de editar
	 */
	modificar(){
		this.controlador.pulsarHeadEdit()
	}/**
	 * Metodo para volver a la vista principal
	 */
	volver(){
		this.controlador.pulsarHeadList()
	}
}
