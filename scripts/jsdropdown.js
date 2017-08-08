
(function (window, $) {
    var JSDROPDWON_DATA_KEY = "JSDropDown";
    $.fn.jsDropDown = function (config) {
        var args = $.makeArray(arguments), methodArgs = args.slice(1);
        var element = $(this), instance = element.data(JSDROPDWON_DATA_KEY), result = instance;

        if (instance) {
            if (typeof config === "string") {
                methodResult = instance[config].apply(instance, methodArgs);
                if (methodResult !== undefined && methodResult !== instance) {
                    result = methodResult;
                }
            }
        } else {
            new jsDropDown(element, config);
        }

        return result;
    };

    function jsDropDown(element, config) {
        this.config = config;
        this._container = element;
        this._onResize = function () {
            if (this._windowDefault.sizeChanged()) {
                this.hideDropDown.apply(this);
            }
        }
        this._outSideClick = function (ev) {
            if (ev) {
                var target = $(ev.target);
                var parent = target.closest(".mcdd-maincontainer");
                if (parent.length > 0) {
                    var _this = parent.find("input").data(JSDROPDWON_DATA_KEY);
                    if (_this._dropDownDiv[0] != this._dropDownDiv[0]) {
                        this.hideDropDown.apply(this);
                    }
                } else {
                    if (target.closest(".mcdd-dropdown")[0] != this._dropDownDiv[0]) {
                        this.hideDropDown.apply(this);
                    }
                }
            } else {
                this.hideDropDown.apply(this);
            }
        }
        this._init(config);
    }
    jsDropDown.prototype = {
        drowDownWidth: "",
        dropDownHeight: "",
        defaultDropDownHeight: "220",
        resizable: true,
        hideOnRowClick: true,
        noDataFound: "<table align='center' style='height: 100%'><tr><td>No Data Found</td></tr></table>",


        showDropDown: function () {
            var marginBtwControlAndDropdown = 2;

            this.show.apply(this);
            var offSet = this._container.offset();
            var topSpace = offSet.top - $("body").scrollTop();
            var bottomSpace = $(window).height() - topSpace - this._container.outerHeight();

            if (!this._resizableDiv.width()) {
                this._resizableDiv.css({
                    overflow: "hidden",
                    height: this.dropDownHeight || (this.defaultDropDownHeight - 2 - marginBtwControlAndDropdown),
                    width: (this.drowDownWidth || this._container.outerWidth()) - 2,
                })
            }

            this._dropDownDiv.css({
                'z-index': 10000,
                position: "fixed",
                top: "auto",
                bottom: "auto",
                left: "auto",
                right: "auto",
                height: "auto",
                width: "auto",
                'border-width': "1px",
                display: "block"
            })
            this._dropDownDiv.appendTo("body");

            if (this._resizableDiv.outerWidth() + offSet.left > $(window).width()) {
                this._dropDownDiv.css({
                    right: 0
                })
            } else {
                this._dropDownDiv.css({
                    left: offSet.left
                })
            }

            if (bottomSpace > this._resizableDiv.outerHeight() || bottomSpace > topSpace) {
                this._dropDownDiv.css({
                    top: topSpace + this._container.outerHeight() + marginBtwControlAndDropdown - Math.round(this._dropDownDiv.css("margin-top").replace("px", ""))
                })
            }
            else {
                this._dropDownDiv.css({
                    bottom: bottomSpace + this._container.outerHeight() + marginBtwControlAndDropdown - Math.round(this._dropDownDiv.css("margin-bottom").replace("px", ""))
                })
            }

            this._windowDefault.resetSize();

            if (this.resizeGrid) {
                this.resizeGrid();
            }
            this.shown.apply(this);
        },
        hideDropDown: function () {
            if (this._dropDownDiv.is(":visible")) {
                this._dropDownDiv.css({
                    display: "none"
                })
                this._container.parent().after(this._dropDownDiv);
                this.hidden.apply(this);
            }
        },

        showNoData: function () {
            this._noDataFoundDiv.html("")
            this._noDataFoundDiv.html(this.noDataFound);
            this._noDataFoundDiv.show();
        },
        hideNoData: function () {
            this._noDataFoundDiv.hide();
        },

        show: $.noop,
        shown: $.noop,
        hidden: $.noop,

        //Shared across objects (like static)
        _windowDefault: {
            recalculate: false,
            isDirty: false,
            resetSize: function () {
                this.height = $(window).outerHeight();
                this.width = $(window).outerWidth();
                this.recalculate = true;
            },
            sizeChanged: function () {
                if (this.recalculate) {
                    this.recalculate = false;
                    var currentHeight = $(window).outerHeight(), currrentWidth = $(window).outerWidth();
                    this.isDirty = this.height != currentHeight || this.width != currrentWidth;
                }
                return this.isDirty;
            },
            height: $(window).outerHeight(),
            width: $(window).outerWidth()
        },

        _init: function (config) {
            var _this = this;
            var element = this._container;

            element.data(JSDROPDWON_DATA_KEY, this);
            $.extend(this, config.dropdown);

            var icon = $("<span class='mcdd-arrow'><b></b></span>");
            var mainContainer = $("<div class='mcdd-maincontainer'></div>")
            var inputContainer = $("<div class='mcdd-inputcontainer'></div>")

            var dropDownDiv = $("<div style='display: none' class='mcdd-dropdown'></div>");
            var dropDownResizableDiv = $("<div class='mcdd-drowdown-resizable'>");
            dropDownDiv.append(dropDownResizableDiv);
            this._resizableDiv = dropDownResizableDiv;
            this._dropDownDiv = dropDownDiv;

            this._noDataFoundDiv = $("<div style='display: none' class='mcdd-nodatafound'></div>");
            this._resizableDiv.append(this._noDataFoundDiv);

            element.wrap(inputContainer);
            element.after(icon);
            element.parent().wrap(mainContainer);
            element.parent().after(dropDownDiv);

            element[0].style.setProperty('width', '100%', 'important');
            element.css({
                height: "100%"
            })
            element.parent().css({
                width: "100%",
                height: "100%"
            })
            element.parent().parent().css({
                width: "100%",
                height: "100%"
            })


            if (this.resizable) {
                dropDownResizableDiv.resizable({
                    start: function () {

                    },
                    resize: function (event, ui) {

                    }
                });
            }

            $(".mcdd-inputcontainer", mainContainer).after(dropDownDiv);

            icon.click(function (e) {
                if (dropDownDiv.is(":visible")) {
                    _this.hideDropDown.apply(_this);
                }
                else {
                    _this.showDropDown.apply(_this);
                    loadPlugin.apply(_this);
                }
            });
            element.on("focus", function (e) {
                _this.showDropDown.apply(_this);
                loadPlugin.apply(_this);
            });
            element.on("click", function () {
                _this.showDropDown.apply(_this);
                loadPlugin.apply(_this);
            });
            element.on("keydown", function (e) {
                if (e.which == 9) {
                    _this.hideDropDown.apply(_this, [e]);
                }
            })
            element.on("input", function () {
                debugger;
            });

            attachOutsideHide.apply(this);
            attachWindowResize.apply(this);
        },
        _distroy: function () {
            detachWindowResize.apply(this);
            detachOutsideHide.apply(this);
            this._container.off("click");
            this._container.off("focus");
        },
    }

    function attachOutsideHide() {
        $(document).on("click", $.proxy(this._outSideClick, this));
    }
    function detachOutsideHide() {
        $(document).off("click", this._outSideClick);
    }
    function attachWindowResize() {
        $(window).on("resize", $.proxy(this._onResize, this))
    }
    function detachWindowResize() {
        $(window).off("resize", this._onResize)
    }

    function loadPlugin() {
        var config = this.config;
        if (config.grid) {
            if (config.grid.data) {
                this._initGrid(this._resizableDiv, config.grid);
            }
        }
        else if (config.tree) {
            if (config.tree.data) {
                this._initTree(this._resizableDiv, config.tree);
            }
        }
    }

    function hideOthers(target) {
        var all = $(".mcdd-maincontainer");
        all.each(function () {
            var _this = $(this).find("input").data(JSDROPDWON_DATA_KEY);
            if (_this._dropDownDiv[0] != target[0])
                _this.hideDropDown.apply(_this);
        })
    }
    //function dynamicHeight(topSpace, bottomSpace) {
    //    if (bottomSpace > topSpace || bottomSpace > this.minDropDownHeight) {
    //        return Math.min(this.maxDropDownHeight, bottomSpace);
    //    } else {
    //        return Math.min(this.maxDropDownHeight, topSpace);
    //    }
    //}

    window.jsDropDown = jsDropDown;
}(window, jQuery));

