/*
 Chosen, a Select Box Enhancer for jQuery and Prototype
 by Patrick Filler for Harvest, http://getharvest.com

 Version 1.2.0
 Full source at https://github.com/harvesthq/chosen
 Copyright (c) 2011-2014 Harvest http://getharvest.com

 MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
 This file is generated by `grunt build`, do not edit it by hand.
 */
;(function(f){var a,g,d,e,b={}.hasOwnProperty,c=function(k,i){for(var h in i){if(b.call(i,h)){k[h]=i[h]}}function j(){this.constructor=k}j.prototype=i.prototype;k.prototype=new j();k.__super__=i.prototype;return k};d=(function(){function h(){this.options_index=0;this.parsed=[]}h.prototype.add_node=function(i){if(i.nodeName.toUpperCase()==="OPTGROUP"){return this.add_group(i)}else{return this.add_option(i)}};h.prototype.add_group=function(o){var n,k,m,j,l,i;n=this.parsed.length;this.parsed.push({array_index:n,group:true,label:this.escapeExpression(o.label),children:0,disabled:o.disabled});l=o.childNodes;i=[];for(m=0,j=l.length;m<j;m++){k=l[m];i.push(this.add_option(k,n,o.disabled))}return i};h.prototype.add_option=function(j,k,i){if(j.nodeName.toUpperCase()==="OPTION"){if(j.text!==""){if(k!=null){this.parsed[k].children+=1}this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:j.value,text:j.text,html:j.innerHTML,selected:j.selected,disabled:i===true?i:j.disabled,group_array_index:k,classes:j.className,style:j.style.cssText})}else{this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:true})}return this.options_index+=1}};h.prototype.escapeExpression=function(k){var j,i;if((k==null)||k===false){return""}if(!/[\&\<\>\"\'\`]/.test(k)){return k}j={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};i=/&(?!\w+;)|[\<\>\"\'\`]/g;return k.replace(i,function(l){return j[l]||"&amp;"})};return h})();d.select_to_array=function(h){var m,l,k,i,j;l=new d();j=h.childNodes;for(k=0,i=j.length;k<i;k++){m=j[k];l.add_node(m)}return l.parsed};a=(function(){function h(i,j){this.form_field=i;this.options=j!=null?j:{};if(!h.browser_is_supported()){return}this.is_multiple=this.form_field.multiple;this.set_default_text();this.set_default_values();this.setup();this.set_up_html();this.register_observers()}h.prototype.set_default_values=function(){var i=this;this.click_test_action=function(j){return i.test_active_click(j)};this.activate_action=function(j){return i.activate_field(j)};this.active_field=false;this.mouse_on_container=false;this.results_showing=false;this.result_highlighted=null;this.allow_single_deselect=(this.options.allow_single_deselect!=null)&&(this.form_field.options[0]!=null)&&this.form_field.options[0].text===""?this.options.allow_single_deselect:false;this.disable_search_threshold=this.options.disable_search_threshold||0;this.disable_search=this.options.disable_search||false;this.enable_split_word_search=this.options.enable_split_word_search!=null?this.options.enable_split_word_search:true;this.group_search=this.options.group_search!=null?this.options.group_search:true;this.search_contains=this.options.search_contains||false;this.single_backstroke_delete=this.options.single_backstroke_delete!=null?this.options.single_backstroke_delete:true;this.max_selected_options=this.options.max_selected_options||Infinity;this.inherit_select_classes=this.options.inherit_select_classes||false;this.display_selected_options=this.options.display_selected_options!=null?this.options.display_selected_options:true;return this.display_disabled_options=this.options.display_disabled_options!=null?this.options.display_disabled_options:true};h.prototype.set_default_text=function(){if(this.form_field.getAttribute("data-placeholder")){this.default_text=this.form_field.getAttribute("data-placeholder")}else{if(this.is_multiple){this.default_text=this.options.placeholder_text_multiple||this.options.placeholder_text||h.default_multiple_text}else{this.default_text=this.options.placeholder_text_single||this.options.placeholder_text||h.default_single_text}}return this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||h.default_no_result_text};h.prototype.mouse_enter=function(){return this.mouse_on_container=true};h.prototype.mouse_leave=function(){return this.mouse_on_container=false};h.prototype.input_focus=function(i){var j=this;if(this.is_multiple){if(!this.active_field){return setTimeout((function(){return j.container_mousedown()}),50)}}else{if(!this.active_field){return this.activate_field()}}};h.prototype.input_blur=function(i){var j=this;if(!this.mouse_on_container){this.active_field=false;return setTimeout((function(){return j.blur_test()}),100)}};h.prototype.results_option_build=function(j){var k,n,m,i,l;k="";l=this.results_data;for(m=0,i=l.length;m<i;m++){n=l[m];if(n.group){k+=this.result_add_group(n)}else{k+=this.result_add_option(n)}if(j!=null?j.first:void 0){if(n.selected&&this.is_multiple){this.choice_build(n)}else{if(n.selected&&!this.is_multiple){this.single_set_selected_text(n.text)}}}}return k};h.prototype.result_add_option=function(k){var j,i;if(!k.search_match){return""}if(!this.include_option_in_results(k)){return""}j=[];if(!k.disabled&&!(k.selected&&this.is_multiple)){j.push("active-result")}if(k.disabled&&!(k.selected&&this.is_multiple)){j.push("disabled-result")}if(k.selected){j.push("result-selected")}if(k.group_array_index!=null){j.push("group-option")}if(k.classes!==""){j.push(k.classes)}i=document.createElement("li");i.className=j.join(" ");i.style.cssText=k.style;i.setAttribute("data-option-array-index",k.array_index);i.innerHTML=k.search_text;return this.outerHTML(i)};h.prototype.result_add_group=function(j){var i;if(!(j.search_match||j.group_match)){return""}if(!(j.active_options>0)){return""}i=document.createElement("li");i.className="group-result";i.innerHTML=j.search_text;return this.outerHTML(i)};h.prototype.results_update_field=function(){this.set_default_text();if(!this.is_multiple){this.results_reset_cleanup()}this.result_clear_highlight();this.results_build();if(this.results_showing){return this.winnow_results()}};h.prototype.results_resized_field=function(){this.container.width(this.container_width())};h.prototype.reset_single_select_options=function(){var i,m,k,l,j;l=this.results_data;j=[];for(m=0,k=l.length;m<k;m++){i=l[m];if(i.selected){j.push(i.selected=false)}else{j.push(void 0)}}return j};h.prototype.results_toggle=function(){if(this.results_showing){return this.results_hide()}else{return this.results_show()}};h.prototype.results_search=function(i){if(this.results_showing){return this.winnow_results()}else{return this.results_show()}};h.prototype.winnow_results=function(){var i,s,l,u,y,w,v,r,m,j,z,p;this.no_results_clear();u=0;w=this.get_search_text();i=w.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");m=new RegExp(i,"i");l=this.get_search_regex(i);p=this.results_data;var n=this;var k=f.getPinyinFirst(i);for(j=0,z=p.length;j<z;j++){s=p[j];s.search_match=false;y=null;if(this.include_option_in_results(s)){if(s.group){s.group_match=false;s.active_options=0}if((s.group_array_index!=null)&&this.results_data[s.group_array_index]){y=this.results_data[s.group_array_index];if(y.active_options===0&&y.search_match){u+=1}y.active_options+=1}if(!(s.group&&!this.group_search)){s.search_text=s.group?s.label:s.text;s.search_match=this.search_string_match(s.search_text,l);if(!s.search_match&&/^[A-Za-z\s]+$/.test(i)){if(f.getPinyinFirst){var x=null;var A=f.getPinyinFirst(s.search_text);f.each(k||[],function(C,D){if(f.founded(D||"")){x=new RegExp(D,"i");f.each(A||[],function(F,E){if(f.founded(E||"")){s.search_match=n.search_string_match(E,x);v=E.search(x);return !s.search_match}});return !s.search_match}})}}if(s.search_match&&!s.group){u+=1}if(s.search_match){if(w.length){if(!f.defined(v)){v=s.search_text.search(m)}r=s.search_text.substr(0,v+w.length)+"</em>"+s.search_text.substr(v+w.length);s.search_text=r.substr(0,v)+"<em>"+r.substr(v)}if(y!=null){y.group_match=true}}else{if((s.group_array_index!=null)&&this.results_data[s.group_array_index].search_match){s.search_match=true}}}}}this.result_clear_highlight();var B=this.container.closest(".bootbox");if(u<1&&w.length){this.update_results_content("");if(this.container.hasClass("chosen-container-up")){var q=parseInt(this.container.find(".chosen-drop").height());var o=parseInt(this.container.find(".chosen-single").height());var t=parseInt(this.container.height());console.log(q);if(f(B).size()>0){this.container.find(".chosen-drop").css({top:-(q+o-3)+"px"})}else{this.container.find(".chosen-drop").css({top:-(q+o+t-7)+"px"})}}return this.no_results(w)}else{this.update_results_content(this.results_option_build());if(this.container.hasClass("chosen-container-up")){var q=parseInt(this.container.find(".chosen-drop").height());this.container.find(".chosen-drop").css({top:-q+"px"})}return this.winnow_results_set_highlight()}};h.prototype.get_search_regex=function(j){var i;i=this.search_contains?"":"^";return new RegExp(i+j,"i")};h.prototype.search_string_match=function(n,k){var j,m,l,i;if(k.test(n)){return true}else{if(this.enable_split_word_search&&(n.indexOf(" ")>=0||n.indexOf("[")===0)){m=n.replace(/\[|\]/g,"").split(" ");if(m.length){for(l=0,i=m.length;l<i;l++){j=m[l];if(k.test(j)){return true}}}}}};h.prototype.choices_count=function(){var j,l,i,k;if(this.selected_option_count!=null){return this.selected_option_count}this.selected_option_count=0;k=this.form_field.options;for(l=0,i=k.length;l<i;l++){j=k[l];if(j.selected){this.selected_option_count+=1}}return this.selected_option_count};h.prototype.choices_click=function(i){i.preventDefault();if(!(this.results_showing||this.is_disabled)){return this.results_show()}};h.prototype.keyup_checker=function(i){var k,j;k=(j=i.which)!=null?j:i.keyCode;this.search_field_scale();switch(k){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0){return this.keydown_backstroke()}else{if(!this.pending_backstroke){this.result_clear_highlight();return this.results_search()}}break;case 13:i.preventDefault();if(this.results_showing){return this.result_select(i)}break;case 27:if(this.results_showing){this.results_hide()}return true;case 9:case 38:case 40:case 16:case 91:case 17:break;default:return this.results_search()}};h.prototype.clipboard_event_checker=function(i){var j=this;return setTimeout((function(){return j.results_search()}),50)};h.prototype.container_width=function(){if(this.options.width!=null){return this.options.width}else{var j=f(this.form_field),i=0;if(j.parent().find("select.chosen-select").size()>1){i=j.show().outerWidth(true);j.hide();return""+i+"px"}else{i="100";return""+i+"%"}}};h.prototype.include_option_in_results=function(i){if(this.is_multiple&&(!this.display_selected_options&&i.selected)){return false}if(!this.display_disabled_options&&i.disabled){return false}if(i.empty){return false}return true};h.prototype.search_results_touchstart=function(i){this.touch_started=true;return this.search_results_mouseover(i)};h.prototype.search_results_touchmove=function(i){this.touch_started=false;return this.search_results_mouseout(i)};h.prototype.search_results_touchend=function(i){if(this.touch_started){return this.search_results_mouseup(i)}};h.prototype.outerHTML=function(j){var i;if(j.outerHTML){return j.outerHTML}i=document.createElement("div");i.appendChild(j);return i.innerHTML};h.browser_is_supported=function(){if(window.navigator.appName==="Microsoft Internet Explorer"){return document.documentMode>=8}if(/iP(od|hone)/i.test(window.navigator.userAgent)){return false}if(/Android/i.test(window.navigator.userAgent)){if(/Mobile/i.test(window.navigator.userAgent)){return false}}return true};h.default_multiple_text="Select Some Options";h.default_single_text="Select an Option";h.default_no_result_text="No results match";return h})();f.fn.extend({chosen:function(h){if(!a.browser_is_supported()){return this}return this.each(function(j){var k,i;k=f(this);i=k.data("chosen");if(h==="destroy"&&i instanceof g){i.destroy()}else{if(!(i instanceof g)){k.data("chosen",new g(this,h))}}})}});g=(function(h){c(i,h);function i(){e=i.__super__.constructor.apply(this,arguments);return e}i.prototype.setup=function(){this.form_field_jq=f(this.form_field);this.current_selectedIndex=this.form_field.selectedIndex;return this.is_rtl=this.form_field_jq.hasClass("chosen-rtl")};i.prototype.set_up_html=function(){var j,k;j=["chosen-container"];j.push("chosen-container-"+(this.is_multiple?"multi":"single"));if(this.inherit_select_classes&&this.form_field.className){j.push(this.form_field.className)}if(this.is_rtl){j.push("chosen-rtl")}k={"class":j.join(" "),style:"width: "+(this.container_width())+";",title:this.form_field.title};if(this.form_field.id.length){k.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chosen"}this.container=f("<div />",k);if(this.is_multiple){this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="'+this.default_text+'" class="default" autocomplete="off" name="autocomplete" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>')}else{this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>'+this.default_text+'</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" name="autocomplete" /></div><ul class="chosen-results"></ul></div>')}this.form_field_jq.hide().after(this.container);this.dropdown=this.container.find("div.chosen-drop").first();this.search_field=this.container.find("input").first();this.search_results=this.container.find("ul.chosen-results").first();this.search_field_scale();this.search_no_results=this.container.find("li.no-results").first();if(this.is_multiple){this.search_choices=this.container.find("ul.chosen-choices").first();this.search_container=this.container.find("li.search-field").first()}else{this.search_container=this.container.find("div.chosen-search").first();this.selected_item=this.container.find(".chosen-single").first()}this.results_build();this.set_tab_index();this.set_label_behavior();return this.form_field_jq.trigger("chosen:ready",{chosen:this})};i.prototype.register_observers=function(){var j=this;this.container.bind("touchstart.chosen",function(k){j.container_mousedown(k)});this.container.bind("touchend.chosen",function(k){j.container_mouseup(k)});this.container.bind("mousedown.chosen",function(k){j.container_mousedown(k)});this.container.bind("mouseup.chosen",function(k){j.container_mouseup(k)});this.container.bind("mouseenter.chosen",function(k){j.mouse_enter(k)});this.container.bind("mouseleave.chosen",function(k){j.mouse_leave(k)});this.search_results.bind("mouseup.chosen",function(k){j.search_results_mouseup(k)});this.search_results.bind("mouseover.chosen",function(k){j.search_results_mouseover(k)});this.search_results.bind("mouseout.chosen",function(k){j.search_results_mouseout(k)});this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen",function(k){j.search_results_mousewheel(k)});this.search_results.bind("touchstart.chosen",function(k){j.search_results_touchstart(k)});this.search_results.bind("touchmove.chosen",function(k){j.search_results_touchmove(k)});this.search_results.bind("touchend.chosen",function(k){j.search_results_touchend(k)});this.form_field_jq.bind("chosen:updated.chosen",function(k){j.results_update_field(k)});this.form_field_jq.bind("chosen:activate.chosen",function(k){j.activate_field(k)});this.form_field_jq.bind("chosen:resized.chosen",function(k){j.results_resized_field(k)});this.form_field_jq.bind("chosen:open.chosen",function(k){j.container_mousedown(k)});this.form_field_jq.bind("chosen:close.chosen",function(k){j.input_blur(k)});this.search_field.bind("blur.chosen",function(k){j.input_blur(k)});this.search_field.bind("keyup.chosen",function(k){j.keyup_checker(k)});this.search_field.bind("keydown.chosen",function(k){j.keydown_checker(k)});this.search_field.bind("focus.chosen",function(k){j.input_focus(k)});this.search_field.bind("cut.chosen",function(k){j.clipboard_event_checker(k)});this.search_field.bind("paste.chosen",function(k){j.clipboard_event_checker(k)});if(this.is_multiple){return this.search_choices.bind("click.chosen",function(k){j.choices_click(k)})}else{return this.container.bind("click.chosen",function(k){k.preventDefault()})}};i.prototype.destroy=function(){f(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action);if(this.search_field[0].tabIndex){this.form_field_jq[0].tabIndex=this.search_field[0].tabIndex}this.container.remove();this.form_field_jq.removeData("chosen");return this.form_field_jq.show()};i.prototype.search_field_disabled=function(){this.is_disabled=this.form_field_jq[0].disabled;if(this.is_disabled){this.container.addClass("chosen-disabled");this.search_field[0].disabled=true;if(!this.is_multiple){this.selected_item.unbind("focus.chosen",this.activate_action)}return this.close_field()}else{this.container.removeClass("chosen-disabled");this.search_field[0].disabled=false;if(!this.is_multiple){return this.selected_item.bind("focus.chosen",this.activate_action)}}};i.prototype.container_mousedown=function(j){if(!this.is_disabled){if(j&&j.type==="mousedown"&&!this.results_showing){j.preventDefault()}if(!((j!=null)&&(f(j.target)).hasClass("search-choice-close"))){if(!this.active_field){if(this.is_multiple){this.search_field.val("")}f(this.container[0].ownerDocument).bind("click.chosen",this.click_test_action);this.results_show()}else{if(!this.is_multiple&&j&&((f(j.target)[0]===this.selected_item[0])||f(j.target).parents("a.chosen-single").length)){j.preventDefault();this.results_toggle()}}return this.activate_field()}}};i.prototype.container_mouseup=function(j){if(j.target.nodeName==="ABBR"&&!this.is_disabled){return this.results_reset(j)}};i.prototype.search_results_mousewheel=function(j){var k;if(j.originalEvent){k=j.originalEvent.deltaY||-j.originalEvent.wheelDelta||j.originalEvent.detail}if(k!=null){j.preventDefault();if(j.type==="DOMMouseScroll"){k=k*40}return this.search_results.scrollTop(k+this.search_results.scrollTop())}};i.prototype.blur_test=function(j){if(!this.active_field&&this.container.hasClass("chosen-container-active")){return this.close_field()}};i.prototype.close_field=function(){f(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action);this.active_field=false;this.results_hide();this.container.removeClass("chosen-container-active");this.clear_backstroke();this.show_search_field_default();return this.search_field_scale()};i.prototype.activate_field=function(){var k=this.container.closest(".bootbox");var j=1010;if(f(k).size()>0){j=(parseInt(k.css("z-index")||"1050")+90);this.container.css("z-index",j);f(k).find(".chosen-container").not(this.container).css("z-index",--j)}else{this.container.css("z-index","1010");f(".chosen-container").not(this.container).css("z-index",--j)}this.container.addClass("chosen-container-active");this.active_field=true;this.search_field.val(this.search_field.val());return this.search_field.focus()};i.prototype.test_active_click=function(j){var k;k=f(j.target).closest(".chosen-container");if(k.length&&this.container[0]===k[0]){return this.active_field=true}else{return this.close_field()}};i.prototype.results_build=function(){this.parsing=true;this.selected_option_count=null;this.results_data=d.select_to_array(this.form_field);if(this.is_multiple){this.search_choices.find("li.search-choice").remove()}else{if(!this.is_multiple){this.single_set_selected_text();if(this.disable_search||this.form_field.options.length<=this.disable_search_threshold){this.search_field[0].readOnly=true;this.container.addClass("chosen-container-single-nosearch")}else{this.search_field[0].readOnly=false;this.container.removeClass("chosen-container-single-nosearch")}}}this.update_results_content(this.results_option_build({first:true}));this.search_field_disabled();this.show_search_field_default();this.search_field_scale();return this.parsing=false};i.prototype.result_do_highlight=function(k){var o,n,l,m,j;if(k.length){this.result_clear_highlight();this.result_highlight=k;this.result_highlight.addClass("highlighted");l=parseInt(this.search_results.css("maxHeight"),10);j=this.search_results.scrollTop();m=l+j;n=this.result_highlight.position().top+this.search_results.scrollTop();o=n+this.result_highlight.outerHeight();if(o>=m){return this.search_results.scrollTop((o-l)>0?o-l:0)}else{if(n<j){return this.search_results.scrollTop(n)}}}};i.prototype.result_clear_highlight=function(){if(this.result_highlight){this.result_highlight.removeClass("highlighted")}return this.result_highlight=null};i.prototype.results_show=function(){if(this.is_multiple&&this.max_selected_options<=this.choices_count()){this.form_field_jq.trigger("chosen:maxselected",{chosen:this});return false}this.container.addClass("chosen-with-drop");this.results_showing=true;this.search_field.focus();this.search_field.val(this.search_field.val());this.winnow_results();var z=this.container.closest(".bootbox");if(f(z).size()>0){var w=parseInt(z.find(".modal-body").css("max-height"));var m=parseInt(z.find(".modal-body").height());var r=z.find(".modal-body");var p=this.container.offset().top;var v=r.offset().top;var y=p-v;var j=m-y;if(m<300){r.css({overflow:"inherit"})}else{r.css({"overflow-x":"hidden"})}if(m>w){if((w/2)>j){this.container.addClass("chosen-container-up");var n=this.container.find(".chosen-drop");var q=parseInt(n.height());var s=parseInt(this.container.height());n.css({top:-(q)});if(this.container.find(".chosen-search").size()>0){var o=this.container.find(".chosen-search");var n=this.container.find(".chosen-drop");n.append(o)}}else{this.container.removeClass("chosen-container-up")}}else{if((m/3)>j){this.container.addClass("chosen-container-up");var n=this.container.find(".chosen-drop");var q=parseInt(n.height());var s=parseInt(this.container.height());n.css({top:-(q)});if(this.container.find(".chosen-search").size()>0){var o=this.container.find(".chosen-search");var n=this.container.find(".chosen-drop");n.append(o)}}else{this.container.removeClass("chosen-container-up")}}}else{var k=parseInt(this.container.find(".chosen-drop").height());var l=parseInt(f(window).height());var t=parseInt(this.container.height());var u=this.container.offset().top;var A=parseInt(f(window).scrollTop());var x;if(A>0){x=l-(u-A)-t}else{x=l-u-t}if(x-100<k){this.container.addClass("chosen-container-up");this.container.find(".chosen-drop").css({top:-(k)+"px"})}}return this.form_field_jq.trigger("chosen:showing_dropdown",{chosen:this})};i.prototype.update_results_content=function(j){return this.search_results.html(j)};i.prototype.results_hide=function(){if(this.results_showing){this.result_clear_highlight();this.container.removeClass("chosen-with-drop");this.form_field_jq.trigger("chosen:hiding_dropdown",{chosen:this});this.container.removeClass("chosen-container-up");var j=this.container.closest(".bootbox").find(".modal-body");j.css({"overflow-x":"hidden"});if(parseInt(j.height())<300){j.css({"overflow-y":"inherit"})}else{j.css({"overflow-y":"scroll"})}}return this.results_showing=false};i.prototype.set_tab_index=function(k){var j;if(this.form_field.tabIndex){j=this.form_field.tabIndex;this.form_field.tabIndex=-1;return this.search_field[0].tabIndex=j}};i.prototype.set_label_behavior=function(){var j=this;this.form_field_label=this.form_field_jq.parents("label");if(!this.form_field_label.length&&this.form_field.id.length){this.form_field_label=f("label[for='"+this.form_field.id+"']")}if(this.form_field_label.length>0){return this.form_field_label.bind("click.chosen",function(k){if(j.is_multiple){return j.container_mousedown(k)}else{return j.activate_field()}})}};i.prototype.show_search_field_default=function(){if(this.is_multiple&&this.choices_count()<1&&!this.active_field){this.search_field.val(this.default_text);return this.search_field.addClass("default")}else{this.search_field.val("");return this.search_field.removeClass("default")}};i.prototype.search_results_mouseup=function(j){var k;k=f(j.target).hasClass("active-result")?f(j.target):f(j.target).parents(".active-result").first();if(k.length){this.result_highlight=k;this.result_select(j);return this.search_field.focus()}};i.prototype.search_results_mouseover=function(j){var k;k=f(j.target).hasClass("active-result")?f(j.target):f(j.target).parents(".active-result").first();if(k){return this.result_do_highlight(k)}};i.prototype.search_results_mouseout=function(j){if(f(j.target).hasClass("active-result"||f(j.target).parents(".active-result").first())){return this.result_clear_highlight()}};i.prototype.choice_build=function(k){var j,l,m=this;j=f("<li />",{"class":"search-choice"}).html("<span>"+k.html+"</span>");if(k.disabled){j.addClass("search-choice-disabled")}else{l=f("<a />",{"class":"search-choice-close","data-option-array-index":k.array_index});l.bind("click.chosen",function(n){return m.choice_destroy_link_click(n)});j.append(l)}return this.search_container.before(j)};i.prototype.choice_destroy_link_click=function(j){j.preventDefault();j.stopPropagation();if(!this.is_disabled){return this.choice_destroy(f(j.target))}};i.prototype.choice_destroy=function(j){if(this.result_deselect(j[0].getAttribute("data-option-array-index"))){this.show_search_field_default();if(this.is_multiple&&this.choices_count()>0&&this.search_field.val().length<1){this.results_hide()}j.parents("li").first().remove();return this.search_field_scale()}};i.prototype.results_reset=function(){this.reset_single_select_options();this.form_field.options[0].selected=true;this.single_set_selected_text();this.show_search_field_default();this.results_reset_cleanup();this.form_field_jq.trigger("change");if(this.active_field){return this.results_hide()}};i.prototype.results_reset_cleanup=function(){this.current_selectedIndex=this.form_field.selectedIndex;return this.selected_item.find("abbr").remove()};i.prototype.result_select=function(j){var l,k;if(this.result_highlight){l=this.result_highlight;this.result_clear_highlight();if(this.is_multiple&&this.max_selected_options<=this.choices_count()){this.form_field_jq.trigger("chosen:maxselected",{chosen:this});return false}if(this.is_multiple){l.removeClass("active-result")}else{this.reset_single_select_options()}k=this.results_data[l[0].getAttribute("data-option-array-index")];k.selected=true;this.form_field.options[k.options_index].selected=true;this.selected_option_count=null;if(this.is_multiple){this.choice_build(k)}else{this.single_set_selected_text(k.text)}if(!((j.metaKey||j.ctrlKey)&&this.is_multiple)){this.results_hide()}this.search_field.val("");if(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex){this.form_field_jq.trigger("change",{selected:this.form_field.options[k.options_index].value})}this.current_selectedIndex=this.form_field.selectedIndex;return this.search_field_scale()}};i.prototype.single_set_selected_text=function(j){if(j==null){j=this.default_text}if(j===this.default_text){this.selected_item.addClass("chosen-default")}else{this.single_deselect_control_build();this.selected_item.removeClass("chosen-default")}return this.selected_item.find("span").text(j)};i.prototype.result_deselect=function(k){var j;j=this.results_data[k];if(!this.form_field.options[j.options_index].disabled){j.selected=false;this.form_field.options[j.options_index].selected=false;this.selected_option_count=null;this.result_clear_highlight();if(this.results_showing){this.winnow_results()}this.form_field_jq.trigger("change",{deselected:this.form_field.options[j.options_index].value});this.search_field_scale();return true}else{return false}};i.prototype.single_deselect_control_build=function(){if(!this.allow_single_deselect){return}if(!this.selected_item.find("abbr").length){this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>')}return this.selected_item.addClass("chosen-single-with-deselect")};i.prototype.get_search_text=function(){if(this.search_field.val()===this.default_text){return""}else{return f("<div/>").text(f.trim(this.search_field.val())).html()}};i.prototype.winnow_results_set_highlight=function(){var j,k;k=!this.is_multiple?this.search_results.find(".result-selected.active-result"):[];j=k.length?k.first():this.search_results.find(".active-result").first();if(j!=null){return this.result_do_highlight(j)}};i.prototype.no_results=function(j){var k;k=f('<li class="no-results">'+this.results_none_found+' "<span></span>"</li>');k.find("span").first().html(j);this.search_results.append(k);return this.form_field_jq.trigger("chosen:no_results",{chosen:this})};i.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()};i.prototype.keydown_arrow=function(){var j;if(this.results_showing&&this.result_highlight){j=this.result_highlight.nextAll("li.active-result").first();if(j){return this.result_do_highlight(j)}}else{return this.results_show()}};i.prototype.keyup_arrow=function(){var j;if(!this.results_showing&&!this.is_multiple){return this.results_show()}else{if(this.result_highlight){j=this.result_highlight.prevAll("li.active-result");if(j.length){return this.result_do_highlight(j.first())}else{if(this.choices_count()>0){this.results_hide()}return this.result_clear_highlight()}}}};i.prototype.keydown_backstroke=function(){var j;if(this.pending_backstroke){this.choice_destroy(this.pending_backstroke.find("a").first());return this.clear_backstroke()}else{j=this.search_container.siblings("li.search-choice").last();if(j.length&&!j.hasClass("search-choice-disabled")){this.pending_backstroke=j;if(this.single_backstroke_delete){return this.keydown_backstroke()}else{return this.pending_backstroke.addClass("search-choice-focus")}}}};i.prototype.clear_backstroke=function(){if(this.pending_backstroke){this.pending_backstroke.removeClass("search-choice-focus")}return this.pending_backstroke=null};i.prototype.keydown_checker=function(k){var l,j;l=(j=k.which)!=null?j:k.keyCode;this.search_field_scale();if(l!==8&&this.pending_backstroke){this.clear_backstroke()}switch(l){case 8:this.backstroke_length=this.search_field.val().length;break;case 9:if(this.results_showing&&!this.is_multiple){this.result_select(k)}this.mouse_on_container=false;break;case 13:if(this.results_showing){k.preventDefault()}break;case 32:if(this.disable_search){k.preventDefault()}break;case 38:k.preventDefault();this.keyup_arrow();break;case 40:k.preventDefault();this.keydown_arrow();break}};i.prototype.search_field_scale=function(){var j,n,m,k,q,r,p,l,o;if(this.is_multiple){m=0;p=0;q="position:absolute; left: -1000px; top: -1000px; display:none;";r=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"];for(l=0,o=r.length;l<o;l++){k=r[l];q+=k+":"+this.search_field.css(k)+";"}j=f("<div />",{style:q});j.text(this.search_field.val());f("body").append(j);p=j.width()+25;j.remove();n=this.container.outerWidth();if(p>n-10){p=n-10}return this.search_field.css({width:p+"px"})}};return i})(a)}(jQuery));
/*
 * chosen组件扩展：详情参见：jquery.chosen-additional.js
 */
;(function(a){a(document).off("chosen.data-api",".chosen-select").on("chosen.data-api",".chosen-select",function(c){var g=this;if(c.target=g&&a(g).is("select")){var b=a(g).data("max-selected")||10;var h=a(g).data("threshold")||10;var k=a(g).data("text-single")||a.i18n.chosen["text-single"];var j=a(g).data("text-multiple")||a.i18n.chosen["text-multiple"];var l=a(g).data("text-nomatch")||a.i18n.chosen["text-nomatch"];a(g).chosen({allow_single_deselect:false,search_contains:true,display_disabled_options:false,disable_search_threshold:b,max_selected_options:h,placeholder_text_single:k,placeholder_text_multiple:j,no_results_text:l});var i=a(g).data("chosen");if(i){var e=a(g).closest(".bootbox-body");a(g).resize(function(m){a(g).trigger("chosen:resized")}).change(function(){a(this).focus().blur()});function d(){var n=e.children(".mCustomScrollBox");if(n.size()==1){var s=n.children(".mCSB_container");var m=(a.fn.actual?s.actual("innerHeight"):s.innerHeight(true))||s.height();var o=i.container.find("a.chosen-single");var r=i.container.find("div.chosen-drop");var q=(a.fn.actual?o.actual("outerHeight"):o.outerHeight(true))||o.height();var t=(a.fn.actual?r.actual("outerHeight"):r.outerHeight(true))||r.height();var u=(o.offset().top+q-n.offset().top);var p=m-Math.abs(parseInt(s.css("top")))-u;console.log("_scrollHeight \uff1a "+m);console.log("_top \uff1a "+u);console.log("_bottom \uff1a "+p);console.log("_realHeight \uff1a "+t);if(p<t){console.log("top  ");r.css({top:"-"+t+"px"});if(!i.container.hasClass("chosen-container-btu")){i.container.addClass("chosen-container-btu")}}else{console.log("bottom  ");r.css({top:"100%"});i.container.removeClass("chosen-container-btu")}}}function f(){var n=e.children(".mCustomScrollBox");if(n.size()==1){var o=i.container.find("div.chosen-drop");var m=(a.fn.actual?o.actual("outerHeight"):o.outerHeight(true))||o.height();console.log("_realHeight \uff1a "+m);if(i.container.hasClass("chosen-container-btu")){console.log("top  ");o.css({top:"-"+m+"px"})}else{console.log("bottom  ");o.css({top:"100%"});i.container.removeClass("chosen-container-btu")}}}}}})}(jQuery));
