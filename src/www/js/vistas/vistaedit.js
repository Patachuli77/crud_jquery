/**
 * @file Contiene el controlador principal de la aplicación
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
import {Vista} from './vista.js'
import {Ropa} from '../modelo/ropa.js'
export class VistaEdit extends Vista{
	constructor(controlador, div){
		super(div)
		this.controlador = controlador
		
		this.nombre =this.div.find('input').eq(1)
		this.talla=this.div.find('input').eq(2)
		this.dia=this.div.find('input').eq(3)
		this.descripcion=this.div.find('textarea').eq(0)
		this.tipo = this.div.find("select").eq(0)
		this.op1=this.div.find('option').eq(0)
		this.op2=this.div.find('option').eq(1)
		this.op3=this.div.find('option').eq(2)
		this.op4=this.div.find('option').eq(3)

		this.pri=this.div.find('input').eq(4)
		this.ver=this.div.find('input').eq(5)
		this.oto=this.div.find('input').eq(6)
		this.inv=this.div.find('input').eq(7)

		this.lbNombre = this.div.find("label").eq(1)
		this.lbTalla = this.div.find("label").eq(2)
		this.lbDia = this.div.find("label").eq(3)
		this.lbDescripcion = this.div.find("label").eq(4)
		this.lbEstacion = this.div.find("label").eq(6)

		this.h3Error1 = this.div.find("h3").eq(0)
		this.h3Error2 = this.div.find("h3").eq(1)
		
		this.btnBorrar = this.div.find('a').eq(1)
		this.btnBorrar.click(this.borrar.bind(this))
		this.btnBorrar.keypress(this.borrar.bind(this))
		
		this.btnEditar = this.div.find('a').eq(2)
		this.btnEditar.click(this.guardar.bind(this))
		this.btnEditar.keypress(this.guardar.bind(this))

		this.btnVolver = this.div.find('a').eq(0)
		this.btnVolver.click(this.volver.bind(this))
		this.btnVolver.keypress(this.volver.bind(this))
		
		
		this.id = ''
	}/**
	 * Metodo que muestra los datos del objeto en la vista de edicion
	 * @param {object} ropa 
	 */
	mostrarDatos(ropa){
		
		this.limpiar()
		this.quitarErrores()
		this.id = ropa.id
		
		if(this.op1.val()==ropa.tipo)
			this.op1.attr('selected','selected')
		if(this.op2.val()==ropa.tipo)
			this.op2.attr('selected','selected')
		if(this.op3.val()==ropa.tipo)
			this.op3.attr('selected','selected')
		if(this.op4.val()==ropa.tipo)
			this.op4.attr('selected','selected')
		
		this.pri.prop("checked",ropa.estacion[0])
		this.ver.prop("checked",ropa.estacion[1])	
		this.oto.prop("checked",ropa.estacion[2])	
		this.inv.prop("checked",ropa.estacion[3])
		
		
		this.nombre.val(ropa.nombre) 
		this.talla.val(ropa.talla)
		this.dia.val(ropa.diaComprado)
		this.descripcion.val(ropa.descripcion)
		
	}
	/**
	 * Metodo que limpia el formulario despues de su uso por si acacso
	 */
	limpiar(){
		this.op1.attr('selected','selected')
		
		this.pri.prop("checked",false)
		this.ver.prop("checked",false)
		this.oto.prop("checked",false)		
		this.inv.prop("checked",false)

		
		this.nombre.val('')
		this.talla.val('')
		this.dia.val('')
		this.descripcion.val('')
	}/**
	 * MEtodo que llama al controlador para borrar
	 */
	borrar(){
		this.controlador.borrado(this.id)
	}
	/**
	 * Metodo que valida los datos del formulario y decide si enviarlos o no dependindo del resultado
	 */
	guardar(){
		let imagenSrc= "../../src/www/assets/imagenes/camiseta1.jpg"//IGNORAR POR EL MOMENTO
		let nombre = this.nombre.val()
		let talla = this.talla.val()
		let dia = this.dia.val() //Año mes dia
		let descripcion = this.descripcion.val()
		let tipo = this.tipo.val()
		let valArray = true
		
		let array = []
		array.push(this.pri.prop("checked"),this.ver.prop("checked"),this.oto.prop("checked"),this.inv.prop("checked"))
		
		if(array[0]==false && array[1]==false && array[2]==false&& array[3]==false){
			valArray= false
		}
		
		if (nombre=='' || talla==''||talla<0 || dia=='' || descripcion=='' || valArray==false){
			if (nombre==''){
				this.h3Error1.css('display','block')
				this.lbNombre.addClass("textoerror",1000)
			} 
			if (talla==''){
				this.h3Error1.css('display','block')
				this.lbTalla.addClass("textoerror",1000)
			} 
			if (dia==''){
				this.h3Error1.css('display','block')
				this.lbDia.addClass("textoerror",1000)
			} 
			if (descripcion==''){
				this.h3Error1.css('display','block')
				this.lbDescripcion.addClass("textoerror",1000)
			} 
			if (valArray==false){
				this.h3Error1.css('display','block')
				this.lbEstacion.addClass("textoerror",1000)
			} 
			if (talla<0){
				this.h3Error2.css('display','block')
				this.lbTalla.addClass("textoerror",1000)
			} 	
		}else{

			let objeto = new Ropa(imagenSrc,nombre,talla,dia,descripcion,tipo,array)
			this.controlador.guardar(this.id,objeto)
			this.limpiar()
			
		}

	
		
		

		
	}/**
	 * Metodo para volver a la vista anterior
	 */
	volver(){
		this.quitarErrores()
		this.controlador.pulsarHeadCons()
	}
	/**
	 * Metodo para quitar los avisos por datos incorrectos
	 */
	quitarErrores(){
		this.h3Error2.css('display','none')
		this.h3Error1.css('display','none')
		this.lbNombre.removeClass("textoerror")
		this.lbTalla.removeClass("textoerror")
		this.lbDia.removeClass("textoerror")
		this.lbDescripcion.removeClass("textoerror")
		this.lbEstacion.removeClass("textoerror")
	}
}