//Grid plugin   
(function (jsDropDown, $) {
    $.extend(jsDropDown.prototype, {
        _initGrid: function (parentElement, config, forceCreate) {
            if (forceCreate || !(this.grid && this.grid())) {
                var _this = this;
                var gridElement = $(".mcdd-grid", parentElement);
                if (gridElement.length == 0) {
                    gridElement = $("<div class='mcdd-grid'>");
                    parentElement.append(gridElement);
                }

                var element = this._container;
                var gridDefaults = {
                    width: "100%",
                    height: "100%",

                    filtering: true,
                    selecting: true,

                    sorting: false,
                    heading: false,
                    inserting: false,
                    editing: false,
                    paging: false,
                    multiSelect: true,

                    controller: {
                        loadData: function (filter) {
                            return searchRow(config.data, filter);
                        }
                    }
                };

                var gridSettings = $.extend(gridDefaults, config);

                if (config.data && Array.isArray(config.data) && config.data.length > 0) {
                    this.hideNoData();
                    var fields = gridSettings.fields || getFieldsFormData(gridSettings.data);
                    var settings = $.extend({
                        fields: fields,
                        rowClick: function (args) {
                            var value = "";
                            for (var i = 0; i < args.selectedItems.length; i++) {
                                value += args.selectedItems[i].item[fields[0].name] + ";";
                            }
                            value = value.substr(0, value.length - 1);
                            element.val(value).change();
                            if (_this.hideOnRowClick) {
                                _this.hideDropDown();
                            }
                        }
                    }, gridSettings);

                    gridElement.jsGrid(settings);
                    gridElement.data("JSGrid").jsDropDown = this;
                } else {
                    this.showNoData();
                }

                $.extend(this, {
                    grid: function () {
                        return gridElement.data("JSGrid");
                    }
                });
            }
        },
        refreshGrid: function (data) {
            //if (!(this.grid && this.grid())) {
            this.config.grid.data = data;
            this._initGrid(this._resizableDiv, this.config.grid, true);

            //} else {
            //    var grid = this.grid();
            //    grid.data = data;
            //    grid.refresh();
            //}
        },
        resizeGrid: function () {
            if (this.grid && this.grid()) {
                this.grid().render();
            }
        },
    })
    function searchRow(data, filter) {
        var filterData = $.grep(data, function (client) {
            var found = true;
            for (var prop in filter) {
                if (filter[prop] && client[prop].indexOf(filter[prop]) == -1) {
                    found = false;
                }
            }
            return found;
        });

        return filterData;
    }
    function getFieldsFormData(data) {
        var fields = [];
        for (var prop in data[0]) {
            if (data[0].hasOwnProperty(prop)) {
                fields.push({ name: prop, type: "text" })
            }
        }

        return fields;
    }
}(jsDropDown, jQuery));

