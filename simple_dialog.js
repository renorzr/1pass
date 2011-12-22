function SimpleDialog(opts) {
  var self = this;

  var dlg_id  = Math.floor(Math.random()*10000000);
  var fields  = opts.fields;
  var buttons = opts.buttons;

  self.initialize = function(opts){
    var style = self.createStyle(opts.style);

    self.container = self.addElement(document.body, 'div', {style:style});
    self.border    = self.addElement(self.container, 'div', {style:'border:1px gray solid'});
    self.title     = self.addElement(self.border, 'div', opts.title, {style: 'background-color:#333333;color:white;padding:3px'});
    self.inside    = self.addElement(self.border, 'table');
    self.actions   = self.addElement(self.border, 'div', {style: 'background-color:#eeeeee;padding:3px'});

    for (var key in fields) {
      var opts = fields[key];
      if (typeof(opts)=='string') opts = {val: opts};
      self.addField(key, opts);
    }

    for (var key in buttons) {
      var opts = buttons[key];
      if (typeof(opts)=='function') opts = {callback: opts};
      self.addButton(key, opts)
    }
  }

  self.createStyle = function(style) {
    if (!style) style = {}
    var width  = style.width ? style.width : 600;
    var height = style.height ? style.height : 50;
    var top    = style.top ? style.top : 100;
    var left   = style.left ? style.left: (document.body.clientWidth - width) / 2;

    return 'top:'+top+';left:'+left+';width:'+width+'px;height:'+height+'px;position:absolute;'
  }

  self.addField = function(key, opts) {
    var title   = opts.title ? opts.title : key;

    var row = self.addElement(self.inside, 'tr');
    self.addElement(row, 'td', title);
    var field_td = self.addElement(row, 'td');
    self.addFieldElement(field_td, key, opts);
  }

  self.addButton = function(key, opts) {
    var title  = opts.title ? opts.title : key;
    var button = self.addElement(self.actions, 'input', {type: 'button', value: title, style: 'display:inline-block'});
    button.onclick = function(){opts.callback(self)};
  }

  self.setFieldValue = function(key, val) {
    self.getFieldElement(key).value = val;
  }

  self.getFieldValue = function(key) {
    return self.getFieldElement(key).value;
  }

  self.getValues = function() {
    var values = {};

    for (var key in fields) {
      values[key] = self.getFieldValue(key);
    }

    return values;
  }

  self.addElement = function(parentElement, tag, text, attr) {
    var e = self.createElement(tag, text, attr);
    parentElement.appendChild(e);

    return e;
  }

  self.createElement = function(tag, text, attr) {
    if (typeof(text)!='string') {
      attr = text;
      text = null;
    }

    var elem = document.createElement(tag);
    if (text) {
      elem.innerHTML = text;
    }

    if (attr) {
      for (var key in attr) {
        var val = attr[key];
        elem.setAttribute(key, val);
      }
    }

    return elem;
  }

  self.getFieldTag = function(opts) {
    var type = opts.type;

    if (type) {
      return type=='password' ? 'input' : type;
    } else {
      switch(typeof(opts.val)) {
        case 'boolean':
          return 'checkbox';
          return 
        case 'string':
          return 'input';
      }
    }
  }

  self.addFieldElement = function(parentElement, key, opts) {
    var tag     = self.getFieldTag(opts);
    var type    = opts.type == 'password' ? opts.type : null;
    var fieldId = self.getFieldId(key);

    self.addElement(parentElement, tag, {'id': fieldId, name: key, type: type, value: opts.val})
  }

  self.getFieldId = function(key) {
    return 'sd'+dlg_id+'-field-'+key;
  }

  self.getFieldElement = function(key) {
    var fieldId = self.getFieldId(key);
    return document.getElementById(fieldId);
  }

  self.close = function() {
    self.container.setAttribute('style', 'display:none');
  }

  self.initialize(opts);

}

