class ColorPalette {
	constructor({ element, colors = [] }){
		this.element = element;

		this.colorElements = [];    //Цвета, на которые пользователь будет кликать

		this.colors = colors;
		this.currentColor = null;  //Текущий цвет
		this.init();
	}

	init(){
		//Обработки клика пол li
		this.element.addEventListener('click', this.handleColorSelected.bind(this));

		//Перебор цветов из функции addColorElement()
        for (let color of this.colors){
            this.addColorElement(color);
        }
	}

	handleColorSelected({ target }) {
		//tagName - проверка клика (LI caps)
		if(target.tagName === 'LI') {
			this.currentColor = target.style.backgroundColor;
			console.log(this.currentColor);

			//Прогоняем цвета из масива для присваивания класса и убираем лишние .selected
			for(let colorElement of this.colorElements){
				colorElement.classList.remove('selected');
			}
			target.classList.add('selected')

		}
	}

	addColor(color){
		this.addColorElement(color);
	}

	addColorElement(color){
        /*
        На каждый color мы создаем li,
        Указываем класс,
        Меняем значение бэкграунда,
        Добавляем элемент в li,
        Добавляем в массив colorElements
        */
        let li = document.createElement('li');
        li.className = 'color-palette__color';
        li.style.backgroundColor = `rgb(${color.red},${color.green},${color.blue})`;
        this.element.appendChild(li); //Добавлять li элемент в сам li
        this.colorElements.push(li);  //Отслеживание выбранного цвета
    }

}