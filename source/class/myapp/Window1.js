qx.Class.define("myapp.Window1", {
    extend: qx.ui.window.Window,
    construct: function () {
        super.main('window_1')
        // hide the window buttons

        //layout
        const layout = new qx.ui.layout.Grid(0, 0);
        this.setLayout(layout);

        //toolbar
        const toolbar = new qx.ui.toolbar.ToolBar();
        this.add(toolbar, { row: 0, column: 0 })

        let atom = new qx.ui.basic.Atom(
            "Welcome to my app"
        );
        atom.setRich(true);
        toolbar.add(atom);

        let nextButton = new qx.ui.toolbar.Button("Next");
        toolbar.add(nextButton);
        nextButton.addListener("execute", function () {

        })
        this.setContentPadding(0);

        let win2 = new myapp.Window2();
        win2.moveTo(50, 200);
        win2.open();
    },
});