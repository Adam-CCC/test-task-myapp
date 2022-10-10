/* ************************************************************************

   Copyright: 2022 undefined

   License: MIT license

   Authors: undefined

************************************************************************ */

/**
 * This is the main application class of "myapp"
 *
 * @asset(myapp/*)
 */
qx.Class.define("myapp.Application",
  {
    extend: qx.application.Standalone,



    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members:
    {
      /**
       * This method contains the initial application code and gets called 
       * during startup of the application
       * 
       * @lint ignoreDeprecated(alert)
       */
      main: function () {
        // Call super class
        super.main();

        // Enable logging in debug variant
        if (qx.core.Environment.get("qx.debug")) {
          // support native logging capabilities, e.g. Firebug for Firefox
          qx.log.appender.Native;
          // support additional cross-browser console. Press F7 to toggle visibility
          qx.log.appender.Console;
        }

        /*
        -------------------------------------------------------------------------
          Below is your actual application code...
        -------------------------------------------------------------------------
        */
        let win1 = new myapp.Window1();
        win1.moveTo(50, 30);
        win1.open();
      },

    }
  });
