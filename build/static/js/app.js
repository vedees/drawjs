class App {
	constructor({canvas, colorPalette, colorPicker }){
		this.canvas = canvas;
		this.colorPalette = colorPalette;
		this.colorPicker = colorPicker;

		//Context for draw in canvas
		this.context = null;
		//Drawing now?
		this.isDrawing = false;

		this.init();
	};


	init() {
		this.context = this.canvas.getContext('2d');

		//Надавливание мышкой
		this.canvas.addEventListener('mousedown',  this.handleCanvasMousedown.bind(this));
		//Движение мышкой
		this.canvas.addEventListener('mousemove',  this.handleCanvasMousemove.bind(this));
		//Отпускание мыши
		this.canvas.addEventListener('mouseup',   this.handleCanvasMouseup.bind(this));
		//Мышь покидает приделы канваса
		this.canvas.addEventListener('mouseleave', this.handleCanvasMouseleave.bind(this));

		this.colorPicker.onAdd = color => this.colorPalette.addColor(color);

		//Очистка
		document.querySelector('#canvas_clear__button')
			.addEventListener('click', this.handleCanvasClear.bind(this));
		//Ластик
		document.querySelector('#canvas_clear__eraser')
			.addEventListener('click', this.handleCanvasEraser.bind(this));
		//Размер кисти
		document.querySelector('#brush-size-slider')
			.addEventListener('change', this.handleBrashSizeChange.bind(this));
        //Меню с выбором цветов
		document.querySelector('#new-color-button')
			.addEventListener('click', this.handleNewColorButton.bind(this));
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

			//Берем текущий цвет из палитры
			this.context.strokeStyle = this.colorPalette.currentColor;
			//Проводим линию
			this.context.stroke();
			//Текущее событие делаем последним, чтобы зналть, что последнее для след рисунка
			this.lastEvent = event;
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

	handleCanvasEraser(event){
        this.colorPalette.currentColor = `white`;
	}

	handleBrashSizeChange(event){
		//Изменение размера кисти
		//Number переведет строку в число
		this.context.lineWidth = Number(event.target.value);
	}

	handleNewColorButton(event){
		this.colorPicker.open();
	}
}

