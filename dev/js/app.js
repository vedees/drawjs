class App {
	constructor({canvas, colorPallete, colorPicker }){
		this.canvas = canvas;
		this.colorPallete = colorPallete;
		this.colorPicker = colorPicker;

		//Context for draw in canvas
		this.context = null;
		//Drawing now?
		this.isDrawing = false;

		this.init();
	};


	init() {
		this.context = this.canvas.getContext('2d');

			//bind(this) - Жесткая привязка к THIS, если нужно отправить куда-то метод класса и предварительно его
			//нужно превязать иначе конекст потеряется.
		//Надавливание мышкой
		this.canvas.addEventListener('mousedown',  this.handleCanvasMousedown.bind(this));  
		
		//Движение мышкой
		
		this.canvas.addEventListener('mousemove',  this.handleCanvasMousemove.bind(this));
		//Отпускание мыши
		this.canvas.addEventListener('mouseup',   this.handleCanvasMouseup.bind(this));
		//Когда мышь покидает приделы канваса
		this.canvas.addEventListener('mouseleave', this.handleCanvasMouseleave.bind(this));
	}

	handleCanvasMousedown(event) {
		this.lastEvent = event; //Предыдущиее состояние
 		this.isDrawing = true;

	}
	
	handleCanvasMousemove(event) {
		if(this.isDrawing){
			this.context.beginPath(); //Если рисуем вызывается функция бегин паф
			this.context.moveTo(this.lastEvent.offsetX, this.lastEvent.offsetY); //Откуда мы будем рисовать
			this.context.lineTo(event.offsetX, event.offsetY);  //Рисуем линию
			this.context.stroke(); //Проводим линию
			this.lastEvent = event; //Текущее событие делаем последним, чтобы мы знали что последнее для след рисунка.
		}
	}

	handleCanvasMouseup(event) {
		this.isDrawing = false;
	
	}

	handleCanvasMouseleave(event) {
		this.isDrawing = false;

	}

}

