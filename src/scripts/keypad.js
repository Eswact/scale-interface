/** KeypadJS By Bekobi @2022-01 */

var HTML_MOD_TYPES = {
    DEFAULT: 0,
    EREN: 1,
}
function TryParseInt(value, defaultValue) {
    try {
        var value = parseInt(value);
        if (isNaN(value)) {
            return defaultValue;
        }
        return value;
    } catch (error) {
        return defaultValue;
    }
}

function TryParseFloat(value, defaultValue) {
    try {
        var value = parseFloat(value);
        if (isNaN(value)) {
            return defaultValue;
        }
        return value;
    } catch (error) {
        return defaultValue;
    }
}

function Keypad(target, options, params) {
    params = params || {}
    var default_params = {
        html_mod: HTML_MOD_TYPES.DEFAULT,
    }
    Object.assign(default_params, params);
    // asap(B):  generateFrom metodunda olduğu gibi target olarak direkt htmldivelement gelebilir ona da dikkat!
    this._dom = document.querySelector(target);
    if (this._dom === null || this._dom === undefined) {
        console.error("Keypad target not found!");
        return;
    }
    this._states = [];
    this._injectHTML(default_params);
    this._inputField = this._dom.querySelector(".keypad-header input");
    this._leftActionButton = this._dom.querySelector("button.keypad-action-button-left");
    this._rightActionButton = this._dom.querySelector("button.keypad-action-button-right");
    this._deleteButton = this._dom.querySelector(".keypad-delete-button");
    this._applyOptions(options);
    this._bindEvents();
    this.addState(this._options);
}

