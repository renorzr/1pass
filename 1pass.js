//== require simple_dialog
//== require webtoolkit.md5.js

!function(undefined){
  function baseX(n) {
    var alphabeta = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+{}|:"<>?document.body.clientWidth`-=[]\\;\',./';
    var base = alphabeta.length;
    if (n==0) return alphabeta[0]

    result = '';
    while (n > 0) {
      remainder = n % base;
      d         = alphabeta[remainder];
      n         = Math.floor(n / base);
      result    = d.concat(result);
    }

    return result;
  }

  function createPassword(values) {
    var seed  = values.host;
        seed += values.username;
        seed += values.main_password 
        seed += values.salt 

    var hash = MD5(seed);
    var hashLeft = hash.slice(0,16);

    return baseX(parseInt(hashLeft, 16));
  }

  var host = window.location.host;
  var fields = {
    host: host,
    username: '', 
    main_password: {val: '', title: 'Main Password', type: 'password'},
    salt: new Date().getFullYear()+'',
    site_password: {val:'', title: 'Site Password'},
  };

  var buttons = {
    generate: function(dlg) {
                var password = createPassword(dlg.getValues());
                dlg.setFieldValue('site_password', password);
              },
    close: function(dlg) { dlg.close(); }
  };

  new SimpleDialog({
    title: 'generate password', 
    style: {width: 350},
    fields: fields, 
    buttons: buttons
  });
}();
