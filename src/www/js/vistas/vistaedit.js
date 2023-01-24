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
		
		this.btnEditar = this.div.find('a').eq(2)
		this.btnEditar.click(this.guardar.bind(this))

		this.btnVolver = this.div.find('a').eq(0)
		this.btnVolver.click(this.volver.bind(this))
		
		
		this.id = ''
	}/**
	 * Metodo que muestra los datos del objeto en la vista de edicion
	 * @param {object} ropa 
	 */
	mostrarDatos(ropa){
		
		this.limpiar()
		this.id = ropa.id
		
		if(this.op1.value==ropa.tipo)
			this.op1.selected = true
		if(this.op2.value==ropa.tipo)
			this.op2.selected = true
		if(this.op3.value==ropa.tipo)
			this.op3.selected = true
		if(this.op4.value==ropa.tipo)
			this.op4.selected = true
		
		this.pri.checked = ropa.estacion[0]
		this.ver.checked = ropa.estacion[1]		
		this.oto.checked = ropa.estacion[2]		
		this.inv.checked = ropa.estacion[3]
		
		
		this.nombre.value = ropa.nombre
		this.talla.value = ropa.talla
		this.dia.value = ropa.diaComprado
		this.descripcion.value = ropa.descripcion
		
	}
	/**
	 * Metodo que limpia el formulario despues de su uso por si acacso
	 */
	limpiar(){
		this.op1.selected = false
		this.op2.selected = false
		this.op3.selected = false
		this.op4.selected = false
		this.pri.checked =false
		this.ver.checked = false	
		this.oto.checked = false		
		this.inv.checked = false

		
		this.nombre.value = ''
		this.talla.value = ''
		this.dia.value = ''
		this.descripcion.value = ''
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
		let nombre = this.nombre.value
		let talla = this.talla.value
		let dia = this.dia.value //Año mes dia
		let descripcion = this.descripcion.value
		let tipo = this.tipo.value
		let valArray = true
		
		let array = []
		array.push(this.pri.checked,this.ver.checked,this.oto.checked,this.inv.checked)
		console.log(array[0],array[1],array[2],array[3])
		if(array[0]==false && array[1]==false && array[2]==false&& array[3]==false){
			valArray= false
		}
		
		if (nombre=='' || talla==''||talla<0 || dia=='' || descripcion=='' || valArray==false){
			if (nombre==''){
				this.h3Error1.style.display='block'
				this.lbNombre.style.color='red'
			} 
			if (talla==''){
				this.h3Error1.style.display='block'
				this.lbTalla.style.color='red'
			} 
			if (dia==''){
				this.h3Error1.style.display='block'
				this.lbDia.style.color='red'
			} 
			if (descripcion==''){
				this.h3Error1.style.display='block'
				this.lbDescripcion.style.color='red'
			} 
			if (valArray==false){
				this.h3Error1.style.display='block'
				this.lbEstacion.style.color='red'
			} 
			if (talla<0){
				this.h3Error2.style.display='block'
				this.lbTalla.style.color='red'
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
		this.h3Error2.style.display='none'
		this.h3Error1.style.display='none'
		this.lbNombre.style.color='white'
		this.lbTalla.style.color='white'
		this.lbDia.style.color='white'
		this.lbDescripcion.style.color='white'
		this.lbEstacion.style.color='white'
	}
}