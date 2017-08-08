$(document).ready(function () {
    var gridData = [
      { "Name": "Otto Clay", "Age": 25, "Country": 1, "Address": "Ap #897-1459 Quam Avenue" },
      { "Name": "Connor Johnston", "Age": 45, "Country": 2, "Address": "Ap #370-4647 Dis Av." },
      { "Name": "Lacey Hess", "Age": 29, "Country": 3, "Address": "Ap #365-8835 Integer St." },
      { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave" },
      { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave" },
      { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave" },
      { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave" },
      { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave" },
      { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave" },
      { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave" },
      { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave" },
      { "Name": "Timothy Henson", "Age": 56, "Country": 1, "Address": "911-5143 Luctus Ave" },
      { "Name": "Ramona Benton", "Age": 32, "Country": 3, "Address": "Ap #614-689 Vehicula Street" }
    ];

    $("#drpJsDropDownGrid").jsDropDown({
        grid: {
            //rowClick: function (args) {
            //    // if handled default handler (handled by jsdropdown) will be overridden 
            //},
            multiSelect: true,
            filtering: true,
            data: gridData,
            noDataContent: '<div style="width: 100%; height: 100%">no data found</div>'
        },
        dropdown: {
            drowDownWidth: "", // blank for as per input control width
            dropDownHeight: "400",
            hideOnRowClick: false,
            resizable: true,
            show: function () {
                //fire on before show
            },
            shown: function () {
                //fire after show
            },
            hidden: function () {
            }
        },
    });

    var treeData = [{
        text: "Folder 1",
        state: {
            selected: false
        },
        children: [{
            text: "Folder 11",
            state: {
                selected: false,
                opened: true,
                disabled: false
            },
            children: [{
                text: "Folder 111",
                state: {
                    selected: false
                },
                children: []
            }, {
                text: "Folder 112",
                state: {
                    selected: false
                },
                children: []
            }]
        }, {
            text: "Sub Folder 2",
            state: {
                selected: false
            }
        }]
    }, {
        text: "Folder 2",
        state: {
            selected: true
        },
        children: []
    }];

    $("#drpJsDropDownTree").jsDropDown({
        tree: {
            //rowClick: function (args) {
            //    // if handled default handler (handled by jsdropdown) will be overridden 
            //},
            multiple: false,
            themes: {
                icons: false
            },
            data: treeData
        },
        dropdown: {
            hideOnRowClick: true
        }
    });
})