Keypad.prototype = {
    /** PRIVATE METHODS */
    _applyOptions: function (options) {
        this._options = options || {};
        this._options.deleteTimeout = this._options.deleteTimeout || 240;
        this._options.showDeleteButton = this._options.showDeleteButton === undefined ? true : !!this._options.showDeleteButton;
        this._options.showInput = this._options.showInput === undefined ? true : !!this._options.showInput;
        this._options.leftAction = this._options.leftAction || this._getDefaultLeftAction();
        this._options.rightAction = this._options.rightAction || this._getDefaultRightAction();
        this._options.leftActionContent = this._options.leftActionContent || ",";
        this._options.rightActionContent = this._options.rightActionContent || "x";
        this._options.leftActionDisabled = this._options.leftActionDisabled === undefined ? false : !!this._options.leftActionDisabled;
        this._options.rightActionDisabled = this._options.rightActionDisabled === undefined ? false : !!this._options.rightActionDisabled;
        this._options.initialValue = this._options.initialValue || "";
        this._options.watcher = this._options.watcher || this._getDefaultWatcher();
        this._options.statename = this._options.statename || "default";
        this._options.placeholder = this._options.placeholder || "";

        this._deleteButton.style.display = this._options.showDeleteButton ? "initial" : "none";
        this._inputField.type = this._options.showInput ? "text" : "password";
        this._inputField.value = this._options.initialValue;
        this._inputField.placeholder = this._options.placeholder;
        this._leftActionButton.disabled = this._options.leftActionDisabled ? true : false;
        this._rightActionButton.disabled = this._options.rightActionDisabled ? true : false;
        this._leftActionButton.innerHTML = this._options.leftActionDisabled ? "" : this._options.leftActionContent;
        this._rightActionButton.innerHTML = this._options.rightActionDisabled ? "" : this._options.rightActionContent;

        this._watcher = this._options.watcher
        this._onLeftActionButtonClicked = this._options.leftAction;
        this._onRightActionButtonClicked = this._options.rightAction;
        this._currentState = this._options.statename;
        this._updateState();
    },
    
    _injectHTML: function (params) {    

        var _node = document.createElement("div");
        _node.classList.add("keypad-wrapper");
        if (params.html_mod == HTML_MOD_TYPES.EREN) {
            _node.innerHTML = `<div class="keypad-header">
                                    <input type="text" readonly/>
                                </div>
                                <div class="keypad-grid">
                                    <div class="keypad-number-buttons">
                                        <button class="keypad-numeric-button keypad-button">7</button>
                                        <button class="keypad-numeric-button keypad-button">8</button>
                                        <button class="keypad-numeric-button keypad-button">9</button>
                                        <button class="keypad-numeric-button keypad-button">4</button>
                                        <button class="keypad-numeric-button keypad-button">5</button>
                                        <button class="keypad-numeric-button keypad-button">6</button>
                                        <button class="keypad-numeric-button keypad-button">1</button>
                                        <button class="keypad-numeric-button keypad-button">2</button>
                                        <button class="keypad-numeric-button keypad-button">3</button>
                                        <button class="keypad-action-button-left keypad-button">,</button>
                                        <button class="keypad-numeric-button keypad-button">0</button>
                                        <button title="yazdır" id="printProductButton" class="keypad-button"><i class="fa-solid fa-print" style="font-family: \'FontAwesome\';"></i></button>
                                    </div>
                                    <div class="keypad-right-buttons">
                                        <button class="keypad-delete-button keypad-button"><i class="fa fa-arrow-left" style="font-family: \'FontAwesome\';"></i></button>
                                        <button class="keypad-action-button-right keypad-button">x</button>
                                    </div>
                                </div>`;
        }
        else { // DEFAULT
            _node.innerHTML = '<div class="keypad-header">\
                                    <input type="text" readonly/>\
                                    <button class="keypad-delete-button keypad-button" style="min-width: 2em;"><i class="fa fa-arrow-left" style="font-family: \'FontAwesome\';"></i></button>\
                                </div>\
                                <div class="keypad-row">\
                                    <button class="keypad-numeric-button keypad-button">7</button>\
                                    <button class="keypad-numeric-button keypad-button">8</button>\
                                    <button class="keypad-numeric-button keypad-button">9</button>\
                                </div>\
                                <div class="keypad-row">\
                                    <button class="keypad-numeric-button keypad-button">4</button>\
                                    <button class="keypad-numeric-button keypad-button">5</button>\
                                    <button class="keypad-numeric-button keypad-button">6</button>\
                                </div>\
                                <div class="keypad-row">\
                                    <button class="keypad-numeric-button keypad-button">1</button>\
                                    <button class="keypad-numeric-button keypad-button">2</button>\
                                    <button class="keypad-numeric-button keypad-button">3</button>\
                                </div>\
                                <div class="keypad-row">\
                                    <button class="keypad-action-button-left keypad-button">,</button>\
                                    <button class="keypad-numeric-button keypad-button">0</button>\
                                    <button class="keypad-action-button-right keypad-button">x</button>\
                                </div>';
            
        }
        this._dom.appendChild(_node);
    },
    _bindEvents: function () {
        var self = this;
        this._dom
            .querySelectorAll(".keypad-numeric-button")
            .forEach(function (element) {
                var value = element.innerHTML;
                element.addEventListener("click", function () {
                    self._blinkKey(element);
                    self._onNumericKeyClicked(value);
                });
            });
        var timer;
        var ondown = false;
        this._deleteButton.addEventListener("click", function () {
            if (!ondown) {
                self._blinkKey(self._deleteButton);
                self._onDeleteKeyClicked();
            }
        });
        this._deleteButton.addEventListener("touchstart", function () {
            clearTimeout(timer);
            ondown = false;
            timer = setTimeout(function () {
                ondown = true;
                self._removeChar(self._inputField.value.length);
            }, self._options.deleteTimeout);
        });
        this._deleteButton.addEventListener("touchend", function () {
            clearTimeout(timer);
        });

        this._leftActionButton.addEventListener("click", function () {
            self._blinkKey(self._leftActionButton);
            self._onLeftActionButtonClicked(self);
        });
        this._rightActionButton.addEventListener("click", function () {
            self._blinkKey(self._rightActionButton);
            self._onRightActionButtonClicked(self);
        });
    },
    triggerRightAction: function () {
        $(this._rightActionButton).trigger("click")
    },
    _onNumericKeyClicked: function (value) {
        this._writeChar(value);
    },
    _blinkKey: function (element) {
        element.classList.add("blink");
        setTimeout(function() {
            element.classList.remove("blink");
        }, 1);
    },
    _onDeleteKeyClicked: function () {
        this._removeChar(1);
    },
    _getDefaultLeftAction: function () {
        return function () {
            this._writeChar(",");
        }
    },
    _getDefaultRightAction: function () {
        return function () {
            console.log(this.getNumericValue(true));
        }
    },
    _getDefaultWatcher: function () {
        return function (keypad, char, prevVal, nextVal) {
            if (char == ",") {
                if (prevVal.length == 0) {
                    keypad.setValue("0,");
                    return false;
                }
                var hasComma = false;
                if ((hasComma = prevVal.indexOf(",") > -1)) {
                    return false;
                }
            }
            return true;
        }
    },
    _writeChar: function (char) {
        var nextVal = this._inputField.value + char;
        var prevVal = this._inputField.value;
        if (this._watcher(this, char, prevVal, nextVal)) {
            this.setValue(nextVal);
        }
    },
    _removeChar: function (count) {
        var nextVal = this._inputField.value.slice(0, -count);
        var prevVal = this._inputField.value;
        if (this._watcher(this, "", prevVal, nextVal)) {
            this.setValue(nextVal);
        }
    },
    /** PUBLIC METHODS */
    getNumericValue: function (do_reset) {
        var currentValue = this._inputField.value;
        if (!!do_reset && this._watcher(this, "", currentValue, "")) {
            this.setValue("");
        }
        currentValue = currentValue.replace(",", ".");
        return TryParseFloat(currentValue, 0);
    },
    getValue: function (do_reset) {
        var currentValue = this._inputField.value;
        if (!!do_reset && this._watcher(this, "", currentValue, "")) {
            this.setValue("");
        }
        return currentValue;
    },
    setValue: function (value) {
        this._inputField.value = value;
    },
    setOptions: function (options) {
        if (typeof (options) === "object") {
            var _options = this._options;
            Object
                .keys(_options)
                .forEach(function (_option_key) {
                    options[_option_key] = options[_option_key] === undefined ? _options[_option_key] : options[_option_key];
                });
            this._applyOptions(options);
        }
    },
    setWatcher: function (watcher) {
        if (typeof (watcher) === "function") {
            this._options.watcher = watcher;
            this._watcher = watcher;
            this._updateState();
        }
    },
    setLeftActionButton: function (leftAction) {
        if (typeof (leftAction) === "function") {
            this._options.leftAction = leftAction;
            this._onLeftActionButtonClicked = leftAction;
            this._updateState();
        }
    },
    setRightActionButton: function (rightAction) {
        if (typeof (rightAction) === "function") {
            this._options.rightAction = rightAction;
            this._onRightActionButtonClicked = rightAction;
            this._updateState();
        }
    },
    /** STATE METHODS */
    addState: function (options, set_immediate) {
        if (typeof (options) !== "object" ||
            typeof (options.statename) !== "string" ||
            options.statename.length === 0) {
            return;
        }
        var stateExists = this._states.findIndex(function (item) {
            return item.statename == options.statename;
        }) > -1;
        if (!stateExists) {
            this._states.push({
                statename: options.statename,
                options: options,
            });
            if (!!set_immediate) {
                this._applyOptions(options);
            }
        }
    },
    getStates: function () {
        return this._states.map(function (item) {
            return item.statename;
        })
    },
    getCurrentState: function () {
        return this._currentState;
    },
    removeState: function (statename) {
        var stateIndex = this._states.findIndex(function (item) {
            return item.statename == statename;
        });
        if (stateIndex > -1) {
            this._states.splice(stateIndex, 1);
        }
    },
    setState: function (statename, do_reset) {
        var stateIndex = this._states.findIndex(function (item) {
            return item.statename == statename;
        });
        if (stateIndex > -1) {
            var state = this._states[stateIndex];
            if (!!do_reset) {
                this.setValue("");
            }
            this._applyOptions(state.options);
        }
    },
    _updateState() {
        var statename = this._currentState;
        var state = this._states.find(function (item) {
            return item.statename == statename;
        });
        if (state !== undefined) {
            state.options = this._options;
        }
    },
}

Keypad.generateFrom = function (target, array, params) {
    params = params || {}
    var default_params = {
        html_mod: HTML_MOD_TYPES.DEFAULT,
    }

    Object.assign(default_params, params);
    var dom = document.querySelector(target);
    if (dom === null || dom === undefined) {
        console.error("Keypad target not found!");
        return;
    }
    if (array.constructor === Array && array.length > 0) {
        var keypad = new Keypad(target, array[0], params);
        for (var index = 1; index < array.length; index++) {
            var element = array[index];
            keypad.addState(array[index]);
        }
        return keypad;
    }
}
