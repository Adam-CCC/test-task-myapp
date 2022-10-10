qx.Class.define("myapp.Window2", {
    extend: qx.ui.window.Window,

    events: {
        changeLoginData: "qx.event.type.Data",
    },

    construct() {
        super('window_2');

        let win3 = new myapp.Window3();
        win3.moveTo(480, 10);
        win3.open();

        // adjust size
        this.setWidth(400);
        this.setHeight(400);

        const layout = new qx.ui.layout.Grid(0, 0);
        this.setLayout(layout);

        //toolbar
        const toolbar = new qx.ui.toolbar.ToolBar();
        this.add(toolbar, { row: 0, column: 0 });

        //data one
        let dateOne = new qx.ui.form.DateField();
        dateOne.setValue(new Date());
        dateOne.addListener("changeValue", function (e) {
            this.debug("Change Value: " + e.getData());
        });
        toolbar.add(dateOne);

        toolbar.add(new qx.ui.basic.Label("-"));

        //data two
        let dateTwo = new qx.ui.form.DateField();
        dateTwo.setValue(new Date());
        dateTwo.addListener("changeValue", function (e) {
            this.debug("Change Value: " + e.getData());
        });
        toolbar.add(dateTwo);

        //data table
        function createRandomRows() {
            var now = new Date();
            var rowData = [
                ['Иван', 'Иванов', 'Иванович'],
                ['Андрей', 'Санченко', 'Андреевич'],
                ['Семен', 'Сидоренко', 'Иванович'],
                ['Ион', 'Вартанов', 'Гамзатович'],
                ['Аскер', 'Набаев', 'Рамзанович'],
                ['Семен', 'Вовын', 'Семонович'],
                ['Джон', 'Хрпкинс', 'Доминик'],
                ['Сергей', 'Сергеев', 'Сергеевич'],
                ['Дмитрий', 'Мороз', 'Вячеславович'],
                ['Наталья', 'Иванова', 'Сергеевна'],
                ['Маша', 'Попова', 'Андреева'],
                ['Анастасия', 'Черныш', 'Аликовна'],
                ['Станислав', 'Кинеев', 'Кимчеев'],
                ['Вартан', 'Мурадов', 'Робертович'],
                ['Алена', 'Башаева', 'Станиславовна'],
                ['Екатерина', 'Измаиловна', 'Вячеславовна'],
                ['Вова', 'Сидоров', 'Викторович'],
                ['Беслан', 'Дадов', 'Залимович'],
                ['Семен', 'Бутов', 'Разаев'],
                ['Иван', 'Дацент', 'Михаилович'],
                ['Алеша', 'Попов', 'Попович'],
                ['Аят', 'Дараева', 'Мурадовна'],
                ['Астан', 'Аийк', 'Аворович'],
                ['Андрей', 'Серафимов', 'Дарцаевич'],
                ['Асланбек', 'Муртаев', 'Алиханович'],
                ['Дмитрий', 'Маслеников', 'Сергеевич'],
                ['Иван', 'Слепаков', 'Витальевич'],
                ['Алексей', 'Бунов', 'Романович'],
                ['Иван', 'Колесников', 'Дмитриевич'],
                ['Айтан', 'Вароков', 'Андрбекович'],
                ['Джон', 'Джонс', 'Джон'],
                ['Варак', 'Иопов', 'Иакович'],
                ['Поп', 'Кантар', 'Кареевич'],
                ['Степан', 'Разин', 'Алексеевич'],
                ['Дмитрий', 'Валуев', 'Валуевич'],
                ['Иван', 'Стпанов', 'Андреевич'],
            ];
            var now = new Date().getTime();
            var dateRange = 4000 * 24 * 60 * 60 * 1000; // 400 days

            for (let i = 0; i < rowData.length; i++) {
                var date = new Date(now + Math.random() * dateRange - dateRange / 2);
                date.setHours(0, 0, 0, 0);
                rowData[i].push(date);
            }
            return rowData;
        }

        // const jsonUsersURL = new qx.data.store.Json("https://my-json-server.typicode.com/Adam-CCC/users-fake-api/users");

        // console.log(jsonUsersURL.getModel().toArray());

        //table model
        var tableModel = new qx.ui.table.model.Filtered();
        tableModel.setColumns(["First name", "Last name", "Patronymic", "Age"]);
        tableModel.setData(createRandomRows());

        tableModel.setColumnEditable(0, true);
        tableModel.setColumnEditable(1, true);

        // table
        var table = new qx.ui.table.Table(tableModel);
        this.__table = table;
        this.add(table, { row: 1, column: 0 });
        this.setContentPadding(0);
        layout.setRowFlex(1, 1);
        layout.setColumnFlex(0, 1);

        let filterDataPeople = [];
        let buuferFilterDataPeople = [];

        var button3 = new qx.ui.toolbar.Button("Add filter");
        toolbar.add(button3);
        button3.addListener("execute", function () {
            localStorage.clear();
            tableModel.addBetweenFilter("!between", dateOne.getValue(), dateTwo.getValue(), "Age");
            tableModel.applyFilters();
            buuferFilterDataPeople.push(tableModel.getData());
            for (let i = 0; i < buuferFilterDataPeople[0].length; i++) {
                filterDataPeople.push(buuferFilterDataPeople[0][i].join());
            }
            //добавить данные в localstorage
            localStorage.setItem("filterDataPeople", JSON.stringify(filterDataPeople));
        });

        const toolbarVault = new qx.ui.toolbar.ToolBar();
        this.add(toolbarVault, { row: 2, column: 0 });

        toolbarVault.addSpacer();

        let buttonBack = new qx.ui.toolbar.Button('Back');
        toolbarVault.add(buttonBack);

        let buttonNext = new qx.ui.toolbar.Button('Next');

        toolbarVault.add(buttonNext);

        // this.add(toolbar, { row: 0, column: 0, colSpan: 2 });
        // this.add(table, { row: 1, column: 0, colSpan: 2 });
    }

});