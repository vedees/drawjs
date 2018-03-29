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
		//Мышь покидает приделы канваса
		this.canvas.addEventListener('mouseleave', this.handleCanvasMouseleave.bind(this));

		document.querySelector('#canvas_clear__button')
			.addEventListener('click', this.handleCanvasClear.bind(this));
		document.querySelector('#brush-size-slider')
			.addEventListener('change', this.handleBrashSizeChange.bind(this));
	}

	handleCanvasMousedown(event) {
		this.lastEvent = event; //Предыдущиее состояние
 		this.isDrawing = true;

	}
	
	handleCanvasMousemove(event) {
		if(this.isDrawing){
			//Если рисуем вызывается функция бегин паф
			this.context.beginPath(); 
			//Откуда мы будем рисовать
			this.context.moveTo(this.lastEvent.offsetX, this.lastEvent.offsetY);
			//Рисуем линию
			this.context.lineTo(event.offsetX, event.offsetY);  

			//FIX IT - не может вытащить currentColor
			//Берем текущий цвет из палитры
			// this.context.strokeStyle = this.colorPallete.currentColor;

			//Проводим линию
			this.context.stroke();
			//Текущее событие делаем последним, чтобы зналть, что последнее для след рисунка
			this.lastEvent = event;
		}else{
			console.log('oops')
		}
	}

	handleCanvasMouseup(event) {
		this.isDrawing = false;
	
	}

	handleCanvasMouseleave(event) {
		this.isDrawing = false;

	}

	handleCanvasClear(event){
		//Делаем заливку белой. По умолчанию - черная
		this.context.fillStyle = 'white';
		//Заполняем весь канвас пустым слоем (fillRect) где 0 0 кардинанты, остальное высота и ширина
		this.context.fillRect(0,0, this.canvas.width, this.canvas.height);
	}

	handleBrashSizeChange(event){
		//Изменение размера кисти
		//Number переведет строку в число
		this.context.lineWidth = Number(event.target.value);
	}

}

