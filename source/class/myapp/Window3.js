qx.Class.define("myapp.Window3", {
    extend: qx.ui.window.Window,

    construct: function () {
        super('window_3');

        let win4 = new myapp.Window4();
        win4.moveTo(480, 320);
        win4.open();

        this.setWidth(700);
        this.setHeight(300);

        const layout = new qx.ui.layout.Grid(0, 0);
        this.setLayout(layout);

        //toolbar
        const toolbar = new qx.ui.toolbar.ToolBar();
        this.add(toolbar, { row: 0, column: 0 });

        // добавляю первй лист
        let listOne = new qx.ui.form.List();
        listOne.setSelectionMode("multi");
        this.add(listOne, { row: 1, column: 0 });

        //добавляю второй лист 
        let listTwo = new qx.ui.form.List();
        listTwo.setWidth(100);
        this.add(listTwo, { row: 1, column: 3 });

        //создаю массив для помещения данных с localstorage
        let dataListOne = new qx.data.Array();

        let dataListTwo = new qx.data.Array();

        //добавляю в лист данные
        let controllerListOne = new qx.data.controller.List(dataListOne, listOne);
        let controller2 = new qx.data.controller.List(dataListTwo, listTwo);

        let btnGetData = new qx.ui.toolbar.Button("Get data");
        btnGetData.addListener("execute", function () {
            //получить данныеы с localstorage
            let storedDataPeople = JSON.parse(localStorage.filterDataPeople);
            dataListOne.append(storedDataPeople);
        })
        toolbar.add(btnGetData);

        //добавляю две кнопки left right между двумя листами
        let buttonleft = new qx.ui.form.Button('< Left');
        buttonleft.addListener("execute", function () {
            //получаю эелемент который выбрал в списке
            let listSelection = controller2.getSelection(dataListTwo);
            //если ничего не выбрано просто останавливаю обработчик
            if (listSelection.length == 0) {
                event.stopPropagation();
            } else {
                //добавляю этот элемент в тот массив, который привязан к листу
                dataListOne.unshift(listSelection.toString());
                //удаляю с листа тот элемент, который выбрал
                controller2.getModel().remove(controller2.getSelection().getItem(0));
            }
        })
        this.add(buttonleft, { row: 1, column: 1 });

        //обрабатываю нажатие кнопки
        let buttonRight = new qx.ui.form.Button('Right >');
        buttonRight.addListener("execute", function () {
            //создаю контроллер выбора элементов в list
            let listSelection = controllerListOne.getSelection(dataListOne);
            if (listSelection.length == 0) {
                event.stopPropagation();
            } else {
                //добавляем выбранные элементы в массив
                dataListTwo.push(listSelection.toString());
                //удаляю выбранный элементa
                controllerListOne.getModel().remove(controllerListOne.getSelection().getItem(0));
            }
        })
        this.add(buttonRight, { row: 1, column: 2 });

        const toolbarVault = new qx.ui.toolbar.ToolBar();
        this.add(toolbarVault, { row: 2, column: 0 });

        toolbarVault.addSpacer();

        let buttonBack = new qx.ui.toolbar.Button('Back');
        toolbarVault.add(buttonBack);

        let buttonNext = new qx.ui.toolbar.Button('Next');
        buttonNext.addListener("execute", function () {
            localStorage.clear();
            let dataListTwoArray = new qx.data.Array();
            for (let i = 0; i < dataListTwo.length; i++) {
                dataListTwoArray.push(dataListTwo.getItem(i));
                localStorage.setItem("filterDataPeople", JSON.stringify(dataListTwoArray.toArray()));
            }
        })
        toolbarVault.add(buttonNext);

        this.setContentPadding(0);
        layout.setRowFlex(1, 1);
        layout.setColumnFlex(0, 1);
        layout.setColumnFlex(3, 1);

        this.add(toolbar, { row: 0, column: 0, colSpan: 4 });
        this.add(toolbarVault, { row: 2, column: 0, colSpan: 4 });
    },
});