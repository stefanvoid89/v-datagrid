export default{
  data:function(){
    return {
      icons:{
        arrow_up:' <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M15 20H9v-8H4.16L12 4.16L19.84 12H15v8z" fill="#626262" /></svg>',
        arrow_down:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M9 4h6v8h4.84L12 19.84L4.16 12H9V4z" fill="#626262" /></svg>'  , 
        arrow_up_down:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M16 10h6L12 0L2 10h6v4H2l10 10l10-10h-6v-4m-2 6h3l-5 5l-5-5h3V8H7l5-5l5 5h-3v8z" fill="#626262"/></svg>',
        filter_outline:'   <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M15 19.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0L9.29 16.7a.989.989 0 0 1-.29-.83v-5.12L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L15 10.75v9.13M7.04 5L11 10.06v5.52l2 2v-7.53L16.96 5H7.04z" fill="#626262" /></svg>',
        filter:' <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0l-2.01-2.01a.989.989 0 0 1-.29-.83V12h-.03L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L14.03 12H14z" fill="#626262" /></svg>'
            }
    }
  },
    methods:{
        getScrollBarWidth() {
            var inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";
        
            var outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild(inner);
        
            document.body.appendChild(outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
        
            if (w1 == w2) {
                w2 = outer.clientWidth;
            }
        
            document.body.removeChild(outer);
        
            return (w1 - w2);
        }
    },
    created:function(){
        Array.prototype.sortBySimple = (function() {
          
            var sorters = {
              string: function(a, b) {
                if (a < b) {
                  return -1;
                } else if (a > b) {
                  return 1;
                } else {
                  return 0;
                }
              },
          
              number: function(a, b) {
                return a - b;
              }
            };
          
            return function(prop) {
              if( typeof(prop) === "undefined" || prop === null ) return this;
              var type = typeof this[0][prop] || 'string';
              return this.sort(function(a, b) {
                return sorters[type](a[prop], b[prop]);
              });
            };
          })();


          Array.prototype.sortBy = (function() {
          
            var sorters = {
              string: function(a, b, order) {
                if (a < b) {
                  return -1 * order;
                } else if (a > b) {
                  return 1 * order;
                } else {
                  return 0;
                }
              },
          
              number: function(a, b,order) {
                return (a - b) * order;
              }
            };
          
            return function({column, order}) {
              if( typeof(order) === "undefined" || order === null || order === 0 ) return this;
              var type = typeof this[0][column] || 'string';
              return this.sort(function(a, b) {
                return sorters[type](a[column], b[column],order);
              });
            };
          })();

      
    }
  
}
