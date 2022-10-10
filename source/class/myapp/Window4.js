qx.Class.define("myapp.Window4", {
    extend: qx.ui.window.Window,

    construct: function () {
        super('window_4');
        let layout = new qx.ui.layout.Grid();
        this.setLayout(layout);

        //toolbar
        const toolbar = new qx.ui.toolbar.ToolBar();
        this.add(toolbar, { row: 0, column: 0 });

        //table model
        var tableModel = new qx.ui.table.model.Filtered();
        tableModel.setColumns(["ID", "Full name", "Age"]);
        tableModel.setColumnEditable(0, true);
        tableModel.setColumnEditable(1, true);

        //кнопка, которая добавляет данные второго листа с Window3 
        let btnGetData = new qx.ui.toolbar.Button("Get data");
        btnGetData.addListener("execute", function () {
            //получить данные с localstorage
            let storedDataPeople = JSON.parse(localStorage.filterDataPeople);
            //массив куда буду помещать данные с localstorage
            let filterSetData = [];
            let arr = [];
            for (let i = 0; i < storedDataPeople.length; i++) {
                //Добавляю в массив данные с localstor и помещаю в кавычки каждый элемент
                filterSetData.push(storedDataPeople[i].split(","));
                //Делаю id для каждого поля
                let id = filterSetData.length;
                //Добавляю id как первый элемент массива
                filterSetData[i].unshift(id.toString());
                arr = filterSetData[i].splice(1, 3).join(' ');
                filterSetData[i].splice(1, 0, arr);
            }
            console.log(filterSetData);
            tableModel.setData(filterSetData);
        })
        toolbar.add(btnGetData);

        // table
        var table = new qx.ui.table.Table(tableModel);
        //ширина колонки ID
        table.setColumnWidth(0, 40);
        table.setColumnWidth(1, 200);
        this.add(table, { row: 1, column: 0 });

        let buttonBackStart = new qx.ui.form.Button("В начало");
        buttonBackStart.addListener("execute", function () {

        });
        this.add(buttonBackStart, { row: 2, column: 0 });

        this.setContentPadding(0);
        layout.setRowFlex(1, 1);
        layout.setColumnFlex(0, 1);

        // adjust size
        this.setWidth(350);
        this.setHeight(300);

    },
});