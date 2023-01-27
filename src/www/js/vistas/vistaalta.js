/**
 * @file Contiene el controlador principal de la aplicación
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
import {Vista} from './vista.js'
import {Ropa} from '../modelo/ropa.js'
export class VistaAlta extends Vista{
	constructor(controlador, div){
		super(div)
		this.controlador = controlador
		
		this.btnCancelar = this.div.find('button').eq(0)
		this.btnAceptarVolver = this.div.find('button').eq(1)
		this.btnAceptarForm = this.div.find('button').eq(2)

		
		this.formImg = this.div.find("input").eq(0)
		this.formNombre= this.div.find("input").eq(1)
		this.formTalla = this.div.find("input").eq(2)
		this.formDia = this.div.find("input").eq(3)
		this.formDescripcion = this.div.find("textArea").eq(0)
		this.formTipo = this.div.find("select").eq(0)
		this.op1=this.div.find('option').eq(0)
		this.op2=this.div.find('option').eq(1)
		this.op3=this.div.find('option').eq(2)
		this.op4=this.div.find('option').eq(3)

		this.pri = this.div.find("input").eq(4)
		this.ver = this.div.find("input").eq(5)
		this.oto = this.div.find("input").eq(6)
		this.inv = this.div.find("input").eq(7)
		this.lbNombre = this.div.find("label").eq(1)
		this.lbTalla = this.div.find("label").eq(2)
		this.lbDia = this.div.find("label").eq(3)
		this.lbDescripcion = this.div.find("label").eq(4)
		this.lbEstacion = this.div.find("label").eq(6)

		this.h3Error1 = this.div.find("h3").eq(0)
		this.h3Error2 = this.div.find("h3").eq(1)




		this.btnAceptarForm.click(this.validar.bind(this,1))
		this.btnAceptarForm.keypress(this.validar.bind(this,1))
		this.btnAceptarVolver.click(this.validar.bind(this,0))
		this.btnAceptarVolver.keypress(this.validar.bind(this,0))
		this.btnCancelar.click(this.volver.bind(this))
		this.btnCancelar.keypress(this.volver.bind(this))
	}/**
	 * Metodo que valida los datos y los envia o no al alta dependiendo del resultado
	 * @param {int} num depende de por donde se llegue al metodo el resultado varia
	 */
	validar(num){
		
		let imagenSrc= "../../src/www/assets/imagenes/camiseta1.jpg"//IGNORAR POR EL MOMENTO
		let nombre = this.formNombre.val()
		
		let talla = this.formTalla.val()
		let dia = this.formDia.val() //Año mes dia
		let descripcion = this.formDescripcion.val()
		let tipo = this.formTipo.val()
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
			this.controlador.insertar(objeto)
			this.limpiar()
			if(num==0){
				
				this.volver()
			}

		}
		
		
	}
	/**
	 * Metodo que vuelve a la vista principal sin realizar cambios
	 */
	volver(){
		this.limpiar()
		this.controlador.listar()
		this.controlador.pulsarHeadList()
	}
	/**
	 * Metodo que limpia el formulario cada vez que se inicializa
	 */
	limpiar(){
		this.op1.attr('selected','selected')
		this.pri.prop("checked",false)
		this.ver.prop("checked",false)	
		this.oto.prop("checked",false)		
		this.inv.prop("checked",false)


		
		this.formNombre.val('')
		this.formTalla.val('')
		this.formDia.val('')
		this.formDescripcion.val('')

		this.h3Error2.css('display','none')
		this.h3Error1.css('display','none')
		this.lbNombre.removeClass("textoerror")
		this.lbTalla.removeClass("textoerror")
		this.lbDia.removeClass("textoerror")
		this.lbDescripcion.removeClass("textoerror")
		this.lbEstacion.removeClass("textoerror")
	}
}