//Tree plugin
(function (jsDropDown, $) {
    $.extend(jsDropDown.prototype, {
        _initTree: function (parentElement, config, forceCreate) {
            if (forceCreate || !(this.tree && this.tree())) {
                var _this = this;
                var treeElement = $(".mcdd-tree", treeElement);
                var treeItemWrapper = $(".mcdd-tree-wrapper", treeElement);

                if (treeElement.length == 0) {
                    treeElement = $("<div class='mcdd-tree'>");
                    treeItemWrapper = $("<div class='mcdd-tree-wrapper'>");
                    treeItemWrapper.append(treeElement);
                    parentElement.append(treeItemWrapper);
                }

                var element = this._container;

                var settings = {
                    core: {
                    }
                };

                $.extend(settings.core, config);

                if (config.data && Array.isArray(config.data) && config.data.length > 0) {
                    this.hideNoData();
                    treeElement.on('select_node.jstree', function (e, data) {
                        if (typeof config.rowClick == "function") {
                            config.rowClick(getTreeData(data));
                        } else {
                            element.val(getTreeData(data)[0]).change().trigger("input");
                            if (_this.hideOnRowClick) {
                                _this.hideDropDown();
                            }
                        }
                    }).jstree(settings);
                    treeElement.data("jstree").jsDropDown = this;

                } else {
                    this.showNoData();
                }

                $.extend(this, {
                    tree: function () {
                        return treeElement.data("jstree");
                    }
                });
            }
        },
        refreshTree: function (data) {
            //if (!(this.tree && this.tree())) {
            this.config.tree.data = data;
            this._initTree(this._resizableDiv, this.config.tree, true);

            //} else {
            //    var tree = this.tree();
            //    tree.data = data;
            //    tree.refresh();
            //}
        }
    });
    function getTreeData(data) {
        var i, j, r = [];
        for (i = 0, j = data.selected.length; i < j; i++) {
            r.push(data.instance.get_node(data.selected[i]).text);
        }
        return r;
    }
}(jsDropDown, jQuery));
