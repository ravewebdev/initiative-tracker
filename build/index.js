!function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=27)}([function(t,e){!function(){t.exports=this.wp.element}()},function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(e)}t.exports=n},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.exports=function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}},function(t,e,n){var r=n(14),a=n(15);t.exports=function(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?a(t):e}},function(t,e,n){var r=n(16);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}},function(t,e,n){var r=n(11),a=n(12),i=n(9),c=n(13);t.exports=function(t){return r(t)||a(t)||i(t)||c()}},function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}},function(t,e,n){var r=n(8);t.exports=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}},function(t,e,n){var r=n(17),a=n(18),i=n(9),c=n(19);t.exports=function(t,e){return r(t)||a(t,e)||i(t,e)||c()}},function(t,e,n){var r=n(8);t.exports=function(t){if(Array.isArray(t))return r(t)}},function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(t,e){function n(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(e)}t.exports=n},function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},function(t,e){function n(e,r){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,r)}t.exports=n},function(t,e){t.exports=function(t){if(Array.isArray(t))return t}},function(t,e){t.exports=function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,a=!1,i=void 0;try{for(var c,o=t[Symbol.iterator]();!(r=(c=o.next()).done)&&(n.push(c.value),!e||n.length!==e);r=!0);}catch(t){a=!0,i=t}finally{try{r||null==o.return||o.return()}finally{if(a)throw i}}return n}}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},,,,,,,,function(t,e,n){"use strict";n.r(e);var r=n(7),a=n.n(r),i=n(6),c=n.n(i),o=n(0),l=n(2),u=n.n(l),s=n(3),f=n.n(s),p=n(4),m=n.n(p),y=n(1),d=n.n(y),b=n(5),v=n.n(b),h=n(10),O=n.n(h),j=wp,x=j.i18n.__,E=j.element.useState,g=j.components,C=g.Dashicon,k=g.Button,S=g.Modal,w=function(t){var e=t.name,n=t.index,r=t.type,a=t.deleteCharacter,i=E(!1),c=O()(i,2),l=c[0],u=c[1],s=function(){u(!l)};return Object(o.createElement)(o.Fragment,null,Object(o.createElement)(k,{className:"delete-character button-link-delete",onClick:s,isDestructive:!0},Object(o.createElement)(C,{icon:"trash"})),l&&Object(o.createElement)(S,{title:x("Delete Character: ","initiative-tracker")+e,onRequestClose:s},Object(o.createElement)("p",null," ",x("Are you sure you want to delete this character?")," "),Object(o.createElement)(k,{className:"is-button",isSecondary:!0,onClick:s},x("Cancel","initiative-tracker")),Object(o.createElement)(k,{className:"button-link-delete",isDestructive:!0,onClick:function(){a(r,n),s()}},x("Delete Character","initiative-tracker"))))};function P(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var N=wp,T=N.i18n.__,_=N.components,R=_.TextControl,I=_.Button,A=function(t){v()(r,t);var e,n=(e=r,function(){var t,n=d()(e);if(P()){var r=d()(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return m()(this,t)});function r(t){var e;return u()(this,r),(e=n.call(this,t)).state={name:null,player:null,initiative:0,nameIsEmpty:!0,playerIsEmpty:!0,editing:!1,index:null},e}return f()(r,[{key:"componentDidMount",value:function(){if(this.props.hasOwnProperty("character")){var t=this.props,e=t.character,n=e.name,r=e.player,a=e.initiative,i=e.index;t.type;this.setState({nameIsEmpty:!1,playerIsEmpty:!1,editing:!0,name:n,player:r,index:i,initiative:a})}}},{key:"render",value:function(){var t=this,e=this.state,n=e.name,r=e.player,a=e.initiative,i=e.nameIsEmpty,c=e.playerIsEmpty,l=e.editing,u=e.index,s=this.props,f=s.type,p=s.characterFn,m=s.toggle,y=s.buttonText,d="player"===f,b=d&&c||i;return Object(o.createElement)("div",{className:"edit-character-form"},Object(o.createElement)(R,{label:T("Character Name *","initiative-tracker"),value:n,onChange:function(e){t.setState({name:e,nameIsEmpty:""===e.trim()})},className:null!==n&&i?"input-error":""}),d&&Object(o.createElement)(R,{label:T("Player Name *","initiative-tracker"),value:r,onChange:function(e){t.setState({player:e,playerIsEmpty:""===e.trim()})},className:null!==r&&c?"input-error":""}),Object(o.createElement)(R,{label:T("Initiative","initiative-tracker"),type:"number",value:a,onChange:function(e){t.setState({initiative:e})}}),Object(o.createElement)(I,{isSecondary:!0,onClick:m},T("Cancel","initiative-tracker")),Object(o.createElement)(I,{isPrimary:!0,disabled:b,onClick:function(){l?p(f,u,{name:n.trim(),player:d?r.trim():"",initiative:a}):p(f,{name:n.trim(),player:d?r.trim():"",initiative:a}),m()}},y))}}]),r}(N.element.Component);function D(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var F=wp,M=F.element.Component,B=F.components,q=B.Dashicon,z=B.Button,U=function(t){v()(r,t);var e,n=(e=r,function(){var t,n=d()(e);if(D()){var r=d()(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return m()(this,t)});function r(t){var e;return u()(this,r),(e=n.call(this,t)).state={editing:!1},e}return f()(r,[{key:"render",value:function(){var t=this,e=this.state.editing,n=this.props,r=n.character,a=r.name,i=r.player,c=r.initiative,l=n.type,u=n.index,s=n.editCharacter,f=n.deleteCharacter,p=n.editText,m=n.active,y=function(){t.setState({editing:!e})};return e?Object(o.createElement)(A,{type:l,characterFn:s,buttonText:p,toggle:y,character:{name:a,player:i,initiative:c,index:u}}):Object(o.createElement)("li",{className:"character"},Object(o.createElement)("span",{className:"name"},a),!m&&Object(o.createElement)("span",{className:"player"}," ( ".concat(""===i?"NPC":i," ) ")),Object(o.createElement)("span",{className:"initiative"}," - ".concat(c)),m&&Object(o.createElement)(o.Fragment,null,Object(o.createElement)(z,{className:"edit-character",isTertiary:!0,onClick:y},Object(o.createElement)(q,{icon:"edit"})),Object(o.createElement)(w,{index:u,deleteCharacter:f,name:a,type:l})))}}]),r}(M);function $(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var G=wp,H=G.components.Button,J=function(t){v()(r,t);var e,n=(e=r,function(){var t,n=d()(e);if($()){var r=d()(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return m()(this,t)});function r(t){var e;return u()(this,r),(e=n.call(this,t)).state={adding:!1},e}return f()(r,[{key:"render",value:function(){var t=this,e=this.state.adding,n=this.props,r=n.title,a=n.characters,i=n.type,c=n.addCharacter,l=n.editCharacter,u=n.deleteCharacter,s=n.addText,f=n.editText,p=n.active;return p||a.sort((function(t,e){return t.initiative>e.initiative?-1:1})),Object(o.createElement)("div",{className:"character-list".concat(void 0===i?"":"--".concat(i))},Object(o.createElement)("h2",null,r),a.length>0&&Object(o.createElement)("ul",null,a.map((function(t,e){return p?Object(o.createElement)(U,{character:t,type:i,index:e,editCharacter:l,deleteCharacter:u,editText:f,active:p}):Object(o.createElement)(U,{character:t,active:p})}))),p&&(e?Object(o.createElement)(A,{type:i,characterFn:c,buttonText:s,toggle:function(){t.setState({adding:!e})}}):Object(o.createElement)(H,{isPrimary:!0,onClick:function(){t.setState({adding:!0})}},s)))}}]),r}(G.element.Component),K=wp,L=K.i18n.__,Q=K.blockEditor.RichText,V=function(t){var e=t.attributes,n=e.notes,r=e.players,i=e.npcs,l=t.className,u=t.setAttributes,s=t.isSelected,f=function(t){return t.sort((function(t,e){return t.name.localeCompare(e.name)})),t},p=function(e,n){e="".concat(e,"s");var r=[].concat(c()(t.attributes[e]),[n]);u(a()({},e,f(r)))},m=function(e,n,r){e="".concat(e,"s");var i=c()(t.attributes[e]);i[n]=r,u(a()({},e,f(i)))},y=function(e,n){e="".concat(e,"s");var r=c()(t.attributes[e]).filter((function(t,e){return e!==n}),n);u(a()({},e,r))};return Object(o.createElement)("div",{className:l},Object(o.createElement)("h2",null,L("Combat Notes","initiative-tracker")),Object(o.createElement)(Q,{tagName:"div",multiline:"p",className:"notes",placeholder:L("Enter notes about this combat here...","initiative-tracker"),keepPlaceholderOnFocus:!0,onChange:function(t){u({notes:t})},value:n}),Object(o.createElement)("div",{className:"characters"},s&&Object(o.createElement)(o.Fragment,null,Object(o.createElement)(J,{title:L("Players","initiative-tracker"),characters:r,addCharacter:p,editCharacter:m,deleteCharacter:y,type:"player",addText:L("Add Player","initiative-tracker"),editText:L("Edit Player","initiative-tracker"),active:s}),Object(o.createElement)(J,{title:L("NPCs","initiative-tracker"),characters:i,addCharacter:p,editCharacter:m,deleteCharacter:y,type:"npc",addText:L("Add NPC","initiative-tracker"),editText:L("Edit NPC","initiative-tracker"),active:s})),!s&&Object(o.createElement)(J,{title:L("Characters","initiative-tracker"),characters:[].concat(c()(r),c()(i)),active:s})))},W=function(t){return null},X=wp,Y=X.i18n.__;(0,X.blocks.registerBlockType)("rave/initiative-tracker",{title:Y("Initiative Tracker","initiative-tracker"),description:Y("This block helps track and organize character initiative scores.","initiative-tracker"),icon:"list-view",category:"widgets",keywords:[Y("richtext","initiative-tracker")],supports:{html:!1},attributes:{notes:{type:"string"},players:{type:"array",default:[]},npcs:{type:"array",default:[]}},edit:V,save:W})}]);