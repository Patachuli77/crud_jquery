/**
 * @file Contiene el controlador principal de la aplicación
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
export class VistaHead{
	constructor(controlador, head){
		this.controlador = controlador
		this.head = head
		this.aListar = this.head.find('a').eq(0)
		this.h1Alta = this.head.find('div').eq(1)

		this.btnBuscar = this.head.find('div').eq(0)
		
		
		this.aListar.click(this.pulsarLista.bind(this))
		this.aListar.keypress(this.pulsarLista.bind(this))
		
		this.btnBuscar.click(this.pulsarBuscar.bind(this))
		this.btnBuscar.keypress(this.pulsarBuscar.bind(this))
		
		this.h1Alta.click(this.pulsarAlta.bind(this))
		this.h1Alta.keypress(this.pulsarAlta.bind(this))
      
	}/**
	 * Metodo que llama al controlador para cambiar la vista a listar
	 */
	pulsarLista(){
		this.controlador.pulsarHeadList()
		
	}/**
	 * Metodo que llama al controlador para cambiar la vista al alta
	 */
	pulsarAlta(){
		this.controlador.pulsarHeadAlta()
		
	}
	/**
	 * Metodo que llama al controlador para cambiar la vista a buscar
	 * 
	 */
	pulsarBuscar(){
		this.controlador.pulsarBuscar()
	}
}