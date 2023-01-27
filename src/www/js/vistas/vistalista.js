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
		this.spanBusq= $('div').eq(0)
		this.spanList= $('div').eq(1)
		
	
		this.listado.css('display','none')
		this.spanBusq.css('display','none')
		this.spanList.css('display','none')
		

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
		this.spanBusq.show("fade",700)
		this.spanList.show("fade",700)
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
		let t10 =0
		let t20=0
		let t30=0
		let t40=0
		
		 
		let div = $('<div></div>')
		div.attr('id', 'scatter_area')
		this.listado.append(div)
		
		if(lista==""){
			let h1 = $('<h1></h1>').text("Para comenzar seleccione añadir prenda en la esquina superior izquierda")
			this.listado.append(h1)
		}else{
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
				element.talla
				if(element.talla<=10)
					t10++
				if(element.talla<=20 && element.talla>10)
					t20++
				if(element.talla<=30 && element.talla>20)
					t30++
				if(element.talla<=40 && element.talla>30)
					t40++
				//element.
			});
			
		}
		//Intento grafico
		// set the dimensions and margins of the graph
		var margin = {top: 10, right: 40, bottom: 30, left: 30},
		width = 450 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

		// append the svg object to the body of the page
		var svG = d3.select("#scatter_area")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

		// Create data
		var data = [ {x:10, y:t10}, {x:20, y:t20}, {x:30, y:t30}, {x:40, y:t40} ]

		// X scale and Axis
		var x = d3.scaleLinear()
		.domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
		.range([0, width]);       // This is the corresponding value I want in Pixel
		svG
		.append('g')
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

		// X scale and Axis
		var y = d3.scaleLinear()
		.domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
		.range([height, 0]);       // This is the corresponding value I want in Pixel
		svG
		.append('g')
		.call(d3.axisLeft(y));

		// Add 3 dots for 0, 50 and 100%
		svG
		.selectAll("whatever")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d){ return x(d.x) })
		.attr("cy", function(d){ return y(d.y) })
		.attr("r", 7)

		///////////////////////
		
	}
	/**
	 * Metodo que indica al controlador que se ha pulsado una caja
	 * @param {string} id 
	 */	
	pulsarCaja(id){
		
		this.controlador.pulsarRopa(id)
	}
}
